import React, { useState } from 'react'

const ListPerson = ({persons}) => {
    const [newFilter, setNewFilter] = useState('')
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
    const filterNames = name => {
        return persons.filter((x) =>
            x.name.toLowerCase().indexOf(name.toLowerCase()) > -1
        );
    }

    const filterToShow = newFilter.length > 0 ? filterNames(newFilter) : persons

    return (
        <div>
            <h2>Numbers</h2>
            <div>filter shown whith <input value={newFilter} onChange={handleFilterChange} /></div>
            <ul>
                {filterToShow.map(persona => (
                    <li key={persona.id}>
                        <span>{persona.name}</span>
                        <span>   {persona.number}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListPerson;