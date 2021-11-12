const messageContainer = document.querySelector('ul')
const nicknameForm = document.querySelector('.nickname-form')
const messageForm = document.querySelector('.message-form')

console.log(nicknameForm.querySelector('input'))
console.log(messageForm)

const socket = new WebSocket(`ws://${window.location.host}`)

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const input = nicknameForm.querySelector('input')
  const data = JSON.stringify({
    type: 'nickname',
    payload: input.value,
  })
  socket.send(data)
})

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const input = messageForm.querySelector('input')
  const data = JSON.stringify({
    type: 'message',
    payload: input.value,
  })
  socket.send(data)

  const li = document.createElement('li')
  li.innerText = `You: ${input.value}`
  messageContainer.appendChild(li)

  input.value = ''
})

socket.addEventListener('open', () => {
  console.log('connected to Server 🎈')
})

socket.addEventListener('message', (message) => {
  const li = document.createElement('li')
  li.innerText = message.data
  messageContainer.appendChild(li)
})

socket.addEventListener('close', () => {
  console.log('Connection from Server ❌')
})
