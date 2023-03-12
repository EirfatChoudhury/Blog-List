import PropTypes from 'prop-types'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addThisBlog } from "../reducers/blogReducer"

const BlogForm = ( {toggle} ) => {
    const [title, setTitle] = useState("") 
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const dispatch = useDispatch()

    const addBlog = ( event ) => {
        event.preventDefault()
        toggle()
        dispatch(addThisBlog({title, author, url}))
        setTitle(null)
        setAuthor(null)
        setUrl(null)
        document.getElementById('title').value = null
        document.getElementById('author').value = null
        document.getElementById('url').value = null
    }
    
    return (
    <div>
        <form onSubmit={addBlog}>
            <div>
                title: <input id="title" placeholder="title" onChange={({ target }) => setTitle(target.value)}></input>
            </div>
            <div>
                author: <input id="author" placeholder="author" onChange={({ target }) => setAuthor(target.value)}></input>
            </div>
            <div>
                url: <input id="url" placeholder="url" onChange={({ target }) => setUrl(target.value)}></input>
            </div>
            <button id="create-button" type="submit">create</button>
        </form>
    </div>
    )
}

export default BlogForm

BlogForm.propTypes = {
    toggle: PropTypes.func.isRequired
}