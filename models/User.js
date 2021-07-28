const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

/* When you call mongoose.model() on a schema, Mongoose compiles a model for you. 

const schema = new mongoose.Schema({ name: 'string', size: 'string' });
const Tank = mongoose.model('Tank', schema);

The first argument is the singular name of the collection your model is for. 
Mongoose automatically looks for the plural, lowercased version of your model name. 
Thus, for the example above, the model Tank is for the tanks collection in the database.

An instance of a model is called a document (think row in sql databases). 
Creating them and saving to the database is easy.*/
module.exports = model("User", userSchema);
