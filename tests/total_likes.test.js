const totalLikes = require('../utils/list_helper').totalLikes;
const data = require('./blogs_data');

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = totalLikes(data.emptyList);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(data.listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(data.listWithManyBlogs);
    expect(result).toBe(36);
  });
});
