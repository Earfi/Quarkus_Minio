import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    const [fullWidth,setFullWidth] = useState(false);
    
    return (
        <div className=""> 
            <div className={` lg:flex flex-col items-center h-[100vh] overflow-y-auto bg-black text-white overflow-hidden transition-all relative ${fullWidth ? 'w-[250px]' : 'w-[80px]'}`}> 
                <div className="w-full bg-gray-900 p-4 sm:p-5 mt-10">
                    <p onClick={() => setFullWidth((prev) => !prev)} 
                        className={`absolute text-gray-500 cursor-pointer hover:text-orange-500  ${fullWidth ? 'rotate-180 right-2 top-1 text-3xl ' : 'right-7 top-1 text-2xl'}`} >&#10132;</p>
                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'}`}>User</h1> 
                    <ul className="my-2 font-semibold ">
                        <Link to="/file"><li className="p-2 cursor-pointer hover:bg-red-500">&#10063; <span className={`${fullWidth ? '' : 'hidden'}`}>File</span></li></Link> 
                        <Link to="/jasper"><li className="p-2 cursor-pointer hover:bg-red-500">&#8464; <span className={`${fullWidth ? '' : 'hidden'}`}>Jasper</span></li></Link> 
                        <Link to="/obj-browse"><li className="p-2 cursor-pointer hover:bg-red-500">&#9918; <span className={`${fullWidth ? '' : 'hidden'}`}>Object Browser</span></li></Link>
                        <li className="p-2 cursor-pointer hover:bg-red-500">&#9763; <span className={`${fullWidth ? '' : 'hidden'}`}>Access Keys</span></li>
                        <li className="p-2 cursor-pointer hover:bg-red-500">&#9760; <span className={`${fullWidth ? '' : 'hidden'}`}>Documentation</span></li> 
                    </ul> 
                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'}`}>Administrator</h1>
                    <ul className="my-2 font-semibold">
                        <Link to="/bucket"><li className="p-2 cursor-pointer hover:bg-red-500">&#9778; <span className={`${fullWidth ? '' : 'hidden'}`}>Buckets</span></li></Link>
                        <li className="p-2 cursor-pointer hover:bg-red-500">&#9775; <span className={`${fullWidth ? '' : 'hidden'}`}>Policies</span></li>
                        <li className="p-2 cursor-pointer hover:bg-red-500">&#9750; <span className={`${fullWidth ? '' : 'hidden'}`}>Identity</span></li> 
                    </ul> 

                    <hr className="h-1 bg-red-500 my-5"/>
                     
                </div>
            </div>
        </div>
    )
}

export default Sidebar;