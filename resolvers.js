import axios from "axios";

const resolvers = {
  Query: {
    getAllRepos: async () => {
      let repo = await axios.get("https://api.github.com/user/repos", {
        headers: {
          Authorization: `Bearer ${process.env.USER_TOKEN}`,
        },
      });
      return repo.data;
    },
    getRepo: async (_, { name, owner }) => {
      let res = await axios.get(
        `https://api.github.com/repos/${owner}/${name}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.USER_TOKEN}`,
          },
        }
      );
      return res.data;
    },
  },
};

export default resolvers;
