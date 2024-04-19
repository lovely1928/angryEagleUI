import React, { useEffect, useState } from 'react'
import { UseCallApi } from '../../hooks/useApiCall'
import Loader from '../common/Loader.component'
import * as moment from 'moment-timezone';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import ChatSocket from './ChatSocket.component';
const ConversationSummary = () => {
    // debugger
    const { loading, data = { data: {} } } = UseCallApi({
        url: 'http://localhost:4000/api/chat/summary',
        method: 'get',
    })
    const navigate = useNavigate()
    const [recieverId, setRecieverId] = useState(null)
    useEffect(() => {
        if (!loading) {
            setRecieverId(data?.data[0].otherUserId)
        }
    }, [loading])

    const updateChat = (id) => {
        setRecieverId(id)
    }


    return (
        <div className='mt-[60px] mb-[60px] px-[10px] w-[1200px] flex flex-col overflow-auto'>
            <div className='border-bottom border-grey flex my-[16px] flex-row justify-between items-center sticky'>
                <h1 className='text-xl font-bold'>Your chats</h1>
            </div>
            <div className='flex flex-row'>
                {loading
                    ?
                    <Loader />
                    :
                    <div  >
                        {data.data.map((x) => {
                            const activeChatColort = x.otherUserId === recieverId ? 'bg-gradient-to-r from-sky-200 to-slate-50' : ""
                            return <div key={Math.random()} onClick={() => updateChat(x.otherUserId)} className={`flex flex-row w-[400px] border border-grey rounded-lg p-2 m-1 shadow-sm hover:bg-gray-200 ${activeChatColort}`}>
                                <img src={x.profileImage || '/samplePost.jpeg'} className="w-[60px] h-[60px] rounded-full border-1 border-grey" alt='post' />
                                <div className='flex flex-col justify-center mx-[11px] text-lg'>
                                    <strong>{x.name + " " + x.lastName}</strong>
                                    <p className='text-md'>{x.message} <span className='text-xs text-slate-600'>{moment(x.time * 1000).format('YYYY-MM-DD HH:mm')}</span></p>
                                </div>
                            </div>
                        }
                        )}
                    </div>
                }

                {loading || !recieverId ? <Loader /> : <ChatSocket id={recieverId} updateReciever={updateChat} />}
            </div>
        </div>
    )
}

export default ConversationSummary