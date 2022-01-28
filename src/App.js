import './App.css'
import React, { useState, useEffect } from 'react'

import PersonForm from './components/guiaTelefonica/PersonForm'
import Index from './components/paises/Index.js'
import noteService from './services/notes'

import Footer from './components/footer/Footer'
import loginService from './services/login'
import LoginForm from './components/login/LoginForm'
import NoteForm from './NoteForm'
import Contador from './components/contador/Contador'

import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Link } from 'react-router-dom';

import Notas from './components/notas/Notas'
import Home from './components/home/Home'
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [tipoMessage, setTipoMessage] = useState(null)

  // validar si los datos del usuario a esta conectado
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

 
  const sendMessage = (mensaje, tipoMensaje) => {
    setErrorMessage(mensaje)
    setTipoMessage(tipoMensaje)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

 
  const cerrarSession = () => {
    window.localStorage.clear()
    setUser(null)
    history.push("/");
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Router>
        <div>
        <Link style={padding} to="/"></Link>
          <Link style={padding} to="/home">Home</Link>
          <Link style={padding} to="/contador">Contador</Link>
          <Link style={padding} to="/notas">Notas</Link>
          <Link style={padding} to="/guia-telefonica">Guía telefonica</Link>
          <Link style={padding} to="/paises">Paises</Link>
          {
            window.localStorage.getItem('loggedAppUser')
              ? <button type="button" color="inherit" onClick={cerrarSession}>Logout</button>
              : <Link style={padding} to="/login">login</Link>
          }
        </div>

        <Switch>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/login'>
            <LoginForm />
          </Route>
          <Route path='/contador'>
            <Contador />
          </Route>
          <Route path='/notas'>
            <Notas />
          </Route>
          <Route path='/guia-telefonica'>
            <PersonForm />
          </Route>
          <Route path='/paises'>
            <Index />
          </Route>
        </Switch>
      </Router>
      <Footer> </Footer>
    </div>
  )
}

export default (App)
