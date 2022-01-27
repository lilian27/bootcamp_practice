import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from '../Togglable'

describe('<Toggable />', () =>{
    let component
    let butonLabel = 'show'

    beforeEach( () =>{
        component = render(
            <Togglable buttonLabel={butonLabel}>
                <div className='testDiv'>hola mundo</div>
            </Togglable>
        )
    })

    test('renders its children', () =>{
        component.getByText('hola mundo')
    })

    test('renders its children but its no visible', () =>{
        const element = component.getByText('hola mundo')
        expect(element.parentNode).toHaveStyle('display: none')
    })

    test('after clicking its children must be shown', () =>{
        const button = component.getByText(butonLabel)
        fireEvent.click(button)
        
        const elemento = component.getByText('hola mundo')
        expect(elemento.parentNode).not.toHaveStyle('display: none')
        
    })
})