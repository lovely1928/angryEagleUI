import React, { useEffect, useState } from 'react'
import Button from '../common/Button.component'
import Pagination from '../common/Pagination.component'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FcLike } from "react-icons/fc";
import axios from 'axios'
import { FaShareNodes } from "react-icons/fa6";

import Loader from '../common/Loader.component'
import { FcComments } from "react-icons/fc";
import Post from './Post.component'
const posts = [
  { title: 'hi', imageUrl: 'google.com', },
  { title: 'hi', imageUrl: 'google.com', },
  { title: 'hi', imageUrl: 'google.com', },
]
const PostList = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [loading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])
  useEffect(
    () => {
      let func = async () => {
        try {
          setIsLoading(true)
          const resp = await axios.get('http://localhost:4000/api/post', {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
          if (resp.status !== 200) {
            toast(resp.message)
            return
          }
          setIsLoading(false)
          setPosts(resp.data.data)
        } catch (e) {
          console.log(e)
          toast(e.message)
        } finally {
          setIsLoading(x => false)
        }
      }
      func()
    }
    ,
    []

  )
  return (
    <>

      {
        loading
          ?
          <Loader />
          :

        //   <div className='flex justify-between border-bottom items-center my-[6px]'>
        //   <div>
        //     <strong className='text-xl font-bold mr-[12px]'>Users</strong>
        //     <input className='px-2 mx-2 border border-black border-solid rounded-md shadow-sm' type='text' onChange={handleSearch} placeholder='search user' />
        //   </div>
        //   <Button text='Add' onClick={addUserBtnHandler} />
        // </div>
          <div className='p-14 w-[1200px] m-auto'>
            <div className='border-bottom border-grey flex my-[6px] flex-row justify-between items-center'>
              <h1 className='text-xl font-bold'>Posts</h1>
              <Button text='Add' onClick={() => navigate('add')} />
            </div>
            <div className='flex flex-wrap'>
              {loading ?
                <Loader />
                :
                posts.map((post) => {
                  return (
                    <Post post={post} />
                  )
                })}
            </div>
            {/* <Pagination/> */}
          </div>}
    </>
  )
}

export default PostList