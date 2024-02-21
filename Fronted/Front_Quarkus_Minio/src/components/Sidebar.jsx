import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    const [fullWidth,setFullWidth] = useState(false);
    
    return (
        <div className="z-10 shadow-2xl"> 
            <div className={` lg:flex flex-col items-center h-[120vh] overflow-y-auto bg-black text-white overflow-hidden transition-all relative ${fullWidth ? 'w-[250px]' : 'w-[80px]'}`}> 
                <div className="w-full bg-blue-950 p-4 sm:p-5 mt-10 text-white">
                    <p onClick={() => setFullWidth((prev) => !prev)} 
                        className={`absolute text-gray-500 cursor-pointer hover:text-orange-500  ${fullWidth ? 'rotate-180 right-2 top-1 text-3xl ' : 'right-7 top-1 text-2xl'}`} >&#10132;</p>
                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'}`}>User</h1> 
                    <ul className="my-2 font-semibold bg-blue-950">
                        <Link to="/bucket"><li className="p-2 cursor-pointer hover:bg-blue-800">&#9778; <span className={`${fullWidth ? '' : 'hidden'}`}>Buckets</span></li></Link>
                        <Link to="/file"><li className="p-2 cursor-pointer hover:bg-blue-800">&#10063; <span className={`${fullWidth ? '' : 'hidden'}`}>File</span></li></Link> 
                        <Link to="/jasper"><li className="p-2 cursor-pointer hover:bg-blue-800">&#8464; <span className={`${fullWidth ? '' : 'hidden'}`}>Jasper</span></li></Link> 
                    </ul>

                    <hr className="h-1 bg-red-500 my-5"/>

                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'} `}>Administrator</h1>
                    <ul className="my-2 font-semibold bg-blue-950">
                        <Link to="/obj-browse"><li className="p-2 cursor-pointer hover:bg-red-800">&#9737; <span className={`${fullWidth ? '' : 'hidden'}`}>Object Browser</span></li></Link>
                        <li className="p-2 cursor-pointer hover:bg-red-800">&#9729; <span className={`${fullWidth ? '' : 'hidden'}`}>Access Keys</span></li>
                        <li className="p-2 cursor-pointer hover:bg-red-800">&#9733; <span className={`${fullWidth ? '' : 'hidden'}`}>Documentation</span></li> 
                        <li className="p-2 cursor-pointer hover:bg-red-800">&#9738; <span className={`${fullWidth ? '' : 'hidden'}`}>Policies</span></li>
                        <li className="p-2 cursor-pointer hover:bg-red-800">&#9750; <span className={`${fullWidth ? '' : 'hidden'}`}>Identity</span></li> 
                    </ul> 

                    <hr className="h-1 bg-red-500 my-5"/>

                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'} `}>Jasper</h1> 
                    <ul className="my-2 font-semibold bg-blue-950">
                        <Link to="/file"><li className="p-2 cursor-pointer hover:bg-orange-800">&#10063; <span className={`${fullWidth ? '' : 'hidden'}`}>File</span></li></Link> 
                        <Link to="/jasper"><li className="p-2 cursor-pointer hover:bg-orange-800">&#8464; <span className={`${fullWidth ? '' : 'hidden'}`}>Jasper</span></li></Link>  
                    </ul> 

                    <hr className="h-1 bg-red-500 my-5"/>
 
                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'} `}>Minio</h1>
                    <ul className="my-2 font-semibold bg-blue-950"> 
                        <li className="p-2 cursor-pointer hover:bg-blue-900">&#9738; <span className={`${fullWidth ? '' : 'hidden'}`}>Policies</span></li>
                        <li className="p-2 cursor-pointer hover:bg-blue-900">&#9750; <span className={`${fullWidth ? '' : 'hidden'}`}>Identity</span></li> 
                    </ul> 

                    <hr className="h-1 bg-red-500 my-5"/>

                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'} `}>Quarkus</h1> 
                    <ul className="my-2 font-semibold bg-blue-950"> 
                        <Link to="/obj-browse"><li className="p-2 cursor-pointer hover:bg-purple-800">&#9737; <span className={`${fullWidth ? '' : 'hidden'}`}>Object Browser</span></li></Link>
                        <li className="p-2 cursor-pointer hover:bg-purple-800">&#9729; <span className={`${fullWidth ? '' : 'hidden'}`}>Access Keys</span></li>
                        <li className="p-2 cursor-pointer hover:bg-purple-800">&#9733; <span className={`${fullWidth ? '' : 'hidden'}`}>Documentation</span></li> 
                    </ul> 

                    <hr className="h-1 bg-red-500 my-5"/>

                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'} `}>React</h1>
                    <ul className="my-2 font-semibold bg-blue-950"> 
                        <li className="p-2 cursor-pointer hover:bg-green-800">&#9738; <span className={`${fullWidth ? '' : 'hidden'}`}>Policies</span></li>
                        <li className="p-2 cursor-pointer hover:bg-green-800">&#9750; <span className={`${fullWidth ? '' : 'hidden'}`}>Identity</span></li> 
                    </ul> 

                    <hr className="h-1 bg-red-500 mt-5 mb-96"/>

                </div>
            </div>
        </div>
    )
}

export default Sidebar;