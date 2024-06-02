import React from 'react'
import Message from './Message.component'

// const messages = [

//   { text: 'HI there', type: 'recieve', time: 2345623323, },
//   { text: 'hello', type: 'sent', time: 2345623323, },
//   { text: 'how r u', type: 'recieve', time: 2345623323, },
//   { text: "I'm fine", type: 'sent', time: 2345623323, },
//   { text: 'How u doing', type: 'recieve', time: 2345623323, }

// ]
const MessageContainer = ({messages}) => {

  return (
    <div className= 'mx-[5px] flex flex-col justify-end relative max-h-[5 00px] h-[400px] w-[500px] overflow-y'>
      {messages?.length > 0 ?
        messages.map(x => <Message key={x.id} message={x} />) :
        <p>Your inbox is empty for now</p>
      }
    </div>
  )
}

export default MessageContainer