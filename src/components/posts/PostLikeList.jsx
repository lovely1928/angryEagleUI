import React, { useContext } from 'react'
import { ImCross } from "react-icons/im";
import Button from '../common/Button.component';
import { UserContext } from '../../store/userContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PostLikeList = ({ likes, onCloseModal, heading, noDataMessage = 'No data !!' }) => {
    const {user} = useSelector(state=> state.user)
    const navigate = useNavigate()
    return (
        <div className='w-[400px] h-[400px] p-2'>
            <div className='flex flex-row justify-between mb-2'>
                <strong>{heading}</strong>
                <ImCross onClick={() => onCloseModal()} />
            </div>

            <ul>
                {
                    likes?.length > 0 ?
                        likes.map(x =>
                            <div className='flex flex-row my-1 p-1 justify-between'>
                                <div className='flex flex-row'>
                                    <img onClick={() => navigate('/user/profile/' + x.userId )} src={x?.profileImage} alt='user' className='w-10 h-10 rounded-full' />
                                    <strong className='pl-5'>{x.firstName + x.lastName}</strong>
                                </div>
                                {user.id !== x.userId && <Button text={x.isProfileFollowing ? "Following" : "Follow"} textSize='sm' />}
                            </div>
                        )
                        :
                        <h1 className='text-sm font-semibold'>{noDataMessage}</h1>
                }
            </ul>
        </div>

    )
}

export default PostLikeList