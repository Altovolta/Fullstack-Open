import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdotesService from './services/anecdote'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './hooks/useNotification'

const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
    retry: 1
  })

  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: anecdotesService.update,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(anecdote => 
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      notificationDispatch({
        type:"NEW", payload: `anecdote '${updatedAnecdote.content}' voted`
      })
      setTimeout(() => notificationDispatch({type:"REMOVE"}), 5000)
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    voteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  if (result.isPending) {
    return(
      <div> Loading anecdotes ... </div>
    )
  } 
  
  if (result.isError) {
    return( 
      <div> 
        anecdote service not available due to problems in server 
      </div>
    )
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
