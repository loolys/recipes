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

router.post('/edit', authenticate, (req,res) => {
  const { errors, isValid } = validateInput(req.body);
  if (isValid) {
    const { title, description, image, time, portions, ingredients, steps, id } = req.body;

    RecipeModel.findByIdAndUpdate(id, { $set: {
      title,
      description,
      image,
      time,
      portions,
      ingredients,
      steps,
    }}, { new: true }, (err, docs) => {
      if (err) throw err;
      res.json({ success: true });
    });
  }
});

router.get('/', (req, res) => {
  RecipeModel.find({ featured: true }, (err, docs) => {
    if (err) throw err;
    if (docs) {
      res.json({ docs });
    } else {
      res.status(500).json({ error: 'not found' });
    }
  });
});

router.get('/:id', (req, res) => {
  const query = RecipeModel.where({ _id: req.params.id });
  query.findOne((err, docs) => {
    if (err) throw err;
    if (docs) {
      res.json(docs);
    } else {
      res.status(500).json({ error: 'Recipe not found' });
    }
  });
});

module.exports = router;
