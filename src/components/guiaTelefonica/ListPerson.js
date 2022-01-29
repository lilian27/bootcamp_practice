import React from 'react'
import { Button } from 'react-bootstrap';

const ListPerson = ({ persona, handleDelete }) => {

    return (
        <tr>
            <td >
                {persona.name}
            </td>
            <td >
                {persona.number}
            </td>
            <td>
                <Button variant="link" onClick={handleDelete}> Eliminar</Button>
            </td>
        </tr>
    )
}

export default ListPerson;