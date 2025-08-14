import PropTypes from 'prop-types'

const Anecdote = ({anecdote, onVote}) => {
    return (
      <>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={onVote}>vote</button>
        </div>
      </>
    )
}

Anecdote.propTypes = ({
  anecdote: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired
  }),
  onVote: PropTypes.func.isRequired
})

export default Anecdote