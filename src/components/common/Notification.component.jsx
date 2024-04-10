
import React from 'react'

const Notification = ({ className, isOpen }) => {
    return (
        <>
            {
                isOpen
                    ?
                    <div className={`h-[600px] w-[300px] bg-white border-black px-2 py-3 rounded-md shadow-lg ${className}`} >
                        <h1 className='m-auto'>Notification functionality is coming soon !!</h1>
                    </div>
                    :
                    null
            }

        </>
    )
}

export default Notification