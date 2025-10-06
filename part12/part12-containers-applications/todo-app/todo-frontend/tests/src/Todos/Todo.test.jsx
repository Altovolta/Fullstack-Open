import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Todo from '../../../src/Todos/Todo'

test('renders todo text', () => {
  const todo = {
    _id: "68e41d2ae45f102664ce5f47",
    text:	"Write code",
    done:	true
  }
  const onClickComplete = vi.fn()
  const onClickDelete = vi.fn()

  render(<Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete}/>)

  const element = screen.getByText('Write code')
  expect(element).toBeDefined()
})