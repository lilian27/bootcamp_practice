import React from 'react'

const DetailPerson = ({ persona, handleDelete }) => {

    return (
        <div>
            <li>
                <span>{persona.name}</span>
                <span> {persona.number}</span>
                <button type="button" onClick={handleDelete}> Eliminar</button>
            </li>
        </div>
    )
}

export default DetailPerson;