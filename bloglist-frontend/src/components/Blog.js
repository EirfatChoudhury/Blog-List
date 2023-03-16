import { useDispatch, useSelector } from 'react-redux'
import { deleteThisBlog, likeThisBlog, commentOnThisBlog } from '../reducers/blogReducer'
import { useParams, useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { Table, Form, Button } from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)
  const user = useSelector(state => state.user)
  const comment = useField('text')

  if (!blog || !user) {
    return(
      <div>Loading data...</div>
    )
  }

  const margin = {
    marginTop: 20
  }

  const increaseLikes = () => {
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
    event.preventDefault()
    const commentId = Date.now()
    console.log("Adding comment:", comment.inputProperties.value)
    dispatch(commentOnThisBlog(
      {
        comments: {id: commentId, userId: user.id, username: user.username, comment: comment.inputProperties.value}
      }, blog.id)
    )
    comment.reset()
  }

  return (
    <div style={margin}>
        <h2>Title: {blog.title}</h2>

        {!blog.user.username ? <p>Added by {user.username}</p> : <p>Added by {blog.user.username}</p>}

        {blog.user.id === user.id || blog.user === user.id ? 
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
                  </td>
                </tr>)}
            </tbody>
          </Table>
        </div>
    </div>
  )
}

export default Blog