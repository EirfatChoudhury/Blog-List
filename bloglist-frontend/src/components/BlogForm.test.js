import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
    const mockAddBlog = jest.fn()
    const event = userEvent.setup()

    test('successfully adds blog', async () => {
        render(<BlogForm createBlog={mockAddBlog}/>)

        const title = screen.getByPlaceholderText("title")
        const author = screen.getByPlaceholderText("author")
        const url = screen.getByPlaceholderText("url")
        const createButton = screen.getByText("create")
        
        await event.type(title, 'Test title')
        await event.type(author, 'Test author')
        await event.type(url, 'Test url')
        await event.click(createButton)

        expect(mockAddBlog.mock.calls).toHaveLength(1)
        expect(mockAddBlog.mock.calls[0][0].title).toBe('Test title')
        expect(mockAddBlog.mock.calls[0][0].author).toBe('Test author')
        expect(mockAddBlog.mock.calls[0][0].url).toBe('Test url')
    })
})