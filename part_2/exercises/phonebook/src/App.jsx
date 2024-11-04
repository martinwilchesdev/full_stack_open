import Person from './components/Person'

import { useState, useEffect } from 'react'
import services from './services/persons'
import { v4 as uuidv4 } from 'uuid'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [personsFilter, setPersonsFilter] = useState([])

  useEffect(() => {
    services.getAll()
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

    const newPerson = {
      id: uuidv4(),
      name: newName.trim(),
      number: newNumber.trim()
    }

    services.addPerson(newPerson)
    setPersons([ ...persons, newPerson ])
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      services.deletePerson(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterPersons = (e) => {
    const name = e.target.value

    setFilterName(name)
    setPersonsFilter(persons.filter(person => person.name.toUpperCase().includes(name.toUpperCase()?.trim())))
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
        <Person persons={filterName !== '' ? personsFilter : persons} onDelete={handleDelete} />
      </ul>
    </div>
  )
}

export default App