import { getByLabelText, fireEvent, findByText } from '@testing-library/dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import createForm from './gift-form'

const server = setupServer()

beforeAll(() => server.listen())
beforeEach(() => {
  window.dataLayer = []
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('should display an error message if there is a problem with the API', async () => {
  server.use(
    rest.post('http://api.sendagifttosomeone.com/gifts', (_req, res, ctx) =>
      res(ctx.status(500), ctx.json({ error: 'Invalid object' }))
    )
  )
  const { container } = createForm()
  const firstName = getByLabelText(container, 'Email')

  fireEvent.change(firstName, { target: { value: 'Facundo' } })
  fireEvent.submit(container)

  const errorMessage = await findByText(
    container,
    /there was an error sending the request. Please try again/i
  )
  expect(errorMessage).toMatchSnapshot()
  expect(window.dataLayer).toMatchInlineSnapshot(`
    Array [
      Object {
        "error": "Request failed with status code 500",
        "formId": "gift",
      },
    ]
  `)
})

test('should display a success message', async () => {
  server.use(
    rest.post('http://api.sendagifttosomeone.com/gifts', (req, res, ctx) => {
      expect(req.body).toMatchInlineSnapshot(`
        Object {
          "email": "Facundo",
        }
      `)
      return res(ctx.status(200), ctx.json({ status: 'ok' }))
    })
  )
  const { container } = createForm()
  const firstName = getByLabelText(container, 'Email')

  fireEvent.change(firstName, { target: { value: 'Facundo' } })
  fireEvent.submit(container)

  const success = await findByText(container, /form sent successfully/i)
  expect(success).toMatchSnapshot()
  expect(window.dataLayer).toMatchInlineSnapshot(`
    Array [
      Object {
        "formId": "gift",
        "success": true,
      },
    ]
  `)
})
