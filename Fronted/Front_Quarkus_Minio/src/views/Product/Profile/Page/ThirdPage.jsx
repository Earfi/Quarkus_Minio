import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const ThirdPage = () => {
    const [catagory, setCatagory] = useState([
        {
            "id": 1,
            "img": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "type": "รถยนต์",
            "num":20
        },
        {
            "id": 2,
            "img": "https://plus.unsplash.com/premium_photo-1673014201385-115f57893c99?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "type": "เก้าอี้",
            "num":10
        }
    ]);

    return (
        <div className='flex flex-col gap-2'>
            {catagory.map((item) => (
                <Link to="/products/profile/category">
                    <div key={item.id} className="w-full h-20 bg-gray-100 flex justify-around items-center border cursor-pointer hover:bg-gray-200">
                        <div className='flex justify-start items-center gap-5'>
                            <img className='w-24 h-16 object-cover' src={item.img} alt="" />
                            <h1>{item.type} ( <span className='text-xs'>{item.num}</span> )</h1>
                        </div>
                        <h1>&#10143;</h1>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ThirdPage;
