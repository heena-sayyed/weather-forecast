import React from 'react';
import {Container, ListGroup, Button} from 'react-bootstrap';
import styles from "./searchHistory.module.less"

/**
 * SearchHistory component displaying list of previously searched cities.
 * Allows re-fetching and deletion of individual city entries.
 */

function SearchHistory({ history, onHistoryClick, onDelete }) {
    return (
        <Container className={styles.searchHistoryContainer}>
            <h2>Search History</h2>
            <ListGroup className={styles.searchHistoryList}>
                {history.map((city, index) => (
                    <ListGroup.Item className={styles.searchHistoryListItem} key={index}>
                        <div className={styles.searchHistoryText}>
                            <span className={styles.searchHistory}
                                onClick={() => onHistoryClick(city)}
                            >
                                {city}
                            </span>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(city);
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default SearchHistory;
