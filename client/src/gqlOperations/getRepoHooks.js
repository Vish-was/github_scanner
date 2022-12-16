import {gql} from "@apollo/client";

export const GET_REPO_HOOKS = gql`
query getHooks($name: String, $owner: String){
    getWebhook(name:$name, owner: $owner){
     id,
      name,
      active,
      type,
    }
  }
`