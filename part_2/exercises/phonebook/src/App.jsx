import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsFilter, setPersonsFilter] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const checkName = persons.some(person => person.name.toUpperCase() === newName.toUpperCase()?.trim())

    if (checkName) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons([...persons, {
      name: newName.trim(),
      number: newNumber.trim()
    }])
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterPersons = (e) => {
    setPersonsFilter(persons.filter(person => person.name.toUpperCase().includes(e.target.value.toUpperCase()?.trim())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onInput={handleFilterPersons} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onInput={handleNewName} />
        </div>
        <div>
          number: <input onInput={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          personsFilter.length > 0 ?
            personsFilter.map((person, index) => <li key={index}>{`${person.name}: ${person.number}`}</li>) :
            persons.map((person, index) => <li key={index}>{`${person.name}: ${person.number}`}</li>)
        }
      </ul>
    </div>
  )
}

export default App