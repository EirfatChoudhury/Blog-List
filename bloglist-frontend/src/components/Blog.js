import { useDispatch, useSelector } from 'react-redux'
import { deleteThisBlog, likeThisBlog, commentOnThisBlog } from '../reducers/blogReducer'
import { useParams, useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
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
    <div style={blogStyle} className={blog}>
        <h2>Title: {blog.title}</h2>

        {blog.user.id === user.id || blog.user === user.id ? 
          <p>
            <button onClick={deleteBlog}>delete</button>
          </p> :
          null
        }

        <p>Author: {blog.author}</p>
        <p>url: {blog.url}</p>
        <p>
          likes: {blog.likes}
          <button onClick={increaseLikes}>like</button>
        </p>

        {!blog.user.username ? <p>Added by {user.username}</p> : <p>Added by {blog.user.username}</p>}

        <h3>Comments</h3>
        <form onSubmit={addComment}>
          <input id='comment' {...comment.inputProperties}/>
          <button type='submit'>Add comment</button>
        </form>
        {
          blog.comments.length === 0 ? 
            <p>No comments</p> : 
            blog.comments.map(comment => <p key={comment.id}>{comment.username} : {comment.comment}</p>)
        }
    </div>
  )
}

export default Blog