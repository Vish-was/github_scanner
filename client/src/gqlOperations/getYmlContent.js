import { gql } from "@apollo/client";

export const GET_YML_CONTENT = gql`
  query getYml($name: String, $owner: String, $path: String) {
    getYmlContent(name: $name, owner: $owner, path: $path) {
      content
      path
    }
  }
`;
