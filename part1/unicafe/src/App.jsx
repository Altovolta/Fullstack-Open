import { useState } from 'react'


const Button = ({handler, text}) => {
  return (
    <button onClick={handler}> 
    {text}
    </button>
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

  const total = good + bad + neutral
  const average = (good - bad)/total
  const positive = good/total

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={handleGood} text='good' />
      <Button handler={handleNeutral} text='neutral' />
      <Button handler={handleBad} text='bad' />
      <h1>statistics</h1>
      <p>
        good {good}
      </p>
      <p>
        neutral {neutral}
      </p>
      <p>
        bad {bad}
      </p>
      <p>
        All {total}
      </p>
      <p>
        Average {average}
      </p>
      <p>
        Positive {positive}%
      </p>
    </div>
  )
}

export default App