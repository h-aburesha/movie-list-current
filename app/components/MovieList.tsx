"use client";

// ** React imports
import { useEffect, useState } from "react";

// ** 3rd party libraries
import axios from "axios";

// ** components imports
import MovieCard from "./MovieCard";

// ** First interface declaration of Movie
// TODO : move interfaces to separate file
export interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

const MovieList = () => {
    // initialize movies state to an empty array of Movie objects as returned by the api call
    const [movies, setMovies] = useState<Movie[]>([]);

    // useEffect runs after the component is rendered and will use it to fetchMovies
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
                );
                setMovies(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;
