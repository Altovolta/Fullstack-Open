import { useState } from 'react'


const Button = ({handler, text}) => {
  return (
    <button onClick={handler}> 
    {text}
    </button>
  )
}

const StatisticLine = ({value, text}) => (
  <>
    <p>{text} {value}</p>
  </>
)

const Statistics = ({good, neutral, bad}) => {

  const total = good + bad + neutral
  const average = (good - bad)/total
  const positive = good/total

  if (total == 0) {
    return (
      <>
        <p>
          No feedback given
        </p>
      </>
    )
  }

  return (
    <>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='All' value={total} />
      <StatisticLine text='Average' value={average} />
      <StatisticLine text='Positive' value={positive.toString().concat(' %')} />
    </>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    console.log("good +1")
    setGood(good + 1)
  }

  const handleNeutral = () => {
    console.log("neutral +1")
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    console.log("bad +1")
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={handleGood} text='good' />
      <Button handler={handleNeutral} text='neutral' />
      <Button handler={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App