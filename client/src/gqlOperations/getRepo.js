import { gql } from "@apollo/client";

export const GET_REPO = gql`
  query getUserById($name: String, $owner: String) {
    getRepo(name: $name, owner: $owner) {
      id
      name
      full_name
      size
      private
      hook_id
      webhooks
      owner {
        login
        avatar_url
      }
    }
  }
`;
