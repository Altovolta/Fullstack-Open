import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  test('displays author and title by default', async () => {

    const onNewBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm onNewBlog={onNewBlog}/>)

    const titleInput = container.querySelector('#title-input')
    await user.type(titleInput, 'title')

    const authorInput = container.querySelector('#author-input')
    await user.type(authorInput, 'author')

    const urlInput = container.querySelector('#url-input')
    await user.type(urlInput, 'http://url.com')

    const submitButton = screen.getByText('create')
    await user.click(submitButton)

    expect(onNewBlog.mock.calls).toHaveLength(1)
    expect(onNewBlog.mock.calls[0][0].title).toBe('title')
    expect(onNewBlog.mock.calls[0][0].author).toBe('author')
    expect(onNewBlog.mock.calls[0][0].url).toBe('http://url.com')
  })

})