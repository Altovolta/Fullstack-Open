import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => 
    state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} 
          anecdote={anecdote} 
          onVote={() => vote(anecdote.id)}
        />
      )}
    </div>
  )
}

export default AnecdoteList