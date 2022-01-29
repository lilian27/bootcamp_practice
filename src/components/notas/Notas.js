import React, { useState, useEffect } from 'react'
import noteService from '../../services/notes'
import Note from './Note'
import Notificacion from '../utils/Notificacion'
import NoteForm from './NoteForm'
import { Table, Col, Button, Row } from 'react-bootstrap'

const Notas = () => {
    const [showAll, setShowAll] = useState(true)
    const [notes, setNotes] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [tipoMessage, setTipoMessage] = useState(null)

    useEffect(() => {
        noteService
            .getAll()
            .then(response => {
                setNotes(response)
            })
    }, [])

    const sendMessage = (mensaje, tipoMensaje) => {
        setErrorMessage(mensaje)
        setTipoMessage(tipoMensaje)
        setTimeout(() => {
            setErrorMessage(null)
        }, 3000)
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    const toggleImportanceOf = (id) => {
        console.log("HACIENDO CAMBIO!!!!")
        console.log("OBJ NOTES!!!!", notes)
        const note = notes.find(n => n.id === id)
        console.log('REGISTRO ENCONTRADOO', note)
        //const changedNote = { ...note, important: !note.important }
        const changedNote = { content: note.content, important: !note.important }

        console.log('ID::', id)
        console.log('changedNote::', changedNote)
        noteService
            .update(id, changedNote)
            .then(response => {
                console.log('RESPONSE', response)
                setNotes(notes.map(note => note.id !== id ? note : response))
                sendMessage(`Note '${note.content}' ha cambiado importancia!!!`, 0)

            }).catch(error => {
                console.log('ERROR', error)
                setNotes(notes.filter(n => n.id !== id))
                sendMessage(`Nota '${note.content}' ya existe`, 1)
            })
    }

    return (
        <div className="mt-5">
            <Notificacion messaje={errorMessage} tipo={tipoMessage}></Notificacion>

            <NoteForm notes={notes} setNotes={setNotes} />

            <h4 className="mt-5">Listado de notas</h4>
            <Row className="justify-content-end ">
                <Col sm="12" md="3" >
                    <Button variant="primary" className="btn-block" onClick={() => setShowAll(!showAll)}>
                        Ver {showAll ? 'importantes' : 'todos'}
                    </Button>
                </Col>
            </Row>

            <Table responsive striped>
                <thead>
                    <tr>
                        <th>Texto</th>
                        <th> Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {notesToShow.map(note => (
                        <Note
                            key={note.id}
                            note={note}
                            toggleImportance={() => toggleImportanceOf(note.id)}
                        />
                    ))
                    }
                </tbody>
            </Table>

        </div>
    )
}

export default Notas