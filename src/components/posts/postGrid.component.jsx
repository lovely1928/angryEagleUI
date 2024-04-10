import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../common/Loader.component'
import Post from './Post.component'
import { FcComments, FcLike } from 'react-icons/fc'
import { FaShareNodes } from 'react-icons/fa6'

const PostGrid = ({ userId }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [loading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])
    useEffect(
        () => {
            let func = async () => {
                try {

                    let self = true
                    if (userId) self = false
                    const resp = await axios.get('http://localhost:4000/api/post', {
                        params: { self, userId },
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    if (resp.status !== 200) {
                        toast(resp.message)
                        return
                    }
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
        <div>
            <div className='flex flex-wrap'>
                {loading ?
                    <Loader />
                    :
                     posts?.length > 0 ? posts.map((post) => {
                        return (
                            // <div>
                            //     <img src={post.imageUrl || '/samplePost.jpeg'} height='250' width='300' alt='post' />
                            // </div>
                            <div class="bg-gray-300 mt-2 mx-1 p-1 border border-grey rounded-md flex flex-col justify-between h-64 w-64 bg-gray-200">
                                <p>{post.title}</p>
                                <img src={post.imageUrl || '/samplePost.jpeg'} class="max-h-full max-w-full" alt="post" />
                                <div className='flex flex-row justify-between'>
                                    <div className='flex flex-row items-center'>
                                        <FcLike size={25} />
                                        <p className='px-1'>{post.likeCount || 0}</p>
                                    </div>
                                    <div className='flex flex-row items-center'>
                                        <FcComments size={25} />
                                        <p className='px-1'  >{post.commentCount || 0}</p>
                                    </div>
                                    <div className='flex flex-row items-center'>
                                        <FaShareNodes size={25} />
                                        <p className='px-1' >{post.totalShares || 0}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <h1>No posts yet</h1>}
            </div>
        </div>
    )
}

export default PostGrid