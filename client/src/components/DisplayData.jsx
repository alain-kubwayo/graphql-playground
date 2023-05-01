import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
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

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id 
            name
        }
    }
`;

const DisplayData = () => {
    const [movieSearched, setMovieSearched] = useState("");

    // Create User States
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("");

    const { data: usersData, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: moviesData, loading: moviesLoading, error: moviesError } = useQuery(QUERY_ALL_MOVIES);
    const [
        fetchMovie, 
        { data: movieSearchedData, error: movieError }
    ] = useLazyQuery(GET_MOVIE_BY_NAME); 

    const [ createUser ] = useMutation(CREATE_USER_MUTATION);


    if(loading){
        return <h1>Loading...</h1>
    }

    return ( 
        <>
        <div>
            <input 
                type="text" 
                placeholder="Name"
                className="py-1 px-2 border border-sky-700 outline-none"
                onChange={e => setName(e.target.value)}
            />
            <br />
            <input 
                type="text" 
                placeholder="Username"
                className="py-1 px-2 border border-sky-700 outline-none"
                onChange={e => setUsername(e.target.value)}
            />
            <br />
             <input 
                type="number" 
                placeholder="Age"
                className="py-1 px-2 border border-sky-700 outline-none"
                onChange={e => setAge(e.target.value)}
            />
            <br />
            <input 
                type="text" 
                placeholder="Nationality"
                className="py-1 px-2 border border-sky-700 outline-none"
                onChange={e => setNationality(e.target.value.toUpperCase())}
            />
            <br />
            <button 
                className="py-1 px-2 ml-2 bg-sky-900 text-white"
                onClick={() => {
                    createUser({ variables: { input: {
                    name,
                    username,
                    age: Number(age),
                    nationality
                }}});
                refetch();
            }}
            >
                Create User
            </button>
        </div>
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