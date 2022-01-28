import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Note from '../Note'

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    const component = render(
        <Note note={note} />
    )

    //component.debug()
    

    // se puede usar
    component.getByText(note.content)
    component.getByText('hacer no importante')
    // otra forma
    /*
    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    */
   /* para renderizar y ver el dom
   const li = component.container.querySelector('li')
   console.log( prettyDOM(li))
   */
})

test('clicking the button calls event handler once', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    // es como un espia
    const mockHandler = jest.fn()

    const component = render(
        <Note note={note} toggleImportance={mockHandler} />
    )

    const button = component.getByText('hacer no importante')
    fireEvent.click(button)

    // que sea lalamdo almenos 1 ves
    expect(mockHandler.mock.calls).toHaveLength(1)
})
