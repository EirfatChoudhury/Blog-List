import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useUserValue } from '../contexts/UserContext'
import { useMutation, useQueryClient } from 'react-query'
import { likeBlog, delBlog } from '../requests'

const Blog = ({blog}) => {
  const queryClient = useQueryClient()
  const user = useUserValue()
  const likeBlogMutation = useMutation(likeBlog, { onSuccess: () => queryClient.invalidateQueries('blogs') })
  const deleteBlogMutation = useMutation(delBlog, { onSuccess: () => queryClient.invalidateQueries('blogs') })

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
    likeBlogMutation.mutate({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      id: blog.id
    })
  }

  const deleteBlog = () => {
    if (window.confirm(`Deleting blog with title: ${blog.title}`)) {
      console.log("Deleting this blog", blog)
      deleteBlogMutation.mutate(blog.id)
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
  blog: PropTypes.object.isRequired
}