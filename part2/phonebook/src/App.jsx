import { useState, useEffect } from 'react';
import numbersService from './services/numbers';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
    
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    numbersService
    .getAll()
    .then(initialNumbers => {
      setPersons(initialNumbers)
    })
}, [])
  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Do you want to replace the number?`
      );

    
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        numbersService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response : person
              )
            );            
          })
          

        setSuccessMessage(`Replaced ${newName}'s number in the phonebook`);
        setTimeout(() => {
          setSuccessMessage(null);
          }, 5000);
        setNewName('');
        setNewNumber('');
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };
      numbersService.add(personObject).then(response => {
        setPersons(persons.concat(response))
      });
      setSuccessMessage(`Added ${newName} to phonebook`);
      setTimeout(() => {
        setSuccessMessage(null);
        }, 5000);
      setNewName('');
      setNewNumber('');
    }
  }

  const deletePerson = (id, name) => {
    console.log(name);
    const confirmDelete = window.confirm(`Delete ${name}?`)
    if (confirmDelete) {
      numbersService.del(id)
      .then(
        setPersons(persons.filter(person => person.id !== id))
      )
      .catch((error) => {
        console.log(error);
        setErrorMessage(
          `information of ${name} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null);
          }, 5000);
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Notification message={errorMessage} isError />
      <Filter 
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>

      <Persons 
        filteredPersons={filteredPersons}
        onDelete={deletePerson}
      />
      ...
    </div>
  )
}

export default App