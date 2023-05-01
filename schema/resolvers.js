const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

// all the functions that make calls to the database, decide what we return to the frontend, do something in our API will exist in the resolvers object.

const resolvers = {
    Query: {
        // USER RESOLVERS
        users: () => {
            // make an API call to the database to get data about users and return the users
            return UserList;
        },
        user: (parent, args) => {
            const id = args.id;
            // if you're using a database, you can use this id to select a specific user from the database table using this specific id
            const user = _.find(UserList, { id: Number(id) });
            return user;
        },

        // MOVIE RESOLVERS
        movies: () => {
            return MovieList;
        },
        movie: (parent, args) => {
            const name = args.name;
            const movie = _.find(MovieList, { name });
            return movie;
        }
    },
    User: {
        // you can have a separate table inside of your db related to movies, what you can do is, inside of the users table you can include a field called favoriteMovies and just a list of IDs and you can use that to query data from the other table and return it over here. So, whenever you have a field inside of a type that doesn't return a basic type, you can actually add resolvers to that field to that type and specify what that field will return. 
        favoriteMovies: () => {
            return _.filter(MovieList, (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010 )
        }
    }
};

module.exports = { resolvers };