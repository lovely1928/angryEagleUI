import React, { useEffect, useState } from 'react'
import { z } from 'zod';
import { Form, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from '../common/Button.component';
import axios from 'axios';
import { toast } from 'react-toastify';
const SignUpSchema = z.object({
    title: z.string(),
    imageUrl: z.string()
})
// type SignUpSchemaType = z.infer<typeof SignUpSchema>;
const inputClasses = 'border-1 border-black my-1 p-1'
const PostForm = ({ update }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    // s
    const params = useParams()
    const { id: userId } = params
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({ resolver: zodResolver(SignUpSchema) });
    const cancelBtnHandler = () => {
        // navigate(-1)
        window.history.back()
    }
    const [isEdit, setIsEdit] = useState(false)
    useEffect(() => {
        async function blah() {
            if (update) {
                const existingUserResp = await axios.get('http://localhost:4000/api/user/' + userId)
                const existingUser = existingUserResp.data.data
                setValue('email', existingUser.email)
                setValue('phone', existingUser.phone)
                setValue('firstName', existingUser.firstName)
                setValue('lastName', existingUser.lastName)
                setValue('profileImage', existingUser.profileImage)
                setIsEdit(true)
            }
        }
        blah()
    }, [userId,])

    const createHandler = async (data) => {
        try {
            const resp = await axios.post('http://localhost:4000/api/post', data,{
                headers: {
                    'Authorization': 'Bearer '+ token
                  }
            })
            if (resp.status !== 201 || resp.status !== 200) {
                console.log('error occured while creating user')
            }
            toast('New post added')
            reset()
            navigate(-1)
        }
        catch (e) {
            toast(e.message)
        }
    }
    const submitHandler = async (data, e) => {
        await createHandler(data);
    }

    return (
        <div className='p-5 m-10 border-1 border-black'>
            <Form onSubmit={handleSubmit(submitHandler)} method={isEdit ? "put" : "post"} className='flex flex-col'>
                <label>Title</label>
                <input className={inputClasses} type="text" placeholder='Title'  {...register("title")} />
                {errors.title && <span className='text-red-600'>{errors.title.message}</span>}
                <label>Image Url</label>
                <input className={inputClasses} type="text" placeholder='Image Url'  {...register("imageUrl")} />
                {errors.imageUrl && <span className='text-red-600'>{errors.imageUrl.message}</span>}
                <Button text='submit' type='submit' />
                {/* <img src={}/> */}
                <Button text='Cancel' onClick={cancelBtnHandler} />
            </Form>
        </div>

    )
}

export default PostForm