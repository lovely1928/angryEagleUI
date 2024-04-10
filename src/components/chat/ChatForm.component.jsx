import React, { useRef, useState } from 'react'
import Button from '../common/Button.component'

const ChatForm = ({ sendMessage }) => {
  const newMessageRef = useRef()
  const [msg, setMsg] = useState('')
  const sendMsgHandler = (e) => {
    e.preventDefault()
    setMsg(x=>newMessageRef.current.value)
    sendMessage(newMessageRef.current.value)
    newMessageRef.current.value = ''
  }
  return (
    <form>
      <input ref={newMessageRef} className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500" placeholder='Please type your message...' />
      <Button type="submit" text="Send" onClick={sendMsgHandler} />
    </form>
  )
}

export default ChatForm