import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from "./searchBar.module.less";

/**
 * SearchBar component allowing user to enter a city name and trigger search.
 */

function SearchBar({ onSearch, onshowSearchHistory, showHistory }) {
    // Local state to store city name input by user
    const [city, setCity] = useState('');

    // Handle click on "Search" button
    const handleSearchClick = () => {
        if (city.trim() === '') return; // Don't search empty input
        onSearch(city); // Call function passed from parent (LandingPage)
    }

    // Allow pressing "Enter" key to also trigger search
    const pressEnterKey = (e) => {
        if(e.key === "Enter") {
            e.preventDefault(); // Stop form submit reload
            handleSearchClick();
            setCity('')
        }
    }

    return (
        <Container className={styles.searchBarContainer}>
            <Row className={styles.searchBar}>
                <Col md={8} className={styles.searchBarText}>
                    <Form.Control
                        type="text"
                        value={city}
                        placeholder="Enter city name"
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={pressEnterKey}
                    />
                    <Button
                        className="primaryButton"
                        onClick={handleSearchClick}
                    >
                        Search
                    </Button>
                </Col>
                <Col md={3} md="auto" className={styles.searchBarButton}>
                    <Button
                        className="secondaryButton"
                        onClick={onshowSearchHistory}
                    >
                        {showHistory ? "Close Search History" : "Search History"}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SearchBar;
