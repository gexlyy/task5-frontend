import React from 'react';
import { Stack, TextField, Select, MenuItem, Button, Slider, InputLabel, FormControl } from '@mui/material';

function Controls({ lang, setLang, seed, setSeed, likes, setLikes, reviews, setReviews }) {

    const randomSeed = () => {
        setSeed(Math.floor(Math.random() * 1000000));
    };

    return (
        <Stack spacing={2} sx={{ mb: 3 }}>
            <FormControl fullWidth>
                <InputLabel>Language/Region</InputLabel>
                <Select
                    value={lang}
                    label="Language/Region"
                    onChange={(e) => setLang(e.target.value)}
                >
                    <MenuItem value="en">English (US)</MenuItem>
                    <MenuItem value="de">German (Germany)</MenuItem>
                    <MenuItem value="ja">Japanese (Japan)</MenuItem>
                </Select>
            </FormControl>

            <Stack direction="row" spacing={2}>
                <TextField
                    label="Seed"
                    type="number"
                    value={seed}
                    onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
                />
                <Button variant="outlined" onClick={randomSeed}>🎲 Random Seed</Button>
            </Stack>

            <Stack spacing={1}>
                <div>Likes per book: {likes}</div>
                <Slider
                    min={0}
                    max={10}
                    step={0.1}
                    value={likes}
                    onChange={(e, newValue) => setLikes(newValue)}
                />
            </Stack>

            <TextField
                label="Reviews per book"
                type="number"
                step="0.1"
                value={reviews}
                onChange={(e) => setReviews(parseFloat(e.target.value))}
            />
        </Stack>
    );
}

export default Controls;
