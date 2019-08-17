const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  console.log('entered test');
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('uid property of a blog should be id', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined();
  });
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'ESLint: The Essential Facts About Essential Front End Tools',
    author: 'Vinh Nguyen',
    url: 'https://www.freecodecamp.org/news/the-essentials-eslint/',
    likes: 5
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map(b => b.title);
  expect(titles).toContain(
    'ESLint: The Essential Facts About Essential Front End Tools'
  );
});

test('a mising likes property defaults to 0', async () => {
  const newBlog = {
    title: 'Styled Components: The Essentials Explained in 3 Steps',
    author: 'Thomas Weibenfalk',
    url:
      'https://www.freecodecamp.org/news/styled-components-essentials-in-three-steps/'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

  const newlyAdded = blogsAtEnd.pop();
  expect(newlyAdded.likes).toBe(0);
});

test('blog without tiltle or author is not added', async () => {
  const blogMissingTitle = {
    title: '',
    author: 'Thomas Weibenfalk',
    url: 'https://www.freecodecamp.org/news/styled-components'
  };
  const blogMissingAuthor = {
    title: 'Styled Components: The Essentials Explained in 3 Steps',
    author: '',
    url: 'https://www.freecodecamp.org/news/'
  };

  await api
    .post('/api/blogs')
    .send(blogMissingTitle)
    .expect(400);

  await api
    .post('/api/blogs')
    .send(blogMissingAuthor)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map(r => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
