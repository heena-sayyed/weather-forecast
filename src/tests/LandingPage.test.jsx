// Mock the API Key from config file
jest.mock('../config', () => ({
    WEATHER_API_KEY: 'dummy_api_key'
}));

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import LandingPage from '../pages/LandingPage';
import * as api from '../api/weatherApi.js';

// Mock the weatherApi file
jest.mock('../api/weatherApi');

// Fake weather data mimicking OpenWeatherMap API response
const mockWeatherData = {
    weather: [{ icon: '01d', description: 'Sunny' }],
    main: { temp: 20 },
    wind: { speed: 5 },
    name: 'London'
};

describe('LandingPage Integration Tests', () => {

    // Before every test, make fetchWeather resolve with mockWeatherData
    beforeEach(() => {
        api.fetchWeather.mockResolvedValue(mockWeatherData);
    });

    // Test 1: Can user search for a city and see results?
    it('searches city and updates UI', async () => {
        render(<LandingPage />);

        const input = screen.getByPlaceholderText(/Enter city name/i);
        fireEvent.change(input, { target: { value: 'London' } });

        const searchButton = screen.getByRole('button', { name: /^Search$/i });

        // Act ensures React state updates are processed
        await act(async () => {
            fireEvent.click(searchButton);
        });

        await waitFor(() => expect(api.fetchWeather).toHaveBeenCalledWith('London'));

        // Weather card displays "London"
        expect(await screen.findByText(/London/i)).toBeInTheDocument();
    });

    // Test 2: Display error if invalid city entered
    test('displays error on invalid city', async () => {
        api.fetchWeather.mockResolvedValue({ error: 'Please Enter valid city name' });

        render(<LandingPage />);
        const input = screen.getByPlaceholderText(/Enter city name/i);
        fireEvent.change(input, { target: { value: 'InvalidCity' } });

        const searchButton = screen.getByRole('button', { name: /^Search$/i });
        await act(async () => {
            fireEvent.click(searchButton);
        });

        // Expect error message to appear
        await waitFor(() => screen.getByRole('alert'));
        expect(screen.getByRole('alert')).toHaveTextContent(/Please Enter valid city name/i);
    });

    // Test 3: Test delete and undo functionality in search history
    test('handles delete and undo in history', async () => {
        api.fetchWeather.mockResolvedValue(mockWeatherData);

        render(<LandingPage />);
        const input = screen.getByPlaceholderText(/Enter city name/i);
        fireEvent.change(input, { target: { value: 'London' } });

        const searchButton = screen.getByRole('button', { name: /^Search$/i });
        await act(async () => {
            fireEvent.click(searchButton);
        });

        // Weather card displays "London"
        await waitFor(() => expect(screen.getByTestId('weather-city')).toHaveTextContent(/London/i));

        // Open Search History panel
        const historyButton = screen.getByRole('button', { name: /Search History/i });
        await act(async () => {
            fireEvent.click(historyButton);
        });

        // "London" is in history list
        const londonTexts = await screen.findAllByText(/London/i);
        expect(londonTexts[1]).toBeInTheDocument(); // History item

        // Click delete button
        const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
        await act(async () => {
            fireEvent.click(deleteButtons[0]);
        });

        // Undo option appears in Toast
        expect(await screen.findByText(/City removed/i)).toBeInTheDocument();
        const undoButton = screen.getByRole('button', { name: /Undo Delete/i });
        await act(async () => {
            fireEvent.click(undoButton);
        });

        // City restored in history
        const londonTextsAfterUndo = await screen.findAllByText(/London/i);
        expect(londonTextsAfterUndo[1]).toBeInTheDocument();
    });
});
