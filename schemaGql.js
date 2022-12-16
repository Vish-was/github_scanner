import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    getAllRepos: [AllRepo]
    getRepo(name: String, owner: String): Repo
    getWebhook(name: String, owner: String): [Webhooks]
    getContents(name: String, owner: String): [Contents]
    getYmlContent(name: String, owner: String, path: String) : FileContent
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
  type Webhooks {
    id: Int
    name: String
    active: Boolean
    type: String
  }
  type Contents {
    name: String
    path: String
    sha : String
    size: Int
  }
  type Owner {
    login: String
    avatar_url: String
  }
  type permissions {
    admin: Boolean
  }
  type FileContent {
    content: String
    path: String
  }
`;
export default typeDefs;
