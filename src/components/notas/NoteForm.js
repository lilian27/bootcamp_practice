import React, { useState } from 'react'
import noteService from '../../services/notes'
import { Form, Button, Row, Col } from 'react-bootstrap'

const NoteForm = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState('')
  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const createNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: newNote
    }

    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response))
        setNewNote('')
      })
  }

  return (
    <div>
      <h4>Agregar nueva nota</h4>
      <Form onSubmit={createNote}>
        <Row>
          <Col sm="12" md="4">
            <Form.Group className="mb-3" controlId="formBasicEmail" value={newNote}
              onChange={handleChange}>
              <Form.Control type="text" placeholder="Ingrese Texto" />
            </Form.Group>
          </Col>
          <Col sm="12" md="2">
            <Button className="btn-block" type="submit">Agregar</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
export default NoteForm
