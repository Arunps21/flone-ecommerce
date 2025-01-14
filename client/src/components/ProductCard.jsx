import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductCard = ({id,image,name,price}) => {
    const {rupee} = useContext(ShopContext)
  return (
    <Link className='text-gray-700 dark:text-gray-400 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out w-[250px] h-[290px]' src={image} alt=""/>
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{rupee} {price}</p>
    </Link>
  )
}

export default ProductCard