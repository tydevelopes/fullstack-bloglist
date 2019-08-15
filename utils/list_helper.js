const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0);
};

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return null;
  }
  let favorite = blogs[0];
  blogs.forEach(blog => {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  });
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  };
};

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return null;
  }
  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1
    };
  }

  // get names of each blog into an array
  const blockAuthors = blogs.map(blog => blog.author);

  // count total blogs each author has written and store in a map as author: numBlogs
  const authorBlogsPair = new Map();

  // if author already exist, increase its blog count by 1, else add the new author with 1 blog
  blockAuthors.forEach(author => {
    if (authorBlogsPair.has(author)) {
      authorBlogsPair.set(author, authorBlogsPair.get(author) + 1);
    } else {
      authorBlogsPair.set(author, 1);
    }
  });

  // create an object with the author with the most blogs
  let mostBlogsObj = null;
  let max = 0;

  authorBlogsPair.forEach((value, key) => {
    if (value > max) {
      max = value;
      mostBlogsObj = {
        author: key,
        blogs: value
      };
    }
  });
  return mostBlogsObj;
};

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return null;
  }
  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes
    };
  }

  // calculate the author with most likes
  const autorLikesPairObj = {};

  blogs.forEach(blog => {
    if (autorLikesPairObj.hasOwnProperty(blog.author)) {
      autorLikesPairObj[blog.author] += blog.likes;
    } else {
      autorLikesPairObj[blog.author] = blog.likes;
    }
  });

  // create an object with the author with the most blogs
  let mostLikesObj = null;
  let max = 0;

  for (let [key, value] of Object.entries(autorLikesPairObj)) {
    if (value > max) {
      max = value;
      mostLikesObj = {
        author: key,
        likes: value
      };
    }
  }
  return mostLikesObj;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
