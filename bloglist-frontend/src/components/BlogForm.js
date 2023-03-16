import PropTypes from 'prop-types'
import { useDispatch } from "react-redux"
import { addThisBlog } from "../reducers/blogReducer"
import { useField } from '../hooks'

const BlogForm = ( {toggle} ) => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')
    const dispatch = useDispatch()

    const addBlog = ( event ) => {
        event.preventDefault()
        toggle()
        dispatch(addThisBlog({title: title.inputProperties.value, author: author.inputProperties.value, url: url.inputProperties.value}))
        title.reset()
        author.reset()
        url.reset()
    }
    
    return (
    <div>
        <form onSubmit={addBlog}>
            <div>
                title: <input id="title" placeholder="title" {...title.inputProperties}></input>
            </div>
            <div>
                author: <input id="author" placeholder="author" {...author.inputProperties}></input>
            </div>
            <div>
                url: <input id="url" placeholder="url" {...url.inputProperties}></input>
            </div>
            <button type="submit">create</button>
        </form>
    </div>
    )
}

export default BlogForm

BlogForm.propTypes = {
    toggle: PropTypes.func.isRequired
}