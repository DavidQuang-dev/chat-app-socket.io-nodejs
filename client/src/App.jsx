import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import './App.css'

function App() {
  const [messageInput, setMessageInputs] = useState({})
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('') // Moved prompt to state
  const socket = io('http://localhost:3000')

  const handleInput = (event) => {
    const {name, value} = event.target
    let obj = {[name]: value}
    setMessageInputs((prev) => ({...prev, ...obj}))
  }
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    socket.emit('on-chat', {name, message: messageInput.message})
    socket.on('user-chat', (data) => {
      setMessages(data)
    }) // Thêm tin nhắn vào danh sách messages
    setMessageInputs({
      message: ""
    })
  }

  useEffect(() => {
    socket.on('user-chat', (data) => {
      setMessages(data)
    })
    const name = window.prompt('nhập tên vào đây')
    setName(name)
  }, [])
  return (
    <>
      <h1>Chat With Me</h1>
      <div id='messages'>
          {messages.map((message, index) => (
            <p key={index}>{message.name}: {message?.message}</p>
          ))}
      </div>
      <form id='chat-form' onSubmit={handleSubmit}>
        <input 
          id='chat-mes' 
          type='text'
          name='message'
          value={messageInput.message}
          onChange={handleInput}/>
        <button id='send-chat' onClick={handleSubmit}>send</button>
      </form>
    </>
  )
}
export default App
