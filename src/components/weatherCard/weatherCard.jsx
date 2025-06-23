import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./weatherCard.module.less";

/**
 * WeatherCard component displaying weather details for a given city.
 */

function WeatherCard({ weather }) {
    if (!weather) return null; // if weather data is not available

    // OpenWeatherMap icon
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    return (
        <>
            <Container className={styles.weatherCardContainer}>
                <Row>
                    <Col  md={4} xs={6} className={styles.cityNameBlock}>
                        <h4 className={styles.cityName} data-testid="weather-city">{weather.name}</h4> {/* City Name */}
                    </Col>
                    <Col  md={4} xs={6} className={styles.weatherIcon}>
                        <img src={iconUrl} alt={weather.weather[0].description} />
                        <h4>{weather.weather[0].main}</h4> {/* Weather icon from api */}
                    </Col>
                    <Col md={4}>
                        <h5>Minimum: {weather.main.temp_min} °C</h5> {/* Min Temp */}
                        <h5>Maximum: {weather.main.temp_max} °C</h5> {/* Max Temp */}
                    </Col>
                </Row>
                <Row className="d-flex justify-content-between">
                    <Col xs={12} md={7} >
                        <h5>Temperature: {weather.main.temp} °C</h5>
                    </Col>
                    <Col xs={12} md={4}>
                        <h5>Wind Speed - {weather.wind.speed} m/s</h5> {/* Wind Speed */}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default WeatherCard;
