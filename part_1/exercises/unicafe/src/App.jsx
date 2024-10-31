import { useState } from 'react'

import Statistics from './components/Statistics'
import Button from './components/Button'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button
          name="good"
          onClick={handleGood}
        />
        <Button
          name="neutral"
          onClick={handleNeutral}
        />
        <Button
          name="bad"
          onClick={handleBad}
        />
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App