import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    getAllRepos: [AllRepo]
    getRepo(name: String, owner: String): Repo
  }

  type AllRepo {
    id: Int
    name: String
    full_name: String
    size: Int
    owner: Owner
    permissions: permissions
  }
  type Repo {
    id: Int
    name: String
    full_name: String
    size: Int
    private: Boolean
    hook_id: String
    webhooks: Int
    owner: Owner
  }
  type Owner {
    login: String
    avatar_url: String
  }
  type permissions {
    admin: Boolean
  }
`;
export default typeDefs;
