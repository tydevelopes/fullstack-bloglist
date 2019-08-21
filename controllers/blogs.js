const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  //console.log('get request: ', request.body);

  //console.log('get response: ', response.body);

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response, next) => {
  //console.log('post request: ', request.body);

  //console.log('post response: ', response.body);

  const body = request.body;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      date: new Date(),
      user: user._id
    });

    let savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    // populate user field in blog with user fields
    // select determines the fields to select
    await Blog.populate(savedBlog, {
      path: 'user',
      select: { username: 1, name: 1 }
    });
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
  } catch (exception) {
    next(exception);
  }

  try {
    const removedBlog = await Blog.findByIdAndRemove(request.params.id);
    const user = await User.findById(removedBlog.user);
    // delete the blog id stored in user's blogs array
    user.blogs = user.blogs.filter(
      id => id.toString() !== removedBlog._id.toString()
    );
    await user.save();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { $set: { likes: body.likes } },
      { new: true }
    );
    response.json(updatedBlog.toJSON());
    console.log('updated blog: ', updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
