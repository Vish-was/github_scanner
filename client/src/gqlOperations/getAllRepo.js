import { gql } from "@apollo/client";

export const GET_ALL_REPO = gql`
query{
    getAllRepos{
      id,
      name,
      full_name
      size
      owner{
        login
        avatar_url
      }
      permissions{
        admin
      }
    }
  }
`