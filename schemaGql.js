import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    getAllRepos: [AllRepo]
    getRepo(name: String): Repo
  }

  type AllRepo {
    id: Int
    name: String
    full_name: String
    size: Int
    owner: Owner
  }
  type Repo{
    id: Int
    name: String
    full_name: String
    size: Int,
    private: Boolean
    owner: Owner
  }
  type Owner {
    login: String
    avatar_url: String
  }
`;
export default typeDefs;
