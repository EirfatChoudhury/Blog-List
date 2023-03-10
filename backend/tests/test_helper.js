const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "Test",
      author: "Test Author",
      url: "Test URL",
      likes: 5
    },
    {
      title: "Test 2",
      author: "Test Author",
      url: "Test URL",
      likes: 10
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}
  
module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb }