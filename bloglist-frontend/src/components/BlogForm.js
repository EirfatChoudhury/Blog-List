import { useState } from "react"
import { useQueryClient, useMutation } from "react-query"
import { useNotificationDispatch } from "../contexts/NotificationContext"
import { useNotificationStyleDispatch } from "../contexts/NotificationStyleContext"
import { createBlog } from "../requests"

const BlogForm = ( {toggle} ) => {
    const [title, setTitle] = useState("") 
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const queryClient = useQueryClient()
    const newBlogMutation = useMutation(createBlog, { onSuccess: () => queryClient.invalidateQueries('blogs') })
    const notifDispatch = useNotificationDispatch()
    const notifStyleDispatch = useNotificationStyleDispatch()

    const addBlog = (event) => {
        event.preventDefault()
        toggle()
        const result = newBlogMutation.mutate({title, author, url})
        setTitle(null)
        setAuthor(null)
        setUrl(null)
        document.getElementById('title').value = null
        document.getElementById('author').value = null
        document.getElementById('url').value = null
        if ( result === false ) {
            notifDispatch({type: 'CHANGE', payload: `Failed to add ${title} to Bloglist`})
            notifStyleDispatch({ type: 'ERROR'})
        }
        else {
            notifDispatch({type: 'CHANGE', payload: `Successfully added ${title} to Bloglist`})
            notifStyleDispatch({ type: 'SUCCESS'})
        }
        setTimeout(() => {
            notifDispatch({type: 'HIDE'})
        }, 5000);
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