import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => 
    state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(createNotification(`you voted '${anecdote.content}'`))
    
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} 
          anecdote={anecdote} 
          onVote={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList