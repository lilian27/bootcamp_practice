import './App.css'
import React, { useState, useEffect } from 'react'
import PersonForm from './components/guiaTelefonica/PersonForm'
import Index from './components/paises/Index.js'
import noteService from './services/notes'
import Footer from './components/footer/Footer'
import LoginForm from './components/login/LoginForm'
import Contador from './components/contador/Contador'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Link } from 'react-router-dom';
import Notas from './components/notas/Notas'
import Home from './components/home/Home'
import { useHistory } from "react-router-dom";
import { Nav, Item, Navbar, NavDropdown, Container } from 'react-bootstrap'

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
    <div className="container">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" as="span">
                <Link style={padding} to="/">Home</Link>
              </Nav.Link>
              <Nav.Link href="#home" as="span">
                <Link style={padding} to="/contador">Contador</Link>
              </Nav.Link>
              <Nav.Link href="#home" as="span">
                <Link style={padding} to="/notas">Notas</Link>
              </Nav.Link>
              <Nav.Link href="#home" as="span">
                <Link style={padding} to="/guia-telefonica">Guía telefonica</Link>
              </Nav.Link>
              <Nav.Link href="#home" as="span">
                <Link style={padding} to="/paises">Paises</Link>
              </Nav.Link>
              <Nav.Link href="#home" as="span" >
                {
                  window.localStorage.getItem('loggedAppUser')
                    ? <button type="button" color="inherit" onClick={cerrarSession}>Logout</button>
                    : <Link style={padding} to="/login">login</Link>
                }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {
          window.localStorage.getItem('loggedAppUser')
            ? <div className='user pt-2'>
              <p><strong>Bienvenid@:</strong> </p>
            </div>
            : ''
        }
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
