const Post = require("../../models/Post");

module.exports = {
  Query: {
    sayHi: () => {
      return "Hello World!!!";
    },
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
