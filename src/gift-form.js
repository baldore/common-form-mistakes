import axios from 'axios'

const SERVER_ROOT = 'http://api.sendagifttosomeone.com'

// Needed for analytics
window.dataLayer = window.dataLayer || []

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

  const onSubmit = async (e) => {
    const form = e.target
    e.preventDefault()

    try {
      const formData = new FormData(form)
      const dataToSent = Object.fromEntries(formData)

      await axios.post(`${SERVER_ROOT}/gifts`, dataToSent)

      messageContainer.innerHTML = `Form sent successfully`

      // Analytics
      window.dataLayer.push({ formId: 'gift', success: true })
    } catch (e) {
      messageContainer.innerHTML = `There was an error sending the request. Please try again.`

      // Analytics
      window.dataLayer.push({
        formId: 'gift',
        error: e.message,
      })
    }
  }

  // Event binding
  container.addEventListener('submit', onSubmit)

  return {
    container,
  }
}

export default createForm
