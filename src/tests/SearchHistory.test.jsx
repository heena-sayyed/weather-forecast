import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchHistory from '../components/searchHistory/searchHistory';

describe('SearchHistory Component', () => {
    const mockHistoryClick = jest.fn();
    const mockDelete = jest.fn();
    const history = ['berlin', 'paris'];

    beforeEach(() => {
        render(
            <SearchHistory
                history={history}
                onHistoryClick={mockHistoryClick}
                onDelete={mockDelete}
            />
        );
    });

    // Test 1: Renders cities correctly
    test('renders history items', () => {
        expect(screen.getByText(/berlin/i)).toBeInTheDocument();
        expect(screen.getByText(/paris/i)).toBeInTheDocument();
    });

    // Test 2: Click on city triggers onHistoryClick
    test('calls onHistoryClick when city name clicked', () => {
        fireEvent.click(screen.getByText(/berlin/i));
        expect(mockHistoryClick).toHaveBeenCalledWith('berlin');
    });

    // Test 3: Click on delete triggers onDelete
    test('calls onDelete when delete button clicked', () => {
        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        fireEvent.click(deleteButtons[0]);
        expect(mockDelete).toHaveBeenCalledWith('berlin');
    });
});
