import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "User" type defines the queryable fields for every user in our data source.
  type User {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    user(id: ID!): User
    users(name: String!): [User]
  }

  type Mutation {
    updateUser(id: ID!, name: String, age: Int): User
  }
`;

const users = [
  {
    id: "42",
    name: "John",
    age: 38,
  },
  {
    id: "43",
    name: "John",
    age: 25,
  },
  {
    id: "44",
    name: "Alex",
    age: 18,
  },
];

const resolvers = {
  Query: {
    user: (_, args) => users.find((user) => user.id === args.id),
    users: (_, args) => users.filter((user) => user.name === args.name),
  },
  Mutation: {
    updateUser: (_, args) => {
      const user = users.find((user) => user.id === args.id);
      if (!user) return null;
      if(args.name) {
        user.name = args.name
      }
      if(args.age) {
        user.age = args.age
      }
      return user
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
