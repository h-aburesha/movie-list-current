export interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

export interface Review {
    author: string;
    content: string;
}

export interface ReviewsModalProps {
    movieId: number;
    open: boolean;
    handleClose: () => void;
}
