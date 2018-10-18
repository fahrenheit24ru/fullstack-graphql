import express from 'express';
import cors from 'cors';
import {
    ApolloServer,
    gql
} from 'apollo-server-express';

import mongoose from 'mongoose';

import schema from '../graphql/schema';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/graphqlserver');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const server = new ApolloServer({
    schema: schema,
    playground: true
});

const app = express();
app.use(cors());
server.applyMiddleware({
    app
});

const port = 4000;

app.listen({
        port
    }, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);