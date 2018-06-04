import express from 'express';
import bodyParser from 'body-parser';
import { 
  graphiqlExpress, graphqlExpress,
} from 'apollo-server-express';
import {
  makeExecutableSchema
} from 'graphql-tools';

import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import typeDefs from  './src/schema';
import resolvers  from './src/resolver';


const schema =makeExecutableSchema({ typeDefs,resolvers});

const app = express();

app.use( '/graphiql', graphiqlExpress({

  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:3000/subscriptions`
}));
  
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema
  }));
  
 
  //app.listen(3000);  
 
  const server = createServer(app);
  
  server.listen(3000, () => {
      new SubscriptionServer({
        execute,
        subscribe,
        schema,
      }, {
        server: server,
        path: '/subscriptions',
      });
  });

  