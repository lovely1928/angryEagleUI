import React, { useRef } from 'react'
import Button from '../common/Button.component'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ImCross } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

const PostCommentList = ({ comments, postId, onCloseModal }) => {
  const token = localStorage.getItem('token')
  const commentRef = useRef('')
  const onCloseCommentModal = () => {
    onCloseModal()
  }
  const navigate = useNavigate()
  const commentPostHandler = async () => {
    
    try {
      const comment = commentRef.current.value
      const likePostResponse = await axios.post('http://localhost:4000/api/post/comment', {
        postId: postId,
        comment
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
  return (
    <div>
      <div className='flex flex-row items-center'>
        <form className='border-bottom'>
          <input ref={commentRef} placeholder='Please post comment' />
          <Button textSize='sm' text='Comment' type='submit' onClick={commentPostHandler} />
        </form>
        <ImCross onClick={() => onCloseCommentModal()} />
      </div>
      {comments.length > 0 ?
        <ul>
          {comments.map(x =>
            <div className='border-bottom m-1 p-1'>
              <div className='flex flex-row items-center gap-2'>
                <img onClick={() => navigate('/user/profile/' + x.userId)} src={x.user.profileImage} alt='user' className='w-8 h-8 rounded-full' />
                <div className='flex flex-col'>
                  <strong className='text-sm'>{x.user.firstName}</strong>
                  <p>{x.comment}</p>
                </div>
              </div>
            </div>
          )}
        </ul>
        :
        <p className='text-center m-10'>No comment for now</p>}

    </div>
  )
}

export default PostCommentList