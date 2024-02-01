// ** React imports
import React, { useEffect, useState } from "react";

// ** 3rd party libraries
import axios from "axios";

// ** MUI imports
import { Box, Modal } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// TODO : move interfaces to separate file // or say I choose to keep them here

interface Review {
    author: string;
    content: string;
}

interface ReviewsModalProps {
    movieId: number;
    open: boolean;
    handleClose: () => void;
}

const ReviewsModal = ({ movieId, open, handleClose }: ReviewsModalProps) => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
                    { headers: { accept: "application/json" } }
                );
                setReviews(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchReviews();
    }, [movieId]);

    return (
        <Modal open={open} onClose={handleClose} className="modal">
            <Box className="modal-content">
                <IconButton
                    onClick={handleClose}
                    className="close-button"
                    sx={{ alignItems: "flex-end" }}
                >
                    <CloseIcon className="close-icon" />
                </IconButton>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review">
                            <h2 className="review-author">{review.author}</h2>
                            <p className="review-content">{review.content}</p>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center" }}>No reviews ... </p>
                )}
            </Box>
        </Modal>
    );
};

export default ReviewsModal;
