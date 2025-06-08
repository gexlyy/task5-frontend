import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

function BookCard({ book }) {
    return (
        <Card
            sx={{
                backgroundColor: '#333',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
                }
            }}
        >
            <CardMedia
                component="img"
                height="300"
                image={book.coverImage}
                alt={book.title}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {book.title}
                </Typography>
                <Typography variant="subtitle2">
                    {book.authors.join(', ')}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Publisher: {book.publisher}
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">Likes: {book.likes}</Typography>
                    <Typography variant="body2">Reviews: {book.reviews.length}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default BookCard;
