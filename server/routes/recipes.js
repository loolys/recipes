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
    let username;
    RecipeModel.findById(id, (err, docs) => {
      if (err) throw err;
      username = docs.username;
    }).then(() => {
      if (username === req.currentUser.username) {
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
      } else {
        res.status(500).json({ error: 'not authorized to edit'});
      }
    });
  }
});

router.get('/profile/:user', (req, res) => {
  const user = req.params.user;
  RecipeModel.find({ username: user }, (err, docs) => {
    if (err) {
      res.status(500).json({ error: 'No recipes found' });
    } else {
      res.json({ docs });
    }
  });
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

router.get('/specific/:id', (req, res) => {
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

router.get('/all-recipes', (req, res) => {
  let query = RecipeModel.find({}).sort({ date: -1 });

  query.limit(25);

  query.exec((err, docs) => {
    if (err) {
      res.status(500).json({ error: 'found nothing' });
    } else {
      res.json({ docs });
    }
  })
});

router.post('/search', (req, res) => {
  const search = req.body.search;

  RecipeModel.find({ $text: { $search: search }}).exec((err, docs) => {
    if (err) {
      res.status(500).json({ error: 'Something went wrong in search' });
    } else {
      res.json({ docs });
    }
  });
});

router.delete('/delete/:id', authenticate, (req, res) => {
  const id = req.params.id;

  RecipeModel.findById(id, (err, docs) => {
    if (err) {
      res.json({ error: 'Something went wrong' });
    }

    if (docs.username === req.currentUser.username) {
      RecipeModel.remove({ _id: id }, (error) => {
        if (error) {
          res.status(500).json({ error: 'something went wrong' });
        } else {
          res.json({ success: 'Deleted' });
        }
      });
    } else {
      res.status(400).json({ error: 'not authorized' });
    }
  });
});

module.exports = router;
