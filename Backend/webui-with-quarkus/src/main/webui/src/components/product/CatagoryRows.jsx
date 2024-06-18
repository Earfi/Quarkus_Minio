import React from 'react'
import { Link } from 'react-router-dom'

const CatagoryRows = () => {
  return (
    <div className="w-[95%] h-40 p-5 bg-gray-100 border my-2 mx-auto">
        <h1 className="font-bold text-xl p-2">Catagory</h1>
        <div className="w-full h-full flex flex-row gap-3 mt-1 overflow-x-scroll">
            <Link to="/products/byCatagory"><h1 className="h-16 px-5 bg-red-500 hover:bg-red-800 rounded-full text-white font-bold flex justify-center items-center cursor-pointer text-xs">Food</h1></Link>
            <Link to="/products/byCatagory"><h1 className="h-16 px-5 bg-green-500 hover:bg-green-800 rounded-full text-white font-bold flex justify-center items-center cursor-pointer text-xs">Nature</h1></Link>
            <Link to="/products/byCatagory"><h1 className="h-16 p-5 bg-yellow-400 hover:bg-yellow-800 rounded-full text-white font-bold flex justify-center items-center cursor-pointer text-xs">Toys</h1></Link>
            
            <Link to="/products/byCatagory"><h1 className="h-16 p-5 bg-blue-500 hover:bg-blue-800 rounded-full text-white font-bold flex justify-center items-center cursor-pointer text-xs">Food</h1></Link>
            <Link to="/products/byCatagory"><h1 className="h-16 p-5 bg-gray-500 hover:bg-gray-800 rounded-full text-white font-bold flex justify-center items-center cursor-pointer text-xs">Nature</h1></Link>
            <Link to="/products/byCatagory"><h1 className="h-16 p-5 bg-pink-400 hover:bg-pink-800 rounded-full text-white font-bold flex justify-center items-center cursor-pointer text-xs">Toys</h1></Link>

        </div>
        
    </div>
  )
}

export default CatagoryRows