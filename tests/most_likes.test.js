const mostLikes = require('../utils/list_helper').mostLikes;
const data = require('./blogs_data');

describe('most likes', () => {
  test('of empty list is null', () => {
    const result = mostLikes(data.emptyList);
    expect(result).toBeNull();
  });

  test('when list has only one blog equals that blog', () => {
    const answer = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    };
    const result = mostLikes(data.listWithOneBlog);
    expect(result).toEqual(answer);
  });

  test('of a bigger list is calculated right', () => {
    const answer = {
      author: "Edsger W. Dijkstra",
      likes: 17
    };
    const result = mostLikes(data.listWithManyBlogs);
    expect(result).toEqual(answer);
  });
});
