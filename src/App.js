import './App.css';
import React, { useState, useEffect } from 'react'
import Display from './Display.js'
import Button from './Button.js'
import Note from './Note.js'
import PersonForm from './PersonForm'
import Index from './paises/Index.js'
import noteService from './services/notes'
import Notificacion from './Notificacion';
import Footer from './Footer';

function App() {

  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [tipoMessage, setTipoMessage] = useState(null)

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

  
  const sendMessage = (mensaje, tipoMensaje) => {
    setErrorMessage(mensaje)
    setTipoMessage(tipoMensaje)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }
  

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response))

        sendMessage(`Note '${note.content}' ha cambiado importancia!!!`, 0)

      }).catch(error => {
        setNotes(notes.filter(n => n.id !== id))
        sendMessage(`Nota '${note.content}' ya existe`, 1)
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
        <Notificacion messaje={errorMessage} tipo={tipoMessage}></Notificacion>
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

      <Footer> </Footer>
    </div>
  );
}

export default App;
