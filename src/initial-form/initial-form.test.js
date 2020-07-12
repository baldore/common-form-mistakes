test('should initial structure', () => {
  const form = createForm()

  document.body.appendChild(form.render())
  form.init()
})
