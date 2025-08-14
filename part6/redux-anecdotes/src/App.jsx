import { useSelector, useDispatch } from 'react-redux'
import { voteNote , createNote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteNote(id))
  }

  const newNote = (event) => {
    event.preventDefault()
    console.log(event.target.anecdote.value)
    dispatch(createNote(event.target.anecdote.value))
    event.target.anecdote.value = ''

  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={newNote}>
        <div>
          <input type="text" name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App