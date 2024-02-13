"use client";

// ** React imports
import { useEffect, useState } from "react";

// ** 3rd party libraries
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

// ** components imports
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

// ** Types imports
import { Movie } from "./Types";

const MovieList = () => {
    // initialize movies state to an empty array of Movie objects as returned by the api call
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // useEffect runs after the component is rendered and will use it to fetchMovies
    const fetchMovies = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`
            );
            setMovies((prevMovies) => [
                ...prevMovies,
                ...response.data.results,
            ]);
            if (response.data.page >= response.data.total_pages) {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [page]);

    return (
        <>
            <InfiniteScroll
                dataLength={movies.length}
                next={() => setPage(page + 1)}
                hasMore={hasMore}
                loader={
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                            padding: "16px",
                            margin: "16px",
                        }}
                    >
                        {Array(4).fill(<MovieCardSkeleton />)}
                    </div>
                }
            >
                <div className="movie-list">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </InfiniteScroll>
        </>
    );
};

export default MovieList;
