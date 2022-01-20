import React, { useState } from 'react'
import noteService from './services/notes'

const NoteForm = ({notes, setNotes}) => {
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
      <h2>Create a new note</h2>

      <form onSubmit={createNote}>
        <input
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default NoteForm
