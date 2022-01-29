import React from 'react'
import { Button } from 'react-bootstrap'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ?
    'hacer no importante' :
    'make important'

  return (
    <tr>
      <td className='note'>
        {note.content}
      </td>
      <td>
        <Button variant="link" onClick={toggleImportance}> {label}</Button>
      </td>
    </tr>
  )
}

export default Note