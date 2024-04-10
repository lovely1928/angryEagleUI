import React, { useState } from 'react'
import { FaShareNodes } from 'react-icons/fa6'
import { FcComments, FcLike } from 'react-icons/fc'
import Button from '../common/Button.component'
import axios from 'axios'
import { toast } from 'react-toastify'
import Modal from '../common/Modal.component'
import PostLikeList from './PostLikeList'
import PostCommentList from './PostComment.component'
import {useNavigate } from 'react-router-dom'

const Post = ({ post }) => {
  const token = localStorage.getItem('token')
  let [showLikeModel, setShowLikeModal] = useState(false)
  let [showCommentModel, setShowCommentModal] = useState(false)
  let [postLikeList, setPostLikeList] = useState([])
  let [postCommentList, setPostCommentList] = useState([])
  const navigate = useNavigate()
  const likePostHandler = async () => {
    try {
      const likePostResponse = await axios.post('http://localhost:4000/api/post/like', {
        postId: post.id,
      },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
      if (likePostResponse.data.status === 'success') {
        toast(likePostResponse.data.message)
      }
    }
    catch (e) {
      toast(e.message)
    }
  }

  const sharePostHandler = () => { }
  const getLikeListHandler = async () => {
    try {
      const likePostResponse = await axios.get('http://localhost:4000/api/post/like/' + post.id,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
      setPostLikeList(x => likePostResponse.data.data)
      setShowLikeModal(x => true)
    }
    catch (e) {
      toast(e.message)
    }
  }
  const getCommentListHandler = async () => {
    const commentPostListResponse = await axios.get('http://localhost:4000/api/post/comment/' + post.id,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    setPostCommentList(x => commentPostListResponse.data.data)
    setShowCommentModal(x => true)
  }

  return (
    // upper section
    <div className='flex flex-col justify-between m-2 p-2 border shadow-md rounded-md w-fit h-[420px]'>
      <div className='flex flex-row justify-between' >
        <div onClick={()=>navigate('/user/profile/'+ post.user.id)} className='flex flex-row items-center'>
          <img src={post.user.profileImage || '/samplePost.jpeg'} className="w-[50px] h-[50px] rounded-full border-1 border-grey" alt='post' />
          <div className='px-1 flex flex-col'>
          <strong className=''>{post.user.firstName}</strong>
          <p className='text-xs text-slate-600'>{post?.date || ''}</p>
          </div>
        </div>
          {/* {
            post.canFollow &&
            <div>
              <Button text='follow' />
            </div>
          } */}
      </div>

      {/* post image */}
      <div>
        <img src={post.imageUrl || '/samplePost.jpeg'} className="h-[250px] w-[300px]" alt='post' />
      </div>

      {/* bottom section */}
      <p>{post.title}</p>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center'>
          <FcLike size={30} onClick={likePostHandler} />
          <p className='px-1' onClick={getLikeListHandler}>{post.likeCount || 0}</p>
        </div>
        <div onClick={getCommentListHandler} className='flex flex-row items-center'>
          <FcComments size={30} />
          <p className='px-1'  >{post.commentCount || 0}</p>
        </div>
        <div className='flex flex-row items-center'>
          <FaShareNodes size={30} />
          <p className='px-1' >{post.totalShares || 0}</p>
        </div>

        <Modal isOpen={showLikeModel} >
          <PostLikeList likes={postLikeList} onCloseModal={() => setShowLikeModal(x => false) } />
        </Modal>
        <Modal isOpen={showCommentModel} >
          <PostCommentList comments={postCommentList} postId={post.id} onCloseModal={() =>  setShowCommentModal(x => false) } />
        </Modal>
      </div>
    </div>
  )
}

export default Post