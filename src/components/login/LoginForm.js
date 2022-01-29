import React, { useState } from 'react'
import Togglable from '../utils/Togglable'
import noteService from '../../services/notes'
import loginService from '../../services/login'
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const history = useHistory();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
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
    history.push("/");

    
  }
  const handleSetUsername = (event) => {
    setUsername(event.target.value)
  }
  const handleSetPassword = (event) => {
    setPassword(event.target.value)
  }
  return (
    <Togglable buttonLabel='Iniciar Sessión'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={handleSetUsername}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            onChange={handleSetPassword}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </Togglable>
  )
}

export default LoginForm