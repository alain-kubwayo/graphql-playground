import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { useState } from "react";

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            username
            nationality
        }
    }
`;

const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
        movies {
            id
            name 
        }
    }
`;

const GET_MOVIE_BY_NAME = gql`
    query Movie($name: String!) {
        movie(name: $name) {
            name
            yearOfPublication
        } 
    }
`;

const DisplayData = () => {
    const [movieSearched, setMovieSearched] = useState("");
    const { data: usersData, loading, error } = useQuery(QUERY_ALL_USERS);
    const { data: moviesData, loading: moviesLoading, error: moviesError } = useQuery(QUERY_ALL_MOVIES);
    const [
        fetchMovie, 
        { data: movieSearchedData, error: movieError }
    ] = useLazyQuery(GET_MOVIE_BY_NAME); 


    if(loading){
        return <h1>Loading...</h1>
    }

    // if(usersData){
    //     console.log(usersData);
    // }

    if(error){
        console.log(error);
    }

    if(movieSearchedData){
        console.log(movieSearchedData?.movie);
    }

    if(movieError){
        console.log(movieError);
    }

    return ( 
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                usersData && usersData.users.map( user => (
                    <div key={user.id} className="bg-sky-400 text-gray-600">
                        <h1><span className="font-semibold">Name</span>: {user.name}</h1>
                        <h1><span className="font-semibold">Username</span>: {user.username}</h1>
                        <h1><span className="font-semibold">Age</span>: {user.age}</h1>
                        <h1><span className="font-semibold">Nationality</span>: {user.nationality}</h1>
                    </div>
                ))
            }
        </div>
        <br />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                moviesData && moviesData.movies.map( movie => (
                    <div key={movie.id} className="bg-sky-400 text-gray-600">
                        <h1><span className="font-semibold">Movie Name</span>: {movie.name}</h1>
                    </div>
                ))
            }
        </div>
        <br />
        <br />
        <br />
        <div>
            <input 
                className="py-1 px-2 border border-sky-700 outline-none"
                type="text"
                placeholder="Interstellar..." 
                value={movieSearched}
                onChange={e => setMovieSearched(e.target.value)}
            />
            <button 
                className="py-1 px-2 ml-2 bg-sky-900 text-white"
                onClick={() => fetchMovie({ variables: {
                    name: movieSearched
                }})}
            >Fetch Data</button>
            <div>
                { movieSearchedData && (
                    <div>
                        <h1>
                            <span className="font-semibold">Movie Name</span>: 
                            { movieSearchedData.movie.name }
                        </h1>
                        <p>Published in: { movieSearchedData.movie.yearOfPublication }</p>
                    </div>
                )}
                { movieError && <h2>There was an error fetching the data...</h2>}
            </div>
        </div>
        </>
    );
}
 
export default DisplayData;