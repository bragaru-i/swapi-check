import { render, screen, fireEvent } from '@testing-library/react'
import { InputCell } from './input-cell'

describe('InputCell', () => {
  it('displays the initial value correctly', () => {
    render(
      <InputCell
        value='Initial Value'
        description='Test'
      />
    )

    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Initial Value')).toBeInTheDocument()
  })

  it('toggles the input field when edit button is clicked', () => {
    render(
      <InputCell
        value='Initial Value'
        description='Test'
      />
    )

    // Ensure input is not initially visible
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()

    // Click on the edit button to enable editing
    fireEvent.click(screen.getByLabelText('edit'))

    // Ensure input field appears
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('saves the new value and displays it after clicking save', () => {
    render(
      <InputCell
        value='Initial Value'
        description='Test'
      />
    )

    // Click on the edit button to enable editing
    fireEvent.click(screen.getByLabelText('edit'))

    // Enter new value in the input field
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'New Value' } })

    // Click on the save button
    fireEvent.click(screen.getByLabelText('save'))

    // Ensure the new value is displayed
    expect(screen.getByText('New Value')).toBeInTheDocument()
  })

  it('does not update the value when the input is not edited and save is clicked', () => {
    render(
      <InputCell
        value='Initial Value'
        description='Test'
      />
    )

    // Click on the edit button to enable editing
    fireEvent.click(screen.getByLabelText('edit'))

    // Do not change input and click on save
    fireEvent.click(screen.getByLabelText('save'))

    // Ensure the value is still the initial value
    expect(screen.getByText('Initial Value')).toBeInTheDocument()
  })
})
