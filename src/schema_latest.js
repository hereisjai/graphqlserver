
 const allReposes = [
    {id: 1, repoName: 'One', 'LogoUrl':'url', likes: 20},
    {id: 2 ,repoName: 'Two', 'LogoUrl':'url', likes: 10},
    {id: 3 ,repoName: 'Three', 'LogoUrl':'url', likes: 2}
];


  const typeDefs = `
  type AllReposes {
  	id: Int,
    repoName: String,
    LogoUrl: String,
    likes: Int
	},
	type Query {
    hello : String,
		allReposes: [AllReposes]!,
 		repose(likes: Int!): AllReposes!
	},
# this schema allows the following mutation:
  type Mutation {
    upvotePost(id: Int!): AllReposes
  }

#subscription schema
type Subscription {
    somethingChanged: AllReposes!
}


`;

  
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  export { schema };