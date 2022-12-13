import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    getAllRepos: [Repo]
  }

  type Repo {
    id: Int
    name: String
    full_name: String
    size: Int
    owner: Owner
  }
  type Owner {
    login: String
  }
`;
export default typeDefs;
