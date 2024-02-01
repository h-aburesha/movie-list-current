"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    CardMedia,
} from "@mui/material";
import { Movie } from "./MovieList";

const MovieCard = ({ movie }: { movie: Movie }) => {
    const [bookmarked, setBookmarked] = useState(false);

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
    };

    return (
        <Card className="movie-card">
            <CardMedia
                key={movie.id} // this is required by React
                component="img"
                height="450"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // according to documentation how to build an image url
                alt={movie.title}
            />
            <CardContent className="movie-card-title">
                <Typography variant="h6">{movie.title}</Typography>
                <Button onClick={handleBookmark}>
                    {bookmarked ? "Remove Bookmark" : "Bookmark"}
                </Button>
            </CardContent>
        </Card>
    );
};

export default MovieCard;
