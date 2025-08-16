import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const shownAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {shownAnecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} 
          anecdote={anecdote} 
          onVote={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList