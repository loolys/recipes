const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  portions: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  steps: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

RecipeSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Recipes', RecipeSchema);
