const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost/bloglist-test';
mongoose.connect(mongoUrl, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;
