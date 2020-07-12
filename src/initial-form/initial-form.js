import axios from 'axios'

const SERVER_ROOT = 'http://api.sendagifttosomeone.com'

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
      <div data-error></div>
    </form>
  `)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      // TODO: Get data from form
      // TODO: Pass data to post (without mapping it)
      const content = await axios.post(`${SERVER_ROOT}/gifts`)
      // TODO: Add analytics example (without abstraction)
      console.log({ content })
    } catch (e) {
      const requestError = e.response.data.message
      const errorContainer = container.querySelector('[data-error]')
      errorContainer.innerHTML = `There was an error: ${requestError}`
    }
  }

  const init = () => {
    container.addEventListener('submit', onSubmit)
  }

  init()

  return {
    container,
  }
}

export default createForm
