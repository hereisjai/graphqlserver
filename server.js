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
const server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080 ;

const schema =makeExecutableSchema({ typeDefs,resolvers});

const app = express();

app.use( '/graphiql', graphiqlExpress({

  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://graphqlserver-graphqlserver.a3c1.starter-us-west-1.openshiftapps.com/subscriptions`
}));
  
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema
  }));
  
 
  //app.listen(3000);  
 
  const server = createServer(app);

  
  server.listen(server_port,() => {
      new SubscriptionServer({
        execute,
        subscribe,
        schema,
      }, {
        server: server,
        path: '/subscriptions',
      });
  });

  