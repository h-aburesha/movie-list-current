"use client";

// ** React imports
import { useState } from "react";

// ** MUI imports
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

// ** component imports
import { Movie } from "./MovieList";
import ReviewsModal from "./ReviewsModal";

const MovieCard = ({ movie }: { movie: Movie }) => {
    // I though about utilizing simple state management to handle bookmarking but in the case where it is important to retain state (should remain persistent) in the browser (like local storage for instance) I think it would be better to use a more robust solution like Redux or React Context API
    const [bookmarked, setBookmarked] = useState(false);

    const [open, setOpen] = useState(false);

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className="movie-card">
            <CardMedia
                key={movie.id}
                component="img"
                height="450"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // according to documentation how to build an image url
                alt={movie.title}
            />
            <CardContent className="movie-card-title">
                <Typography variant="h6" onClick={() => setOpen(true)}>
                    {movie.title}
                </Typography>
                <IconButton onClick={handleBookmark}>
                    {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
            </CardContent>
            <ReviewsModal
                movieId={movie.id}
                open={open}
                handleClose={handleClose}
            />
        </Card>
    );
};

export default MovieCard;
