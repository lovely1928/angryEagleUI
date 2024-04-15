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
    <div className='mt-[43px] mx-[5px] flex flex-col relative max-h-[550px] w-[500px] overflow-auto'>
      {messages?.length > 0 ?
        messages.map(x => <Message key={x.time} message={x} />) :
        <p>Your inbox is empty for now</p>
      }
    </div>
  )
}

export default MessageContainer