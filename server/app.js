import express from 'express';
import path from 'path';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';

const connStr = process.env.MONGODB || 'mongodb://localhost:27017/recipes-db';
mongoose.connect(connStr);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connect to db');
});

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

export default app;
