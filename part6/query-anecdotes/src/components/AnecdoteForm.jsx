import { useMutation, useQueryClient } from '@tanstack/react-query'

import anecdoteService from '../services/anecdote'
import { useNotificationDispatch } from '../hooks/useNotification'


const AnecdoteForm = () => {

  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({
        type:"NEW", payload: `anecdote '${newAnecdote.content}' created`
      })
      setTimeout(() => notificationDispatch({type:"REMOVE"}), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const anecdote = { content, votes: 0 }
    newAnecdoteMutation.mutate(anecdote)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
