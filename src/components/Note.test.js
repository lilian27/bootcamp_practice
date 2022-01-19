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

    component.debug()


    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
})

test('clicking the button calls event handler once', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    const mockHandler = jest.fn()

    const component = render(
        <Note note={note} toggleImportance={mockHandler} />
    )

    const button = component.getByText('hacer no importante')
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})
