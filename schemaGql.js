import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    check: String
  }
`;
export default typeDefs;