import React, { useState, useContext, useRef, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Loader from '../common/Loader.component'
import MessageContainer from './MessageContainer.component'
import ChatForm from './ChatForm.component'
import { UserContext } from '../../store/userContext'
import * as moment from 'moment-timezone';
import mqtt from 'mqtt'

const Chat = () => {
  const { id: recieverId } = useParams();
  const user = useContext(UserContext)
  
  const [isLoading, setIsLoading] = useState(false)
  const [client, setClient] = useState(null)
  // chat vars
  // const topic = 'chat' + user?.id + recieverId
  const topic = 'chat'
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  useEffect(() => {
    
    const cl = mqtt.connect("mqtt://test.mosquitto.org:1883");
    setClient(x=>cl)
    if(client){
    client.on("connect", () => {
      console.log('Connected')
      client.subscribe(topic)
      client.on('message', (topic, message) => {

        setMessages(prevMessages => [...prevMessages, JSON.parse(message.toString())])
      });
    });
  }
    return () => {
      client.end(); // Clean up MQTT client on component unmount
    };
  }, []);

  // const sendMessage = () => {
  //   client.publish('chat', newMessage);
  //   setNewMessage('');
  // };


  const sendMessageHandler = (message) => {
    // setNewMessage(message)
    const messageObj = {
      from: user.id,
      to: recieverId,
      message,
      module: 'personal chat',
      time: moment().unix()
    }

    if (client !== null) client.publish(topic, JSON.stringify(messageObj));
    // setNewMessage('');
  }


  return (
    <div className='w-500px border-black border-1 ml-20 mt-40'>
      {isLoading ? <Loader /> : <MessageContainer messages={messages} />}
      <ChatForm sendMessage={sendMessageHandler} />
    </div>
  )
}

export default Chat