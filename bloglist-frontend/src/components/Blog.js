import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({blog, user, addLike, deleteThisBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let userName = ""
  if (blog.user === user.id) {
    userName = user.name
  } else {
    userName = blog.user.name
  }

  const increaseLikes = () => {
    console.log("Increasing likes on this blog", blog)

    addLike({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1
    }, blog.id)
  }

  const deleteBlog = () => {
    if (window.confirm(`Deleting blog with title: ${blog.title}`)) {
      console.log("Deleting this blog", blog)
      deleteThisBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className={blog}>
        <p data-testid="title-author">Blog title: {blog.title} - Blog author: {blog.author}</p>
        <Togglable buttonLabel="view">
          <p>url: {blog.url}</p>
          <p>
            likes: {blog.likes}
            <button onClick={increaseLikes}>like</button>
          </p>
          <p>Added by {userName}</p>
          <p>
            <button onClick={deleteBlog}>delete</button>
          </p>
        </Togglable>
    </div>
  )
}

export default Blog

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteThisBlog: PropTypes.func.isRequired
}