import React, { useState } from 'react'

const DetaiProduct = () => {
    const [num,setNum] = useState(1); 
    const [check,setCheck] = useState(false);  


    const numProducts = (detail) => { 
        if(detail == "+"){
            setNum(num + 1)
        }else if(num > 1 && detail == "-"){
            setNum(num - 1)
        }
    }

    return (
        <div className={`${check == true? 'bg-orange-200' : 'bg-white'} px-2 flex justify-around items-center h-[140px] w-[90%] overflow-hidden gap-2`}>
            <div className='flex items-center gap-2 sm:gap-5'>
                <input type="checkbox" onClick={() => setCheck(!check)}/>
                <div className="w-[150px] h-[100px] bg-white object-contain">  
                    <img src="../../products/home//intro_food.jpg" className="object-cover w-full h-full"/>
                </div>
            </div>
            <div className="w-[250px]  h-full p-5">
                <h1 className="font-bold text-sm sm:text-md">ผลไม้ขวด</h1>
                <div className="flex items-center gap-3 my-2">
                    <p className='text-sm sm:text-md'>จำนวน</p>
                    <p onClick={() => numProducts("-")} className="cursor-pointer text-sm sm:text-md">&#9866;</p>
                    <p className='text-sm sm:text-md'><b>{num}</b></p>
                    <p onClick={() => numProducts("+")} className="cursor-pointer text-sm sm:text-md">&#10010;</p> 
                </div>
                <p  className='text-sm sm:text-md'>ราคารวม <b className="text-red-500">1,500</b> บาท</p>
            </div>
        </div>
    )
}

export default DetaiProduct