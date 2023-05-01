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
    }
};

module.exports = { resolvers };