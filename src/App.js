import './App.css'
import React, { useState, useEffect } from 'react'
import Display from './Display.js'
import Button from './Button.js'
import Note from './Note.js'
import PersonForm from './PersonForm'
import Index from './paises/Index.js'
import noteService from './services/notes'
import Notificacion from './Notificacion'
import Footer from './Footer'
import loginService from './services/login'
import LoginForm from './LoginForm'
import NoteForm from './NoteForm'

function App() {

  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)


  const [showAll, setShowAll] = useState(true)

  const [errorMessage, setErrorMessage] = useState(null)
  const [tipoMessage, setTipoMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notes, setNotes] = useState([])



  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])

  // validar si los datos del usuario a esta conectado
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])







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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      sendMessage('Wrong credentials', 1)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const cerrarSession = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <div id='contador'>
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

      <Notificacion messaje={errorMessage} tipo={tipoMessage}></Notificacion>
      {
        user
          ?
          <div>
            <div className='user'>
              <p><strong>Bienvenid@:</strong> {user.name} </p>
              <button type='submit' onClick={cerrarSession}> Salir</button>
            </div>
            <NoteForm notes={notes} setNotes={setNotes} />
          </div>
          : <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
      }

      <div id='notas'>
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
      </div>
      <div id='guia-telefonica'>
        <hr />
        <PersonForm />
      </div>
      <div>
        <hr />
        <Index />
      </div>
      <Footer> </Footer>
    </div>
  )
}

export default App
