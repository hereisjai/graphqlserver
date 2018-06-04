
import { makeExecutableSchema } from 'graphql-tools';
import { PubSub } from 'graphql-subscriptions';
const CHANNEL_ADDED_TOPIC = 'newChannel';
const pubsub = new PubSub();
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello(root) {
      return 'world';
    }, 
 	 allReposes :() => allReposes,  
  repose: (_, { likes }) => find(allReposes, { likes: likes }),   
  }, 
   Mutation: {
    upvotePost: (_, { id }) => {
      const allRepose = find(allReposes, { id: id });
      if (!allRepose) {
        throw new Error(`Couldn't find post with id ${id}`);
      }
      allRepose.likes += 1;
      pubsub.publish(CHANNEL_ADDED_TOPIC,{
                      somethingChanged:{id:id}
              });

              pubsub.publish(CHANNEL_ADDED_TOPIC, { messageAdded: newMessage, channelId: message.channelId });
      return allRepose;
    },
  },  
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(CHANNEL_ADDED_TOPIC),
    },
  }
};


const allReposes = [
    {id: 1, repoName: 'One', 'LogoUrl':'url', likes: 20},
    {id: 2 ,repoName: 'Two', 'LogoUrl':'url', likes: 10},
    {id: 3 ,repoName: 'Three', 'LogoUrl':'url', likes: 2}
];




