import { useDispatch, useSelector } from 'react-redux'
import { deleteThisBlog, likeThisBlog, commentOnThisBlog, deleteCommentOnThisBlog } from '../reducers/blogReducer'
import { useParams, useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { Table, Form, Button } from 'react-bootstrap'
import { changeNotification } from '../reducers/notificationReducer'
import { errorStyle } from '../reducers/notificationStyleReducer'
import { useEffect } from 'react'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.user)
  const comment = useField('text')

  if (!blog) {
    return(
      <div>Loading data...</div>
    )
  }

  const creator = users.filter(user => user.id === blog.user || user.id === blog.user.id)[0].username

  console.log(creator)
  console.log(blog)

  const margin = {
    marginTop: 20
  }

  const increaseLikes = () => {
    if (!user) {
      return navigate('/login')
    }
    console.log("Increasing likes on this blog", blog)
    dispatch(likeThisBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1
    }, blog.id)
    )
  }

  const deleteBlog = () => {
    if (blog.user.id === user.id || !blog.user.id) {
      console.log("Same user")
      if (window.confirm(`Deleting blog with title: ${blog.title}`)) {
        console.log("Deleting this blog", blog)
        dispatch(deleteThisBlog(id))
        navigate("/blogs")
      }
    }
    else {
      console.log(blog.user.id)
      console.log(user.id)
      window.alert("Unauthorised")
    }
  }

  const addComment = (event) => {
    if (!user) {
      return navigate('/login')
    }

    event.preventDefault()

    if (comment.inputProperties.value === '') {
      dispatch(changeNotification("Comment must be at least 1 character"))
      dispatch(errorStyle())
      return null
    }

    const commentId = Date.now()
    console.log("Adding comment:", comment.inputProperties.value)
    dispatch(commentOnThisBlog(
      {
        comments: {id: commentId, userId: user.id, username: user.username, comment: comment.inputProperties.value}
      }, blog.id)
    )
    comment.reset()
  }

  const deleteComment = (event, blogId, commentId) => {
    event.preventDefault()
    console.log("blogId:", blogId, "commentId:", commentId)
    dispatch(deleteCommentOnThisBlog(blogId, commentId))
  }

  return (
    <div style={margin}>
        <h3>Title: {blog.title}</h3>
        
        <p>Added by {creator}</p>

        {!user ? 
          null : 
          blog.user.id === user.id || blog.user === user.id ? 
            <p>
              <Button onClick={deleteBlog}>Delete</Button>
            </p> :
            null
        }

        <Table striped>
          <tbody>
            <tr key={'author'}>
              <td className='align-middle'>
                Author
              </td>
              <td className='align-middle'>
                {blog.author}
              </td>
            </tr>
            <tr key={'url'}>
              <td className='align-middle'>
                URL
              </td>
              <td className='align-middle'>
                {blog.url}
              </td>
            </tr>
            <tr key={'likes'}>
              <td className='align-middle'>
                Likes
              </td>
              <td className='align-middle'>
                {blog.likes} <Button onClick={increaseLikes}>like</Button>
              </td>
            </tr>
          </tbody>
        </Table>

        <h3>Comments</h3>
        <Form onSubmit={addComment}>
          <Form.Group>
            <Form.Control id='comment' {...comment.inputProperties} />
            <div style={margin}>
              <Button type='submit'>Add comment</Button>
            </div>
          </Form.Group>
        </Form>
        
        <div style={margin}>
          <Table striped>
            <tbody>
              {blog.comments.length === 0 ?
                <tr key={'no-comments'}>
                  <td className='align-middle'>
                    No Comments
                  </td>
                </tr> :
                blog.comments.map(comment => 
                <tr key={comment.id}>
                  <td className='align-middle'>
                    {comment.username}
                  </td>
                  <td className='align-middle'>
                    {comment.comment} 
                    {!user ? null : 
                      user.id === comment.userId ?
                        <Button onClick={(event) => deleteComment(event, blog.id, comment.id)}>Delete Comment</Button> :
                        null
                    }
                  </td>
                </tr>)}
            </tbody>
          </Table>
        </div>
    </div>
  )
}

export default Blog