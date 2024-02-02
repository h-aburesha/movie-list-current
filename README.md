# JustWatch Movie List - Readme

#

## 1- Create new NextJS App and starting local development environment

```bash
npx create-next-app@latest
npm run dev
```

## 2- displaying the movie list by making an API call and mapping the response to populate the MovieCard.tsx component

-   first, creating a .env.local file to have the API key and adding it to gitignore
-   NEXT_PUBLIC_API_KEY=**\*\***
-   Installing axios library to make the fetchMovies request I prefer to fetch in JS because it automatically converts HTTP response to JSON, wider browser compatibility and more [here](https://blog.logrocket.com/axios-vs-fetch-best-http-requests/) 🥸
-   I choose to keep the api call in the component where is being used and the response mapped i.e. /movieList.tsx and passing movies to the MovieCard component
-   API Key is of course used in a .enc.local file and not committed and using NextJS convention prefixed with NEXT*PUBLIC*

```tsx
// first interface declaration of Movie
// (at the end I deceided to move Types to separate Types.tsx file ;-)
export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    // Normally I would take the time to change this snake_case to camelCase
}

// initialize movies state to an empty array of Movie objects as returned by the api call
const [movies, setMovies] = useState<Movie[]>([]);

useEffect(() => {
    const fetchMovies = async () => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        );
        // here I would transform the poster_path into camelCase
        setMovies(response.data.results);
    };

    fetchMovies();
}, []);

// returns the mapped information from the api passed down to <MovieCard/>
return (
    <div className="movie-list">
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
);
```

## 3- MovieCard.tsx

-   Here I choose to use MUI library as it proved to be very helpful from previous experience, and also it make the behaviour of the app components more manageable when it comes to styling, etc.
-   For bookmarking, I thought about utilizing simple state management to handle bookmarking but in the case where it is important to retain state (should remain persistent on different devices etc.), I think it would be better to use a more robust solution like Redux or React Context API and finding a way to save the state using a cloud service for instance.

```jsx
const MovieCard = ({ movie }: { movie: Movie }) => {
    // function component receiving movie prop of type Movie
    // passed from <MovieList/> where api is called and used to
    // propagate the MovieCard title, image, etc.
    const [bookmarked, setBookmarked] = useState(false);

    const [open, setOpen] = useState(false);

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
    };
};
```

## 4- ReviewsModal.tsx

-   Here I choose to use a modal and this component receives 3 props from <MovieCard/> namely movieId essential for api call to fetch review upon title click and handling open, handle close modal
-   clicking the title open the modal and shows reviews and display (no reviews) if nothing to display

```jsx
const ReviewsModal = ({ movieId, open, handleClose }: ReviewsModalProps) => {
    // initialize reviews state to an empty array of Review objects as returned by the api call
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
};
```

## 5- Deployment

-   I choose to deploy for visibility and also it is rather easy with Next & Vercel.
-   Vercel also provides environment variable encryption that makes it easy to access those variable both in development (through .env.local) & production by using their syntax NEXT*PUBLIC*
