import './App.css';
import React, { useState, useEffect } from 'react'
import Display from './Display.js'
import Button from './Button.js'
import Note from './Note.js'
import PersonForm from './PersonForm'
import Index from './paises/Index.js'
import noteService from './services/notes'

function App() {

  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
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

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response))
      }).catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <div id="contador">
        <Display counter={counter} />
        <Button
          handleClick={increaseByOne}
          text='plus'
        />
        <Button
          handleClick={setToZero}
          text='zero'
        />
        <Button
          handleClick={decreaseByOne}
          text='minus'
        />
      </div>
      <div id="notas">
        <h1>Notes</h1>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}

          </button>
        </div>
        <ul>
          {notesToShow.map(note => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>

        <form onSubmit={addNote}>
          <input value={newNote}
            onChange={handleNoteChange}
          ></input>
          <button type="submit"> Save</button>

        </form>
      </div>

      <div id="guia-telefonica">
        <hr />
        <PersonForm />
      </div>

      <div>
        <hr />
        <Index />
      </div>
    </div>
  );
}

export default App;
