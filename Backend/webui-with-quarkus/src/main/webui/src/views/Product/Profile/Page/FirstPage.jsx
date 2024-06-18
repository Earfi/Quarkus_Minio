import React from 'react'
import Items from "../../../../components/product/Items";

const FirstPage = () => {
  return (
    <div className='m-2 w-[99%] mx-auto'>
      <h1 className='text-sm md:text-md'>สินค้าแนะนำ</h1>
      <div className='w-full border h-full p-2 flex gap-5 overflow-x-auto overflow-y-hidden'>
        <Items/>
        <Items/>
        <Items/>
        <Items/>
        <Items/>
      </div>
    </div>
  )
}

export default FirstPage