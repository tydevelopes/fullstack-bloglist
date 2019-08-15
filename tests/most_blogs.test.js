const mostBlogs = require('../utils/list_helper').mostBlogs;
const data = require('./blogs_data');

describe('most blogs', () => {
  test('of empty list is null', () => {
    const result = mostBlogs(data.emptyList);
    expect(result).toBeNull();
  });

  test('when list has only one blog equals that blog', () => {
    const answer = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    };
    const result = mostBlogs(data.listWithOneBlog);
    expect(result).toEqual(answer);
  });

  test('of a bigger list is calculated right', () => {
    const answer = {
      author: 'Robert C. Martin',
      blogs: 3
    };
    const result = mostBlogs(data.listWithManyBlogs);
    expect(result).toEqual(answer);
  });
});
