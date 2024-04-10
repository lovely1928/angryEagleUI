import React, { useContext, useEffect, useMemo, useState } from 'react'
import io from 'socket.io-client'
import { UserContext } from '../../store/userContext'
import { useNavigate, useParams } from 'react-router-dom'
import * as moment from 'moment-timezone'
import Loader from '../common/Loader.component'
import MessageContainer from './MessageContainer.component'
import ChatForm from './ChatForm.component'
import { UseCallApi } from '../../hooks/useApiCall'
const token = localStorage.getItem('token')
const socket = io.connect("http://localhost:4000",
  { auth: { token } }
)
const ChatSocket = () => {
  const navigate = useNavigate()
  const { id: recieverId } = useParams();
  const { user } = useContext(UserContext)
  const [messages, setMessages] = useState([]);
  const query = useMemo(
    () => ({
      userId: user.id,
      otherUserId: recieverId
    }), [user.id, recieverId]
  )


  const { loading, data = { data: {} }, error, message } = UseCallApi({
    url: 'http://localhost:4000/api/chat',
    method: 'get',
    query: query,
  })

  useEffect(() => {
    if (!loading && data) {
      setMessages(x => [...x, ...data.data.messages])
    }
  }, [loading])
  useEffect(() => {
    const messageHandler = (data) => {
      setMessages(prevMessages => [...prevMessages, data])
    }
    socket.on('messageToClient', messageHandler)

    return () => {
      socket.off('messageToClient', messageHandler); // Cleanup event listener
    };
  }, [])
  const sendMessageHandler = (message) => {
    const messageObj = {
      from: user.id,
      to: recieverId,
      message,
      module: 'personal chat',
      time: moment().unix(),
      conversationId: [user.id, recieverId].sort().join('.')
    }
    socket.emit('messageToServer', messageObj)
  }

  console.log('messages', messages)
  return (
    <div className='mt-[60px] mr-[35px] ml-[35px] mb-[60px] w-[1200px] justify-between flex flex-col'>
      {loading
        ?
        <Loader />
        :
        <>
          <div onClick={() => navigate('/user/profile/' + data.data.user.id)} className='flex flex-row items-center fixed z-10 bg-white border-b border-gray-300 w-full'>
            <img src={data.data.user.profileImage || '/samplePost.jpeg'} className="w-10 h-10 rounded-full border-1 border-grey" alt='post' />
            <strong className='px-2'>{data.data.user.firstName}</strong>
          </div>  
          <MessageContainer messages={messages} />
        </>}
      <ChatForm sendMessage={sendMessageHandler} />
    </div>
  )
}

export default ChatSocket


