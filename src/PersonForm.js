import React, { useState, useEffect } from 'react'
import ListPerson from './DetailPerson'
import personService from './services/person'

const PersonForm = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        personService.getAll().then(response => {
            setPersons(response);
        })
    }, [])

    const addName = (event) => {
        event.preventDefault()
        const existe = persons.filter(item => item.name.toLowerCase() === newName.toLowerCase());
        const nameObjet = {
            name: newName,
            id: newName,
            number: newNumber
        }

        if (existe.length === 0) {
            personService.create(nameObjet).then(response => {
                setPersons(persons.concat(nameObjet))
                setNewName('')
                setNewNumber('')
            }).catch(error => {
                console.log(`error ${error}`);
            })
        } else {
            const idUpdate = existe[0].id
            if (window.confirm(`${newName} ya se encuentra registrado, ¿Desea reemplazar el número?`)) {
                personService.update(idUpdate, nameObjet).then(response => {
                    setPersons(persons.map(persons => persons.id !== idUpdate ? persons : response))
                })
            };
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const filterNames = name => {
        return persons.filter((x) =>
            x.name.toLowerCase().indexOf(name.toLowerCase()) > -1
        );
    }

    const handleDelete = (id) => {
        personService.remove(id).then(response => {
            setPersons(persons.filter(persona => persona.id !== id))
        }).catch(error => {
            console.log(`Un error ha ocurrido al eliminar persona`)
        })
    }

    const filterToShow = newFilter.length > 0 ? filterNames(newFilter) : persons

    return (
        <div>
            <h2>Guía telefonica</h2>
            <form onSubmit={addName}>
                <div>
                    Name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    Number: <input value={newNumber} onChange={handleNumberChange} />
                    <button type="submit">guardar</button>
                </div>
                <div>
                    <h2>Numbers</h2>
                    <div>filter shown whith <input value={newFilter} onChange={handleFilterChange} /></div>
                    <ul>
                        {filterToShow.map(persona => (
                            <ListPerson key={persona.id} persona={persona} handleDelete={() => handleDelete(persona.id)} />
                        ))}
                    </ul>
                </div>
            </form>
        </div>
    )
}
export default PersonForm
