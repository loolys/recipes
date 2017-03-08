const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserRecipeSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  recipes: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('UserRecipes', UserRecipeSchema);
