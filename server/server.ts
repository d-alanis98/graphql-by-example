import { gql, ApolloServer } from 'apollo-server';

// "Interface" of the API
const typeDefs = gql`
    # By default, the schema is defined as:
    schema {
        query: Query
    }

    type Query {
        greeting: String,
    }
`;

// "Implementation" of the endpoints defines in the interface
const resolvers = {
    Query: {
        greeting: () => 'Hello world',
    }
};


const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await server.listen({ port: 9000 });
console.log(`Server is listening at ${ url }`);

