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
    getWebhook: async (_, { name, owner }) => {
      let res = await axios.get(
        `https://api.github.com/repos/${owner}/${name}/hooks`,
        {
          headers: {
            Authorization: `Bearer ${process.env.USER_TOKEN}`,
          },
        }
      );
      return res.data;
    },
    getContents: async (_, { name, owner }) => {
      let res = await axios.get(
        `https://api.github.com/repos/${owner}/${name}/contents`,
        {
          headers: {
            Authorization: `Bearer ${process.env.USER_TOKEN}`,
          },
        }
      );
      return res.data;
    },
    getYmlContent: async (_, { name, owner, path }) => {
      let res = await axios.get(
        `https://api.github.com/repos/${owner}/${name}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.USER_TOKEN}`,
          },
        }
      );
      if (res?.data?.content) {
        let bufferObj = Buffer.from(res.data.content, "base64");
        let decodedString = bufferObj.toString("utf8");
        return { content: decodedString, path: res.data.path };
      }
    },
  },
};

export default resolvers;
