import { getByLabelText, fireEvent, findByText } from '@testing-library/dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import createForm from './initial-form'

const server = setupServer()

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

test('should display an error message if there is a problem with the API', async () => {
  server.use(
    rest.post('http://api.sendagifttosomeone.com/gifts', (_req, res, ctx) =>
      res(ctx.status(500), ctx.json({ message: 'Invalid object' }))
    )
  )
  const { container } = createForm()
  const firstName = getByLabelText(container, 'Email')

  fireEvent.change(firstName, { target: { value: 'Facundo' } })
  fireEvent.submit(container)

  const errorMessage = await findByText(
    container,
    /there was an error: invalid object/i
  )
  expect(errorMessage).toMatchSnapshot()
})

test('should display a success message', async () => {
  server.use(
    rest.post('http://api.sendagifttosomeone.com/gifts', (_req, res, ctx) =>
      res(ctx.status(200), ctx.json({ status: 'ok' }))
    )
  )
  const { container } = createForm()
  const firstName = getByLabelText(container, 'Email')

  fireEvent.change(firstName, { target: { value: 'Facundo' } })
  fireEvent.submit(container)

  const success = await findByText(container, /form sent successfully/i)
  expect(success).toMatchSnapshot()
})
