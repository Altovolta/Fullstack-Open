import { useState } from 'react'

const Button = ({handler, text}) => (
  <button onClick={handler}>
    {text}
  </button>
)

const DisplayAnecdote = ({anecdotes, votes, index}) => (
  <>
    <p>
      {anecdotes[index]}
    </p>
    <p>
      has {votes[index]} votes
    </p>
  </>
)

const MostVotedAnecdote = ({votes, anecdotes}) => {
  const maxValue = Math.max(...votes);
  const maxIndex = votes.indexOf(maxValue);

  console.log('Max votes:', maxValue, '| index:', maxIndex)

  return (
      <DisplayAnecdote votes={votes} anecdotes={anecdotes} index={maxIndex} />
  )
  
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))


  const handleNextAnecdote = () => {
    const max = anecdotes.length
    const randomInteger = Math.floor(Math.random() * (max))
    console.log(randomInteger)
    setSelected(randomInteger)
  }

  const handleVote = () => {
    const new_votes = [...votes]
    new_votes[selected] += 1
    setVotes(new_votes)
  }

  return (
    <div>
      <h1> Anecdote of the day </h1>
      <DisplayAnecdote votes={votes} anecdotes={anecdotes} index={selected} />
      <Button handler={handleVote} text='vote'/>
      <Button handler={handleNextAnecdote} text='next anecdote'/>

      <h1> Anecdote with most votes</h1>
      <MostVotedAnecdote votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App