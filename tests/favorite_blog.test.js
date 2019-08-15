const favoriteBlog = require('../utils/list_helper').favoriteBlog;
const data = require('./blogs_data');

describe('favorite blog', () => {
  // Test for empty list
  test('of empty list is null', () => {
    const result = favoriteBlog(data.emptyList);
    expect(result).toBeNull();
  });

  // Test for list with only one blog
  test('when list has only one blog equals that blog', () => {
    const favorite = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    };
    const result = favoriteBlog(data.listWithOneBlog);
    expect(result).toEqual(favorite);
  });

  // Test for list with more than one blog
  test('of a bigger list is calculated right', () => {
    const favorite = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    };
    const result = favoriteBlog(data.listWithManyBlogs);
    expect(result).toEqual(favorite);
  });
});
