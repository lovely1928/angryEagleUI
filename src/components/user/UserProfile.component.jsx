import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Post from '../posts/Post.component'
import PostGrid from '../posts/postGrid.component'
import Modal from '../common/Modal.component'
import { BsThreeDotsVertical } from "react-icons/bs";
import { ImCross } from 'react-icons/im'
import Button from '../common/Button.component'
import PostLikeList from '../posts/PostLikeList'
import { UserContext } from '../../store/userContext'
const UserProfile = () => {

    const token = localStorage.getItem('token')
    const {user} = useContext(UserContext)
    const { id: userId } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()
    const [moreInfoModal, setMoreInfoModal] = useState(false)
    const [showFollowerModal, setShowFollowerModal] = useState(false)
    const [showFollowingModal, setShowFollowingModal] = useState(false)

    const clickFollowBtnHandler = async () => {
        try {
            const likePostResponse = await axios.post('http://localhost:4000/api/follow', {
                userId
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
            if (likePostResponse.data.status === 'success') {
                toast.success(likePostResponse.data.message)
            }
        }
        catch (e) {
            toast.error(e.message)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');

        // if (!token) navigate('signIn')
        let func = async () => {
            try {
                const resp = await axios.get('http://localhost:4000/api/user/profile', {
                    params: { userId },
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if (resp.status !== 200) {
                    toast.error(resp.message)
                    return
                }
                setShowFollowerModal(x=>false)
                setShowFollowingModal(x=>false)
                setMoreInfoModal(x=>false)
                setProfile((x) => resp.data.data)
            } catch (e) {
                console.log(e)
                toast.error(e.message)
            } finally {
                setIsLoading(x => false)
            }
        }
        func()
    }, [userId])
    return (
        <>
            {
                !profile?.id ?
                    <h1>...Loading</h1>
                    :
                    <div className='my-16'>
                        <div className='mx-2 flex flex-row items-center'>
                            <div className='mr-10'>
                                <img src={profile.profileImage} width={150} height={150} alt='profile' />
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex flex-row gap-4'>
                                    <div className='flex flex-col items-center border-right'>
                                        <p className='text-lg font-semibold'>{profile.posts?.length || 0}</p>
                                        <p className='text-2xl font-semibold'>Posts</p>
                                    </div>
                                    <div onClick={()=>setShowFollowerModal(true)} className='flex flex-col items-center border-right'>
                                        <p className='text-lg font-semibold'>{profile.followerCount || 0}</p>
                                        <p className='text-2xl font-semibold'>Followers</p>
                                    </div>
                                    <div onClick={()=>setShowFollowingModal(true)} className='flex flex-col items-center border-right'>
                                        <p className='text-lg font-semibold'>{profile.followingCount || 0}</p>
                                        <p className='text-2xl font-semibold'>Following</p>
                                    </div>
                                    <div onClick={() => setMoreInfoModal(true)} className='p-2'>
                                        <BsThreeDotsVertical />
                                    </div>
                                </div>
                                {userId && userId !==user.id  && <Button text={ profile.isLoggedInUserFollowProfileStatus || 'Follow'} onClick={clickFollowBtnHandler} />}
                                <Button text="Message" onClick={()=>navigate('/user/chat/'+ userId)}/>
                            </div>
                        </div>
                        <div className='p-1' >
                            <h1 className='border-bottom border-black text-xl font-bold'>Posts</h1>
                            <PostGrid userId={userId} />
                        </div>
                        <Modal isOpen={moreInfoModal} >
                            <div className='p-2 w-[300px]'>
                                <div className='flex flex-row justify-between border-bottom border-black items-center'>
                                    <p className='text-lg font-semibold my-1'>More information</p>
                                    <ImCross onClick={() => setMoreInfoModal((x) => false)} />
                                </div>
                                <div className='grid grid-cols-1' >
                                    <div className='mr-5 my-2'>
                                        <strong>Full Name</strong>
                                        <p>{profile?.firstName + profile.lastName || ''}</p>
                                    </div>
                                    <div className='mr-5 my-2'>
                                        <strong>Email</strong>
                                        <p>{profile.email}</p>
                                    </div>
                                    <div className='mr-5 my-2'>
                                        <strong>Phone</strong>
                                        <p>{profile.phone}</p>
                                    </div>
                                    <div className='mr-5 my-2'>
                                        <strong>Status</strong>
                                        <p>{profile.isActive ? 'Active' : 'Inactive'}</p>
                                    </div>
                                </div>
                            </div>
                        </Modal>

                        <Modal isOpen={showFollowingModal}>
                            <PostLikeList  onCloseModal={()=>setShowFollowingModal(false)} heading='Following' likes={profile.following.map(x=>x.following)} />
                        </Modal>
                        <Modal isOpen={showFollowerModal}>
                            <PostLikeList  onCloseModal={()=>setShowFollowerModal(false)} heading='Followers' likes={profile.followers.map(x=>x.follower)} />
                        </Modal>

                    </div>}
        </>
    )
}

export default UserProfile