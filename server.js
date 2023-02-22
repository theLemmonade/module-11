const express = require('express');
const path = require('path');
const fs = require('fs');


const { v4: uuidv4 } = require('uuid');
const { userInfo } = require('os');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// HTML get Routes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// API get  Route
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to get notes`);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        res.json(JSON.parse(data))
      }
    });
  });