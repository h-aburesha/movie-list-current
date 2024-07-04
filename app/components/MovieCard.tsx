"use client";

// ** React imports
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// ** MUI imports
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ForumIcon from "@mui/icons-material/Forum";

// ** component imports
import ReviewsModal from "./ReviewsModal";

// ** Types imports
import { Movie } from "./Types";

const MovieCard = ({ movie }: { movie: Movie }) => {
    // I though about utilizing simple state management to handle bookmarking but in the case where it is
    // important to retain state (should remain persistent)
    // I think it would be better to use a more robust solution like Redux or React Context API
    // and finding a way to save the state using a cloud service for instance.

    const [bookmarked, setBookmarked] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const currentBookmarks: number[] = Cookies.get("bookmarks")
            ? JSON.parse(Cookies.get("bookmarks")!)
            : [];
        setBookmarked(currentBookmarks.includes(movie.id));
    }, [movie.id]);

    // TODO: REVIEW APPROACH TO HANDLING BOOKMARKS
    const handleBookmark = () => {
        const currentBookmarks: number[] = Cookies.get("bookmarks")
            ? JSON.parse(Cookies.get("bookmarks")!)
            : [];

        let newBookmarks: number[];

        if (!bookmarked) {
            // If the movie is not already bookmarked, bookmark it
            newBookmarks = [...currentBookmarks, movie.id];
        } else {
            // If the movie is already bookmarked, remove the bookmark
            newBookmarks = currentBookmarks.filter((id) => id !== movie.id);
        }
        // Update the bookmarks cookie and the bookmarked state
        Cookies.set("bookmarks", JSON.stringify(newBookmarks));
        setBookmarked(!bookmarked);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card
            className="movie-card"
            sx={{
                backgroundColor: "floralwhite",
            }}
        >
            <CardMedia
                key={movie.id}
                component="img"
                height="450"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />

            <CardContent className="movie-card-title">
                <Typography
                    variant="h6"
                    onClick={() => setOpen(true)}
                    sx={{ fontSize: { xs: "0.8em", sm: "1.2em", md: "1.5em" } }}
                >
                    {movie.title} <ForumIcon fontSize="small" />
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
