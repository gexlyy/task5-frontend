import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Collapse, IconButton, Box, Typography, Paper
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

function BookTable({ books }) {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>#</TableCell>
                        <TableCell>ISBN</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Authors</TableCell>
                        <TableCell>Publisher</TableCell>
                        <TableCell>Likes</TableCell>
                        <TableCell>Reviews</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <React.Fragment key={book.index}>
                            <TableRow>
                                <TableCell>
                                    <IconButton size="small" onClick={() => toggleExpand(book.index)}>
                                        {expandedIndex === book.index ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>{book.index}</TableCell>
                                <TableCell>{book.isbn}</TableCell>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.authors.join(', ')}</TableCell>
                                <TableCell>{book.publisher}</TableCell>
                                <TableCell>{book.likes}</TableCell>
                                <TableCell>{book.reviews.length}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                    <Collapse in={expandedIndex === book.index} timeout="auto" unmountOnExit>
                                        <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
                                            <Box
                                                component="img"
                                                sx={{
                                                    width: 200,
                                                    height: 300,
                                                    objectFit: 'cover',
                                                    borderRadius: '8px'
                                                }}
                                                alt={book.title}
                                                src={book.coverImage}
                                            />
                                            <Box>
                                                <Typography variant="h6" gutterBottom>
                                                    Reviews
                                                </Typography>
                                                {book.reviews.length === 0 && <Typography>No reviews</Typography>}
                                                {book.reviews.map((r, idx) => (
                                                    <Box key={idx} sx={{ mb: 1 }}>
                                                        <Typography variant="subtitle2">{r.reviewer}</Typography>
                                                        <Typography variant="body2">{r.text}</Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BookTable;
