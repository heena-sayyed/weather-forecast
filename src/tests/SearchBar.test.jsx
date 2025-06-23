import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../components/searchBar/searchBar';

// Create mock functions simulating parent's props
const mockSearch = jest.fn();
const mockShowHistory = jest.fn();

beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before every test

    render(
        <SearchBar
            onSearch={mockSearch}
            onshowSearchHistory={mockShowHistory}
            showHistory={false}
        />
    );
});

// Test 1: Is input field & buttons present?
test('renders input and buttons', () => {
    const input = document.querySelector('input');
    const buttons = document.querySelectorAll('button');

    expect(input).toBeInTheDocument();
    expect(buttons.length).toBe(2); // Search + History buttons
});

// Test 2: Clicking Search triggers onSearch()
test('calls onSearch when Search button is clicked', () => {
    const input = document.querySelector('input');
    const searchButton = document.querySelector('button');

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(searchButton);

    expect(mockSearch).toHaveBeenCalledWith('London');
});

// Test 3: Pressing Enter triggers onSearch()
test('calls onSearch when Enter key is pressed', () => {
    const input = document.querySelector('input');
    fireEvent.change(input, { target: { value: 'Paris' } });

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockSearch).toHaveBeenCalledWith('Paris');
});

// Test 4: Clicking history button triggers toggle
test('toggles Search History', () => {
    const buttons = document.querySelectorAll('button');
    const historyButton = buttons[1];

    fireEvent.click(historyButton);
    expect(mockShowHistory).toHaveBeenCalled();
});
