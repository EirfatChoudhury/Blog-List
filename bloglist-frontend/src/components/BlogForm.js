import PropTypes from 'prop-types'
import { useDispatch } from "react-redux"
import { addThisBlog } from "../reducers/blogReducer"
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'

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
    
    const margin = {
        marginTop: 20
    }

    return (
    <div>
        <Form onSubmit={addBlog}>
            <Form.Group>
                <Form.Label>
                    Title
                </Form.Label>
                <Form.Control id="title" placeholder="title" {...title.inputProperties} />

                <Form.Label>
                    Author
                </Form.Label>
                <Form.Control id="author" placeholder="author" {...author.inputProperties} />

                <Form.Label>
                    URL
                </Form.Label>
                <Form.Control id="url" placeholder="url" {...url.inputProperties} />

                <div style={margin}>
                    <Button type="submit">Create</Button>
                </div>
            </Form.Group>
        </Form>
    </div>
    )
}

export default BlogForm

BlogForm.propTypes = {
    toggle: PropTypes.func.isRequired
}