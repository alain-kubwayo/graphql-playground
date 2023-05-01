import { useQuery, gql } from "@apollo/client";

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
`

const DisplayData = () => {
    const { data: usersData, loading, error } = useQuery(QUERY_ALL_USERS);
    const { data: moviesData, loading: movieLoading, error: moveError } = useQuery(QUERY_ALL_MOVIES);


    if(loading){
        return <h1>Loading...</h1>
    }

    if(usersData){
        console.log(usersData);
    }

    if(error){
        console.log(error);
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
        </>
    );
}
 
export default DisplayData;