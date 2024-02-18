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
import { AnimatePresence, motion } from "framer-motion";

const MovieList = () => {
    // initialize movies state to an empty array of Movie objects as returned by the api call
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
    };

    useEffect(() => {
        fetchMovies();
    }, [page]);

    return (
        <InfiniteScroll
            dataLength={movies.length}
            next={() => setPage(page + 1)}
            hasMore={hasMore}
            loader={undefined}
        >
            <div className="movie-list">
                <AnimatePresence mode="wait">
                    {isLoading
                        ? Array(4).fill(
                              <motion.div
                                  key="loader"
                                  initial={{ opacity: 1 }}
                                  exit={{
                                      opacity: 0,
                                      transition: { ease: "easeOut" },
                                  }}
                              >
                                  <MovieCardSkeleton />
                              </motion.div>
                          )
                        : movies.map((movie) => (
                              <motion.div
                                  key={movie.id}
                                  initial={{ opacity: 0 }}
                                  animate={{
                                      opacity: 1,
                                      transition: { ease: "easeIn" },
                                  }}
                                  exit={{
                                      opacity: 0,
                                      transition: { ease: "easeOut" },
                                  }}
                              >
                                  <MovieCard movie={movie} />
                              </motion.div>
                          ))}
                </AnimatePresence>
            </div>
        </InfiniteScroll>
    );
};

export default MovieList;
