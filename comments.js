// Create web server

// Load modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create web server
const app = express();
app.listen(3000, () => console.log('Server running on port 3000'));

// Parse data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Load comments
const commentsPath = path.join(__dirname, 'data/comments.json');
let comments = [];
fs.readFile(commentsPath, 'utf-8', (err, data) => {
  if (err) throw err;
  comments = JSON.parse(data);
});

// Get comments
app.get('/comments', (req, res) => {
  res.send(comments);
});

// Post comments
app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,