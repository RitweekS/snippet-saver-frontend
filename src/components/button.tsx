import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
  }

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className='bg-gray-100 text-gray-950  text-base pr-4 pl-4 pt-1 pb-1 rounded-[4px] hover:opacity-80 active:opacity-60  transition duration-150 ease-in-out' {...props}>{children}</button>
  )
}

export default Button