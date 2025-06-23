import { WEATHER_API_KEY } from '../config';

const API_KEY = WEATHER_API_KEY;

/**
 * Fetch weather data for the given city using OpenWeatherMap API.
 * @param {string} city - City name to fetch weather for.
 * @returns {Object} - Weather data or error object.
 */

export const fetchWeather = async (city) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (data.cod === "404") {
            return { error: "Please Enter valid city name" };
        }

        return data; // valid data
    } catch (error) {
        return { error: "Something went wrong. Please try again later." };
    }
};
