import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar/SearchBar';
import WeatherCard from '../components/weatherCard/WeatherCard';
import { fetchWeather } from '../api/weatherApi.js';
import { Container, Toast } from 'react-bootstrap';
import SearchHistory from "../components/searchHistory/SearchHistory.jsx";
import styles from "./LandingPage.module.less";
import "../styles/global.less";

/**
 * Main Landing Page component for Weather App.
 * Handles weather data fetching, search history, undo delete functionality.
 */

function LandingPage() {
    // State to store weather data
    const [weather, setWeather] = useState(null);

    // State to store search history (list of cities)
    const [history, setHistory] = useState(() => {
        // Retrieve history from localStorage if exists
        const savedHistory = localStorage.getItem('searchHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    // State to toggle visibility of search history
    const [showHistory, setShowHistory] = useState(false);

    // State to store error messages
    const [error, setError] = useState("");

    // State to handle last deleted city for Undo functionality
    const [deletedCity, setDeletedCity] = useState(null);

    // Function to handle city search
    const handleSearch = async (city) => {
        const normalizedCity = city.trim().toLowerCase(); // Normalize input
        const data = await fetchWeather(city); // Fetch weather data from API

        if (data.error) { // If API returned an error (e.g., city not found)
            setError(data.error); // Show error message
            return;
        }

        // If data is valid, set weather and clear error
        setWeather(data);
        setError("");

        // Update history only if city not already present
        setHistory((prevHistory) => {
            if (!prevHistory.includes(normalizedCity)) {
                const updatedHistory = [...prevHistory, normalizedCity];
                localStorage.setItem('searchHistory', JSON.stringify(updatedHistory)); // Save to localStorage
                return updatedHistory;
            }
            return prevHistory;
        });
    };

    // Fetch Berlin's weather by default
    useEffect(() => {
        handleSearch("Berlin");
    }, []);

    // Toggle visibility of search history list
    const showSearchHistory = () => {
        setShowHistory(!showHistory);
    };

    // Delete a city from search history
    const deleteSearchHistoryCity = (deleteCity) => {
        const normalizedCity = deleteCity.trim().toLowerCase();
        const updatedHistory = history.filter(city => city !== normalizedCity);
        setHistory(updatedHistory); // Update state
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory)); // Update localStorage
        setDeletedCity(normalizedCity); // Store deleted city for Undo
    };

    // Undo delete action to restore last removed city
    const undoDelete = () => {
        if (deletedCity) {
            setHistory((prevHistory) => {
                if (!prevHistory.includes(deletedCity)) {
                    const updatedHistory = [...prevHistory, deletedCity];
                    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory)); // Update localStorage
                    return updatedHistory;
                }
                return prevHistory;
            });
            setDeletedCity(null); // Clear deleted city state
        }
    };

    return (
        <Container className={styles.weatherAppContainer}>
            {/* App Heading */}
            <h1 className={styles.weatherAppHeading} tabIndex="0">Weather App</h1>

            {/* SearchBar Component */}
            <SearchBar
                onSearch={handleSearch}
                onshowSearchHistory={showSearchHistory}
                showHistory={showHistory}
            />

            {/* Error message display */}
            {error && <div className="error" role="alert" aria-live="polite">{error}</div>}

            {/* WeatherCard displays fetched weather if exists */}
            <WeatherCard weather={weather} />

            {/* Conditionally render Search History */}
            {showHistory && (
                <SearchHistory
                    history={history.map(city => city.charAt(0).toUpperCase() + city.slice(1))} // Capitalize city names
                    onHistoryClick={handleSearch}
                    onDelete={deleteSearchHistoryCity}
                />
            )}

            {/* Toast for Undo Delete functionality */}
            {deletedCity && (
                <Toast
                    className={styles.undoDeleteBlock}
                    onClose={() => setDeletedCity(null)} // Close Toast
                    show={true}
                    delay={3000}
                    autohide
                >
                    <Toast.Body className={styles.undoDelete}>
                        City removed.
                        <button
                            onClick={undoDelete}
                            aria-label="Undo Delete"
                            className="secondaryButton"
                        >
                            Undo
                        </button>
                    </Toast.Body>
                </Toast>
            )}
        </Container>
    );
}

export default LandingPage;
