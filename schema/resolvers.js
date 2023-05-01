const { UserList } = require("../FakeData");
const _ = require("lodash");

// all the functions that make calls to the database, decide what we return to the frontend, do something in our API will exist in the resolvers object.

const resolvers = {
    Query: {
        users: () => {
            // make an API call to the database to get data about users and return the users
            return UserList;
        },
        user: (parent, args) => {
            const id = args.id;
            const user = _.find(UserList, { id: Number(id) });
            return user;
        }
    }
};

module.exports = { resolvers };