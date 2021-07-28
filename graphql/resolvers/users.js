const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// can use specific error types from apollo
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const { SECRET_KEY } = require("../../config");
// mongodb model
const User = require("../../models/User");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    // parent, args, context, info
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // make sure user doesn't already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      // this is a mongoose model instantiation, newUser represents a document, i.e. new entry in its
      // respective collection
      const newUser = new User({
        email,
        password,
        username,
        createdAt: new Date().toISOString(),
      });

      // save to the database
      // If save() succeeds, the promise resolves to the document that was saved.
      const res = await newUser.save();
      // id and _id seem to be the same
      // console.log(res.id);
      // console.log(res._id);

      // generate token
      const token = generateToken(res);

      // gets email, username, createdAt from res._doc
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
