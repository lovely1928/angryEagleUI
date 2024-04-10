import React from 'react'
import { UseCallApi } from '../../hooks/useApiCall'
import Loader from '../common/Loader.component'
import * as moment from 'moment-timezone';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
const ConversationSummary = () => {
    const { loading, data = { data: {} } } = UseCallApi({
        url: 'http://localhost:4000/api/chat/summary',
        method: 'get',
    })
    const navigate = useNavigate()
    console.log('data2', data)
    return (
        <div className='mt-[60px] mr-[35px] ml-[35px] mb-[60px] w-[1200px] justify-between flex flex-col'>
             <div className='flex justify-between border-bottom items-center'>
        <div>
          <strong className='text-xl font-bold'>Your chats</strong>
        </div>
      </div>
            {loading
                ?
                <Loader />
                :
                <div>
                    {data.data.map(x => (
                        <div onClick={()=>navigate('/user/chat/'+x.otherUserId)} className='flex flex-row border border-black rounded-lg p-3 m-1 shadow hover:bg-gray-200'>
                            <img src={x.profileImage || '/samplePost.jpeg'} className="w-[70px] h-[70px] rounded-full border-1 border-grey" alt='post' />
                            <div className='flex flex-col justify-center mx-[11px] text-lg'>
                            <strong>{x.name + " " + x.lastName}</strong>
                            <p className='text-md'>{x.message} <span className='text-xs text-slate-600'>{moment(x.time * 1000).format('YYYY-MM-DD HH:mm')}</span></p>
                                </div>
                        </div>
                    ))}
                </div>

            }
        </div>
    )
}

export default ConversationSummary