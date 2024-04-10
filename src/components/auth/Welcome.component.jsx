import React from 'react'

const Welcome = ({ children }) => {
    return (
        <div className='flex flex-col w-1/2 m-auto h-[700px] w-1/4 justify-center'>
            <h1 className='text-center text-xl font-semibold'>Welcome to </h1>
            <h2 className='text-center text-4xl '>Angry Twitter</h2>
            <div>
                <img className="w-[170px] mx-auto my-[12px]" src="/logo2.png" />
            </div>
            {children}
                <img className="absolute top-4 right-[230px] transform -rotate-[14deg] h-[518px] w-[378px] z-0" src="/rightWing.png" />
                <img className="absolute left-[230px] top-4 transform rotate-[14deg] h-[518px] w-[378px]" src="/leftWing.png" />
            
        </div>
    )
}

export default Welcome