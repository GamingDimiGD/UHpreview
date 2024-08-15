const submitButton = $('#submit')[0]
const input = $('.promocode-input')[0]
submitButton.addEventListener('click', () => {
    input.preventDefault()
})