import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsFilter, setPersonsFilter] = useState([])

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