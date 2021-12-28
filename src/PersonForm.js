

import React, { useState, useEffect } from 'react'
import ListPerson from './ListPerson'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/guia'



const PersonForm = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    useEffect(() =>{
        console.log('entro effect');
        axios.get(baseUrl).then(response => {
            console.log('data personas', response);
            setPersons(response.data);
        })
    }, [])

    const addName = (event) => {
        event.preventDefault()
        console.log('add new name')
        const existe = persons.includes(newName);

        if (!existe) {
            const nameObjet = {
                name: newName,
                id: Math.random(),
                number: newNumber
            }

            //axios.post(baseUrl, nameObjet)
            setPersons(persons.concat(nameObjet))

            setNewName('')
            setNewNumber('')
        } else {
            alert(`${newName} is already added to phonebook`);
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

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

                {
                    persons.length > 0 && <ListPerson persons={persons} />
                }

            </form>
        </div>
    )
}

export default PersonForm