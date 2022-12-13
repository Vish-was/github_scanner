import axios from "axios";
const resolvers = {
  Query: {
    getAllRepos: async () => {
      let repo = await axios.get(
        "https://api.github.com/users/Vish-was/repos",
        {
          Authorization: "Bearer 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",
        }
      );

      return repo.data;
    },
  },
};

export default resolvers;
