import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {
  const blog = {
    id: 'asdeasd45784d5',
    title: 'Ficciones',
    author: 'Borges',
    url: 'http://ficcion-botges.com',
    likes: 15,
    user: {
      id: 'asdw44544asdw',
      name: 'Pedro',
      username: 'Pepe'
    }
  }

  test('displays author and title by default', async () => {

    const onLike = vi.fn()
    const removeBlog = vi.fn()

    const { container } = render(<Blog blog={blog} onLike={onLike} removeBlog={removeBlog} />)

    const div = container.querySelector('.blogDiv')

    expect(div).toHaveTextContent('Ficciones')
    expect(div).toHaveTextContent('Borges')
  })

  test('at start does not display blog details', async () => {

    const onLike = vi.fn()
    const removeBlog = vi.fn()

    const { container } = render(<Blog blog={blog} onLike={onLike} removeBlog={removeBlog} />)

    const blogDetails = container.querySelector('.blogDetails')
    expect(blogDetails).toHaveStyle('display: none')
  })
})
