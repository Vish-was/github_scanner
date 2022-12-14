import axios from "axios";
const resolvers = {
  Query: {
    getAllRepos: async () => {
      let repo = await axios.get("https://api.github.com/user/repos", {
        headers: {
          Authorization: "Bearer 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",
        },
      });
      return repo.data;
    },
    getRepo: async (_, { name }) => {
      let res = await axios.get(
        `https://api.github.com/repos/${name}/github_scanner`,
        {
          headers: {
            Authorization: "Bearer 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",
          },
        }
      );
      return res.data;
    },
  },
};

export default resolvers;
