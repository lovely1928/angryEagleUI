import React from 'react'

const Button = ({ text, onClick,type, color = 'bg-black',textSize='lg' }) => {
  return (
    <button type={type||'button'} className={color + ` text-${textSize} text-white m-2 px-2 py-1 rounded-md`} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button