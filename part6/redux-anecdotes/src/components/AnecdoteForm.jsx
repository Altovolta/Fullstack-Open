import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const newNote = (event) => {
      event.preventDefault()
      console.log(event.target.anecdote.value)
      dispatch(createAnecdote(event.target.anecdote.value))
      event.target.anecdote.value = ''
    }

    return ( 
      <div>
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


export default AnecdoteForm