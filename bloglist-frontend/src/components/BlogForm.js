import { useState } from "react"

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
                title: <input onChange={({ target }) => setTitle(target.value)}></input>
            </div>
            <div>
                author: <input onChange={({ target }) => setAuthor(target.value)}></input>
            </div>
            <div>
                url: <input onChange={({ target }) => setUrl(target.value)}></input>
            </div>
            <button type="submit">create</button>
        </form>
    </div>
    )
}

export default BlogForm