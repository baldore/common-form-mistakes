import { trackAnalyticsEvent } from './utils/analytics'
import { createGift } from './services/gifts'

function renderTemplate(template) {
  const container = document.createElement('div')
  container.innerHTML = template
  return container.children[0]
}

function createForm() {
  const container = renderTemplate(`
    <form>
      <h1>Send Gift</h1>
      <div>
        <label for="email">Email</label>
        <input type="text" id="email" name="email" />
      </div>
      <button>Submit</button>
      <div data-message></div>
    </form>
  `)
  const messageContainer = container.querySelector('[data-message]')

  const getData = () => {
    const formData = new FormData(container)
    const data = Object.fromEntries(formData)
    return {
      email: data.email,
    }
  }

  const handleSuccess = () => {
    messageContainer.innerHTML = `Form sent successfully`
    trackAnalyticsEvent({ formId: 'gift', success: true })
  }

  const handleError = (error) => {
    messageContainer.innerHTML = `There was an error sending the request. Please try again.`
    trackAnalyticsEvent({ formId: 'gift', error: error.message })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = getData()
      await createGift(data)
      handleSuccess()
    } catch (e) {
      handleError(e)
    }
  }

  // Event binding
  container.addEventListener('submit', onSubmit)

  return {
    container,
  }
}

export default createForm
