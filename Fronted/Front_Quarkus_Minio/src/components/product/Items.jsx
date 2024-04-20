import React from 'react'
import { Link } from 'react-router-dom'

const Items = () => {
  return (
    <>
      <Link to="/products/detail">
        <div className="bg-white w-36 h-52 overflow-hidden flex flex-col gap-1 p-2 border rounded-md shadow-md">
            <div className="w-[100%] h-[100px] mx-auto bg-white object-center">  
                <img src="../../../products/home//intro_food.jpg" className="object-cover w-full h-full shadow-sm"/>
            </div>
            <h1 className="font-bold text-xs">ผลไม้ขวด อุดมไปด้วยประโยชน์</h1> 
            <ul className="flex">
                <li>&#10030;</li>
                <li>&#10030;</li>
                <li>&#10030;</li>
                <li>&#10030;</li>
                <li>&#10030;</li>
            </ul> 
            <h1 className="text-xs font-sans">ขายแล้ว <b>16</b> ชิ้น</h1>
            <div className="flex justify-between items-center">
                <h1 className="text-sm font-sans0">ราคา <b className='text-red-500 text-md'>500</b> บาท</h1>
                <h1 className="text-orange-500 font-bold">&#10003;</h1>
            </div>
        </div>
      </Link>
    </>
  )
}

export default Items