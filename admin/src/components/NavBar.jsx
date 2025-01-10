import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({setToken}) => {
  const buttonFun=()=>{
    setToken("")
  }
  return (
    <div className='flex justify-between items-center py-2 px-[4%]'>
        <div className='flex flex-col'>
            <Link to="/">
                <h1 className='text-3xl font-semibold'>Flone.</h1>
                <h6 className='text-xs ml-[2px] text-gray-500 leading-3'>Admin Panel</h6>
            </Link>
        </div>
        <button onClick={buttonFun} className='bg-black text-white px-4 py-2'>Logout</button>
    </div>
  )
}

export default NavBar