import React, { useEffect, useState } from 'react'
import { set, z } from 'zod';
import { Form, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from '../common/Button.component';
import axios from 'axios';
import Alert from '../common/Alert.component';
import { toast } from 'react-toastify';
import UpdateUserForm from './EditUserForm';
const SignUpSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(3)
        .max(20),
    firstName: z.string().max(20),
    lastName: z.string(),
    phone: z.string().max(12).min(10),
    profileImage: z.string()
});
// type SignUpSchemaType = z.infer<typeof SignUpSchema>;
const inputClasses = 'border-1 border-black my-1 p-2 m-1 mx-2 w-[160px] rounded-md shadow-sm'
const UserForm = ({ update }) => {
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

    console.log('errors', errors)
    const createHandler = async (data) => {
        try {

            const resp = await axios.post('http://localhost:4000/api/user', data)
            if (resp.status !== 201 || resp.status !== 200) {
                console.log('error occured while creating user')
            }
            toast('New User registered')
            reset()
            navigate(-1)
        }
        catch (e) {
            toast(e.message)
        }
    }

    const updateHandler = async (data) => {

        try {

            const resp = await axios.put('http://localhost:4000/api/user/' + userId, data)
            if (![200, 201].includes(resp.status)) {
                // setError(() => true)
                console.log('error occured while updating user')
            }
            toast('User updated')
            reset()
            navigate(-1)
        }
        catch (e) {
            toast(e.message)
        }
    }
    const submitHandler = async (data, e) => {

        console.log(e)
        if (isEdit) {
            await updateHandler(data);
        } else {
            await createHandler(data);
        }
    }
    const labelClasses = 'mx-2'

    return (
        <div >
            {/* <div>
                <strong className='text-xl font-bold'>Register new user</strong>
            </div> */}
            <Form onSubmit={handleSubmit(submitHandler)} method={isEdit ? "put" : "post" } className='flex flex-col' >
                <div className='grid grid-cols-2'>

                    <div>
                        <label className={labelClasses}>First Name</label>
                        <input className={inputClasses} type="text" placeholder='First Name'  {...register("firstName")} />
                        {errors.firstName && <span className='text-red-600'>{errors.firstName.message}</span>}
                    </div>
                    <div>
                        <label className={labelClasses}>Last Name</label>
                        <input className={inputClasses} type="text" placeholder='Last Name'  {...register('lastName')} />
                        {errors.lastName && <span className='text-red-600'>{errors.lastName.message}</span>}
                    </div>
                    <div>
                        <label className={labelClasses}>Email</label>
                        <input className={inputClasses} type="text" placeholder='Email'  {...register("email")} />
                        {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
                    </div>
                    {!update && <>
                        <div>
                            <label className={labelClasses}>Password</label>
                            <input className={inputClasses} type="password" placeholder='Password'  {...register("password")} />
                            {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
                        </div>
                    </>
                    }
                    <div>
                        <label className={labelClasses}>Phone</label>
                        <input className={inputClasses} type="phone" placeholder='phone'  {...register("phone")} />
                        {errors.phone && <span className='text-red-600'>{errors.phone.message}</span>}
                    </div>
                    <div>
                        <label className={labelClasses}>Profile Image Link</label>
                        <input className={inputClasses} type="profileImage" placeholder='profileImage'  {...register("profileImage")} />
                        {errors.profileImage && <span className='text-red-600'>{errors.profileImage.message}</span>}
                    </div>
                </div>
                <Button type='submit' text="Submit" onClick={submitHandler}></Button>
                <Button text='Cancel' onClick={cancelBtnHandler} />
            </Form>
        </div>

    )
}

export default UserForm