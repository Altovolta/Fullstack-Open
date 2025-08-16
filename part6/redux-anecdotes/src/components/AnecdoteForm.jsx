import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const newNote = async (event) => {
      event.preventDefault()

      const content = event.target.anecdote.value
      dispatch(createAnecdote(content))
      
      event.target.anecdote.value = ''
      dispatch(createNotification(`created '${content}'`))
    
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
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