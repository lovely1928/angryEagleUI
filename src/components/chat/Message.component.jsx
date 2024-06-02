import * as moment from 'moment-timezone';
import React, { useContext } from 'react'
import { UserContext } from '../../store/userContext';


const Message = ({ message }) => {
  const {user} = useContext(UserContext)

  const position = message.from === user.id ? 'justify-end' : 'justify-start'
  const bgColor = message.from === user.id ? 'bg-gradient-to-r from-sky-200 to-slate-50' : 'bg-gradient-to-r from-stone-200 to-slate-50';
  const textColor = message.type === 'sent' ? 'text-white' : 'text-black';
  return (
    <div className={`flex ${position}`}>
      <div className={`w-max p-3 rounded-lg ${bgColor} ${textColor} inline-block mb-2`}>
        <p className="text-sm">{message.message}</p>
        <p className={`text-xs text-gray-500  ${textColor}`}>{moment(message.time * 1000).format('YYYY-MM-DD HH:mm:ss')} </p>
      </div>
    </div>
  )
}

export default Message
