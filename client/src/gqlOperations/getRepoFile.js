import { gql } from "@apollo/client";

export const GET_REPO_FILE = gql`
query getContent($name: String, $owner: String){
    getContents(name:$name, owner: $owner){
     name,
      path,
      size,
      sha
    }
  }  
`