import React, { useState } from 'react'
import Display from './Display'
import Button from '../../Button'

const Contador = ({ note, toggleImportance }) => {
    const [counter, setCounter] = useState(0)
    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    /*
    const label = note.important ?
        'hacer no importante' :
        'make important'
        */

    return (
        <div>
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
    )
}

export default Contador