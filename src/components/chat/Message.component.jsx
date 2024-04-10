import * as moment from 'moment-timezone';
import React, { useContext } from 'react'
import { UserContext } from '../../store/userContext';


const Message = ({ message }) => {
  const {user} = useContext(UserContext)
  console.log({ from: message.from, userId: user.id })

  const position = message.from === user.id ? 'justify-end' : 'justify-start'
  const bgColor = message.type === 'sent' ? 'bg-blue-500' : 'bg-gray-300';
  const textColor = message.type === 'sent' ? 'text-white' : 'text-black';
  return (
    <div className={`flex ${position}`}>
      <div className={`w-max p-3 rounded-lg ${bgColor} ${textColor} inline-block mb-2`}>
        <p className="text-sm">{message.message}</p>
        <p className={`text-xs text-gray-500 ${textColor}`}>{moment(message.time * 1000).format('YYYY-MM-DD HH:mm:ss')} </p>
      </div>
    </div>
  )
}

export default Message