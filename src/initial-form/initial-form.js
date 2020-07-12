function renderTemplate(template) {
  const container = document.createElement('div')
  container.innerHTML = template
  return container.children[0]
}

function createForm() {
  const template = `
    <form>
      <div>
        <label for="first-name">First Name</label>
        <input type="text" id="first-name" name="first-name" />
      </div>
      <button>Submit</button>
      <div data-error></div>
    </form>
  `

  const container = renderTemplate(template)

  const onSubmit = (e) => {
    e.preventDefault()
    const errorContainer = container.querySelector('[data-error]')
    errorContainer.innerHTML = 'There was an error.'
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
