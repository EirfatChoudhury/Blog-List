import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test URL',
        id: '1',
        user: {
            name: 'Test user name'
        }
    }

    const user = {
        username: 'Test username',
        name: 'Test name',
        id: 'Test id'
    }

    const mockAddLike = jest.fn()
    const mockDeleteThisBlog = jest.fn()
    const event = userEvent.setup()

    test('renders blog component and hides url, likes, name and delete by default', () => {
        render(<Blog blog={blog} user={user} addLike={mockAddLike} deleteThisBlog={mockDeleteThisBlog}/>)

        const titleAuthor = screen.getByTestId('title-author')
        const urlLikesNameDelete = screen.getByTestId('toggleView')
        expect(titleAuthor).toBeDefined()
        expect(urlLikesNameDelete).toHaveStyle('display: none')
    })

    test('clicking view makes url, likes, name and delete visible', async () => {
        render(<Blog blog={blog} user={user} addLike={mockAddLike} deleteThisBlog={mockDeleteThisBlog}/>)

        const viewButton = screen.getByText('view')
        await event.click(viewButton)
        const urlLikesNameDelete = screen.getByTestId('toggleView')
        expect(urlLikesNameDelete).not.toHaveStyle('display: none')
    })

    test('clicking view then cancel hides url, likes, name and delete', async () => {
        render(<Blog blog={blog} user={user} addLike={mockAddLike} deleteThisBlog={mockDeleteThisBlog}/>)

        const viewButton = screen.getByText('view')
        await event.click(viewButton)
        const urlLikesNameDelete = screen.getByTestId('toggleView')
        const cancelButton = screen.getByText('cancel')
        await event.click(cancelButton)
        expect(urlLikesNameDelete).toHaveStyle('display: none')
    })

    test('adds 2 likes to blog', async () => {
        render(<Blog blog={blog} user={user} addLike={mockAddLike} deleteThisBlog={mockDeleteThisBlog}/>)

        const likeButton = screen.getByText("like")
        await event.click(likeButton)
        await event.click(likeButton)
        expect(mockAddLike.mock.calls).toHaveLength(2)
    })

    test('deletes blog', async () => {
        window.confirm = jest.fn(() => true)
        render(<Blog blog={blog} user={user} addLike={mockAddLike} deleteThisBlog={mockDeleteThisBlog}/>)

        const deleteButton = screen.getByText("delete")
        await event.click(deleteButton)
        expect(window.confirm).toBeCalled()
        expect(mockDeleteThisBlog.mock.calls).toHaveLength(1)
    })
})