const express = require('express');
const authenticate = require('../middlewares/authenticate');
const validateInput = require('./validators/recipe');
const RecipeModel = require('../models/recipe-model');

const router = express.Router();

router.post('/', authenticate, (req, res) => {
  const { errors, isValid } = validateInput(req.body);
  if (isValid) {
    const username = req.currentUser.username;
    const { title, description, image, time, portions, ingredients, steps } = req.body;

    const recipe = new RecipeModel({
      username,
      title,
      description,
      image,
      time,
      portions,
      ingredients,
      steps,
    });

    recipe.save((err) => {
      if (err) {
        res.status(500).json({ error: 'save error' });
      } else {
        res.json({ success: true });
      }
    });
  } else {
    res.status(400).json({ errors });
  }
});

router.get('/', (req, res) => {
  const query = RecipeModel.where({ _id: '58b6fead00484e187cf9bdf2' });
 
  query.findOne((err, found) => {
    if (err) throw err;
    if (found) {
      res.json({ found });
    } else {
      res.status(500).json({ error: 'not found' });
    }
  });
});

module.exports = router;
