import { useState } from 'react'

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

  const [mostVoted, setMostVoted] = useState(null)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  let mostVotedAnecdote = null

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * 8))
  }

  const handleVotes = () => {
    const currentVotes = {
      ...votes,
      [selected]: Object.hasOwn(votes, selected) ? votes[selected] + 1 : 1
    }

    mostVotedAnecdote = Object.entries(currentVotes).reduce((max, curr) =>
      curr[1] > max[1] ? curr : max
    )[0]

    setVotes(currentVotes)
    setMostVoted(mostVotedAnecdote)
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has { Object.hasOwn(votes, selected) ? votes[selected] : 0 } votes</p>
        <button onClick={handleVotes}>vote</button>
        <button onClick={handleNextAnecdote}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes {mostVotedAnecdote}</h1>
        <p>{anecdotes[mostVoted]}</p>
        {mostVoted ? <p>has {votes[mostVoted]} votes</p> : ''}
      </div>
    </div>
  )
}

export default App