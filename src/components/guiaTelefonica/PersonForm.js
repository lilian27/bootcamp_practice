import React, { useState, useEffect } from 'react'
import ListPerson from './ListPerson'
import personService from '../../services/person'
import Notificacion from '../utils/Notificacion'
import { Form, Row, Col, Button, Table } from 'react-bootstrap'

const PersonForm = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [tipoMessage, setTipoMessage] = useState(null)

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

                sendMessage('Persona ha sido agregada', 0)
            }).catch(error => {
                console.log(`error ${error}`);
                sendMessage('Persona no puso ser agregada', 1)
            })
        } else {
            const idUpdate = existe[0].id
            if (window.confirm(`${newName} ya se encuentra registrado, ¿Desea reemplazar el número?`)) {
                personService.update(idUpdate, nameObjet).then(response => {
                    setPersons(persons.map(persons => persons.id !== idUpdate ? persons : response))

                    sendMessage('Número telefonico fue actualizado!!!', 0)
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

            sendMessage('Registro eliminado correctamente', 0)
        }).catch(error => {
            sendMessage('Un problema ha ocurrido', 1)
        })
    }

    const filterToShow = newFilter.length > 0 ? filterNames(newFilter) : persons

    const sendMessage = (mensaje, tipoMensaje) => {
        setErrorMessage(mensaje)
        setTipoMessage(tipoMensaje)
        setTimeout(() => {
            setErrorMessage(null)
        }, 3000)
    }

    return (
        <div className="pt-5">
            <h4>Agregar nuevo contacto</h4>
            <Notificacion messaje={errorMessage} tipo={tipoMessage}></Notificacion>

            <Form onSubmit={addName}>
                <Row>
                    <Col sm="12" md="4" >
                        <Form.Group className="mb-3" controlId="name" value={newName}
                            onChange={handleNameChange}>
                            <Form.Control type="text" placeholder="Ingrese Nombre" />
                        </Form.Group>
                    </Col>
                    <Col sm="12" md="4" >
                        <Form.Group className="mb-3" controlId="number" value={newNumber}
                            onChange={handleNumberChange}>
                            <Form.Control type="text" placeholder="Ingrese Número" />
                        </Form.Group>
                    </Col>
                    <Col sm="12" md="2">
                        <Button className="btn-block" type="submit">Agregar</Button>
                    </Col>
                </Row>
            </Form>


            <h4 className="mt-5">Lista de contactos</h4>
            <Row className="justify-content-end ">
                <Col sm="12" md="3" >
                    <Form>
                        <Form.Group className="mb-3" controlId="filter" value={newFilter}
                            onChange={handleFilterChange}>
                            <Form.Control type="text" placeholder="Buscar nombre" />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th> Telefono</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {filterToShow.map(persona => (
                        <ListPerson key={persona.id} persona={persona} handleDelete={() => handleDelete(persona.id)} />
                    ))
                    }
                </tbody>
            </Table>

        </div>
    )
}
export default PersonForm
