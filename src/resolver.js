import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

const CHANGED ='isChanged';
export default {
    Query:{
        hello:(parent,args,context) => "hello baby",
        allReposes :() => allReposes,
    },
    Mutation: {
        upvotePost: (_, { id }) => {           
        const  repose = allReposes.find(allReposes => allReposes.id==id);     
        console.log(repose) ;
          if (!repose) {
            throw new Error(`Couldn't find post with id ${id}`);
          }
          repose.likes += 1;
       //   pubsub.publish('upvoted', {upvoted:repose}    
          
          pubsub.publish(CHANGED, {messageAdded:repose});
             
          
        
          return repose;
        },
      }, 
      Subscription : {
        messageAdded :{            
         subscribe: () =>pubsub.asyncIterator(CHANGED)
        }
      }
};


const allReposes = [
    {id: 1, repoName: 'One', 'LogoUrl':'url', likes: 20},
    {id: 2 ,repoName: 'Two', 'LogoUrl':'url', likes: 10},
    {id: 3 ,repoName: 'Three', 'LogoUrl':'url', likes: 2}
];


// somewhere in our app
