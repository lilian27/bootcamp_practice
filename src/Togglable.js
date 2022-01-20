import React, { useState } from 'react'
import propTypes from 'prop-types'

const Togglable = ({children, buttonLabel}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={()=> setVisible(true)}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={()=> setVisible(false)}>cancel</button>
      </div>
    </div>
  )
}
Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired
}
export default Togglable