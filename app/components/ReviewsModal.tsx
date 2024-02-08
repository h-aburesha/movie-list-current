// ** React imports
import React, { useEffect, useState } from "react";

// ** 3rd party libraries
import axios from "axios";

// ** MUI imports
import { Box, Modal } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// ** Types imports
import { Review, ReviewsModalProps } from "./Types";

const ReviewsModal = ({ movieId, open, handleClose }: ReviewsModalProps) => {
    // initialize reviews state to an empty array of Review objects as returned by the api call
    // API needs to be called to get the reviews for a particular movie using the movieId
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
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
