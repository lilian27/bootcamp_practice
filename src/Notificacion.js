import React, { useState, useEffect } from 'react'
const Notificacion = ({ messaje, tipo }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [tipoMessage, setTipoMessage] = useState(null)

  useEffect(() => {
    console.log('Mostrando error')
    sendMessage(messaje, tipo)
  }, [messaje, tipo])

  const sendMessage = (mensaje, tipoMensaje) => {
    setErrorMessage(mensaje)
    setTipoMessage(tipoMensaje)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  if (messaje === null) {
    return null
  }

  const estiloMensaje = tipoMessage === 1 ? 'error' : 'process'
  return <div className={estiloMensaje}>{errorMessage}</div>
}

export default Notificacion
