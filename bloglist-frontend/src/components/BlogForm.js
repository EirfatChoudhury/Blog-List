import { useState } from "react"
import PropTypes from 'prop-types'

const BlogForm = ( {createBlog} ) => {
    const [title, setTitle] = useState("") 
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({title, author, url})
        setTitle(null)
        setAuthor(null)
        setUrl(null)
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
    createBlog: PropTypes.func.isRequired
}