import React from 'react'
import { Input } from "@material-tailwind/react";
const InputDefault = ({ label, type, placeholder, register }) => {
    return (
        <div className="w-72">
            <Input label={label} type={type} placeholder={placeholder} {...register(label)} />
        </div>
    );
}

export default InputDefault