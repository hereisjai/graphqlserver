export default `
  type Query {
      hello : String!,
      allReposes: [AllReposes]!,        
 }
 type AllReposes {
  id: Int,
  repoName: String,
  LogoUrl: String,
  likes: Int
},
type Mutation {
  upvotePost(id: Int!): AllReposes
}
type Subscription
{
  messageAdded : AllReposes
}

schema
{

  query :Query,
  mutation:Mutation,
  subscription:Subscription
}
`;