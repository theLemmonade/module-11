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