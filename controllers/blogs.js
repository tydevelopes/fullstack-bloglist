const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  console.log('get request: ', request.body);

  console.log('get response: ', response.body);

  Blog.find({}).then(blogs => {
    response.json(blogs.map(blog => blog.toJSON()));
  });
});

blogsRouter.post('/', (request, response) => {
  console.log('post request: ', request.body);

  console.log('post response: ', response.body);

  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => response.status(400).send(error));
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    response.status(400).send(error);
  }
});

blogsRouter.put('/:id', (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON());
    })
    .catch(error => response.status(400).send(error));
});

module.exports = blogsRouter;
