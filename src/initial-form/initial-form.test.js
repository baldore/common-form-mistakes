import { getByLabelText, fireEvent, findByText } from '@testing-library/dom'
import createForm from './initial-form'

test('should initial structure', async () => {
  const { container } = createForm()
  const firstName = getByLabelText(container, 'First Name')

  fireEvent.change(firstName, { target: { value: 'Facundo' } })
  fireEvent.submit(container)

  const errorMessage = await findByText(container, /there was an error/i)
  expect(errorMessage).toMatchSnapshot()
})
