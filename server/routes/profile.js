const express = require('express');
const authenticate = require('../middlewares/authenticate');
const validateInput = require('./validators/recipe');
const SavedRecipesModel = require('../models/saved-recipes-model');
const RecipeModel = require('../models/recipe-model');

const router = express.Router();

router.post('/save', authenticate, (req, res) => {
  const id = req.body.id;
  const username = req.currentUser.username;

  SavedRecipesModel.find({ username }, (err, docs) => {
    if (docs.length) {
      console.log(docs[0].recipes);
      if (docs[0].recipes.indexOf(id) > -1) {
        res.status(500).json({ error: 'already saved' });
      } else {
        const newRecipe = docs[0].recipes.concat([id]);
        SavedRecipesModel.findOneAndUpdate({ username }, { $set: {
          recipes: newRecipe,
        }}, {new: true}, (err, doc) => {
          if (err) throw err;
          res.json({ success: true });
        });
      }
    } else {
      const saveUser = new SavedRecipesModel({
        username,
        recipes: [id],
      });

      saveUser.save((err) => {
        if (err) {
          res.status(500).json({ error: 'save error' });
        } else {
          res.json({ success: true });
        }
      })
    }
  });
});

router.get('/recipes/:user', authenticate, (req, res) => {
  const username = req.currentUser.username;

  SavedRecipesModel.find({ username }, (err, docs) => {
    if (err) {
      res.status(500).json({ error: 'No saved recipes found' });
    }
    const recipes = docs[0].recipes;

    RecipeModel.find({
      _id: {
        $in: recipes,
      },
    }, (err, docs) => {
      if (err) {
        res.status(500).json({ error: 'No recipes found' });
      } else {
        res.json({ docs });
      }
    });
  });
});

router.post('/remove', authenticate, (req, res) => {
  const username = req.currentUser.username;

  SavedRecipesModel.find({ username }, (err, docs) => {
    if (err) throw err;
    const toRemove = req.body._id;
    const filtered = docs[0].recipes.filter(item => {
      return item !== toRemove;
    });
    console.log(docs);
    SavedRecipesModel.findOneAndUpdate({ username }, {
      $set: { recipes: filtered }
    }, { new: true }, (err, docs) => {
      if (err) throw err;
      res.json({ success: true });
    });
  });
});

module.exports = router;
