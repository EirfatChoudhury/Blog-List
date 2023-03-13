const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorisation = request.get('authorization')
  if (authorisation && authorisation.startsWith('Bearer ')) {
    return authorisation.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  console.log("Token verified")
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
      response.json(blog)
    } 
    else {
      response.status(404).end()
    }
})
  
blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    console.log("Token verified")
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )

  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

module.exports = blogsRouter