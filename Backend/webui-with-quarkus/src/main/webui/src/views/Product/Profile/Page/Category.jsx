import React from 'react'
import { useNavigate } from "react-router-dom";
import Items from '../../../../components/product/Items';

const Category = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-hidden min-h-[90vh] relative">       
            <div className="mt-20 p-2">
              <p className='rotate-180 text-3xl cursor-pointer float-start absolute' onClick={() => navigate(-1)}>&#10145;</p>
              <h1 className='text-center text-xl font-semibold'>รถยนต์</h1>
              <div className="w-[95%] h-fit min-h-[50vh] my-2 mx-auto border p-2">
                <div className='w-full h-full flex flex-wrap gap-5 justify-start items-start'>
                    <Items/>
                    <Items/>
                    <Items/>
                    <Items/>
                    <Items/>
                    <Items/>
                    <Items/>
                    <Items/>
                    <Items/>
                    <Items/>
                    <Items/>
                </div>
              </div>
            </div>
    </div>
  )
}

export default Category