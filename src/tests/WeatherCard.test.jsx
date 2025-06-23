import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCard from '../components/weatherCard/weatherCard';

const mockWeather = {
    name: 'Berlin',
    weather: [{ main: 'Clouds', icon: '04d', description: 'broken clouds' }],
    main: { temp: 20, temp_min: 18, temp_max: 22 },
    wind: { speed: 3.5 },
};

describe('WeatherCard Component', () => {
    // Test 1: No weather prop => renders nothing
    test('renders nothing if no weather data', () => {
        const { container } = render(<WeatherCard weather={null} />);
        expect(container.firstChild).toBeNull();
    });

    // Test 2: Renders weather details properly
    test('renders weather details correctly', () => {
        render(<WeatherCard weather={mockWeather} />);

        expect(screen.getByText(/Berlin/i)).toBeInTheDocument();
        expect(screen.getByText(/Clouds/i)).toBeInTheDocument();
        expect(screen.getByText(/Minimum: 18/i)).toBeInTheDocument();
        expect(screen.getByText(/Maximum: 22/i)).toBeInTheDocument();
        expect(screen.getByText(/20 °C/i)).toBeInTheDocument();
        expect(screen.getByText(/Wind Speed - 3.5/i)).toBeInTheDocument();
    });
});
