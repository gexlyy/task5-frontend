import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import BookTable from './components/BookTable';
import BookCard from './components/BookCard';
import Controls from './components/Controls';
import Papa from 'papaparse';
import { createTheme, ThemeProvider, CssBaseline, Container, Button, Stack } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
    const [lang, setLang] = useState('en');
    const [seed, setSeed] = useState(42);
    const [likes, setLikes] = useState(5);
    const [reviews, setReviews] = useState(4.7);
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [view, setView] = useState('table');

    useEffect(() => {
        setPage(1);
        fetchBooks(1, true);
    }, [lang, seed, likes, reviews]);

    const fetchBooks = async (pageNum, reset = false) => {
        const res = await axios.get(`${API_URL}/api/books`, {
            params: { lang, seed, page: pageNum, likes, reviews }
        });

        if (reset) {
            setBooks(res.data);
        } else {
            setBooks(prev => [...prev, ...res.data]);
        }
    };

    const fetchNext = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchBooks(nextPage);
    };

    const exportCSV = () => {
        const csv = Papa.unparse(books);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'books.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container sx={{ py: 3 }}>
                <h1>📚 Book Store Generator</h1>
                <Controls
                    lang={lang} setLang={setLang}
                    seed={seed} setSeed={setSeed}
                    likes={likes} setLikes={setLikes}
                    reviews={reviews} setReviews={setReviews}
                />
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Button variant={view === 'table' ? 'contained' : 'outlined'} onClick={() => setView('table')}>
                        Table View
                    </Button>
                    <Button variant={view === 'gallery' ? 'contained' : 'outlined'} onClick={() => setView('gallery')}>
                        Gallery View
                    </Button>
                    <Button variant="outlined" onClick={exportCSV}>Export CSV</Button>
                </Stack>
                <InfiniteScroll
                    dataLength={books.length}
                    next={fetchNext}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    {view === 'table' ? (
                        <BookTable books={books} />
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '10px',
                            marginTop: '20px'
                        }}>
                            {books.map(book => (
                                <BookCard key={book.index} book={book} />
                            ))}
                        </div>
                    )}
                </InfiniteScroll>
            </Container>
        </ThemeProvider>
    );
}

export default App;
