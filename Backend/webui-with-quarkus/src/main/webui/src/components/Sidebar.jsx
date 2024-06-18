import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    const [fullWidth,setFullWidth] = useState(false);
    const [role,setRole] = useState(null);
    const [path,setPath] = useState(window.location.pathname);

    useEffect(() => { 

        setRole(localStorage.getItem("role"))

    },[]) 
    
    return (
        <div className="z-40 shadow-2xl relative"> 
            <p onClick={() => setFullWidth(prev => !prev)} className="absolute left-0 text-3xl cursor-pointer hover:text-red-500 bg-white p-2">&#10132;</p>
            <div className={`lg:flex flex-col items-center h-[120vh] overflow-y-auto bg-white text-black overflow-hidden transition-all relative ${fullWidth ? 'w-[250px]' : 'w-[0]'}`}> 
                <div className={`w-full p-4 sm:p-5 mt-10 bg-gradient-to-bl to-purple-800 from-red-800 text-white`}>
                    <p onClick={() => setFullWidth(prev => !prev)} className={`absolute text-gray-500 cursor-pointer hover:text-orange-500 ${fullWidth ? 'rotate-180 right-2 top-1 text-3xl' : 'right-7 top-1 text-2xl'}`}>&#10132;</p>
    
                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth && role === "Admin" ? 'block' : 'hidden'}`}>Administrator</h1>
                    <ul className={`my-2 font-semibold ${role === "Admin" ? 'block' : 'hidden'}`}>
                        <Link to="/dashboard"><li className="p-2 cursor-pointer hover:bg-gray-300 my-2"><span className={`${fullWidth ? '' : 'hidden'}`}>DASHBOARD</span></li></Link>
                    </ul> 
    
                    <Link to="/"><li className={`p-2 cursor-pointer ${fullWidth ? '' : 'hidden'}`}><span>HOME</span></li></Link>
                    <hr className="h-1 bg-red-500 my-5"/>
    
                    <ul className="my-2 font-semibold">
                        <Link to="/bucket"><li className={`p-2 cursor-pointer ${fullWidth ? '' : 'hidden'}`}><span className="rounded-full -ml-2 p-2">&#9778;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>Buckets</span></li></Link>
                        <Link to="/jasper"><li className={`p-2 cursor-pointer ${fullWidth ? '' : 'hidden'}`}><span className="rounded-full -ml-2 p-2">&#8464;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>Jasper</span></li></Link>  
                    </ul>
    
                    <hr className="h-1 bg-red-500 my-5"/>
    
                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'}`}>Others</h1> 
                    <ul className="my-2 font-semibold">
                        <Link to="/products"><li className={`p-2 cursor-pointer ${fullWidth ? '' : 'hidden'}`}><span className="rounded-full -ml-2 p-2">&#9733;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>Products</span></li></Link>
                        <Link to="/about"><li className={`p-2 cursor-pointer ${fullWidth ? '' : 'hidden'}`}><span className="rounded-full -ml-2 p-2">&#64;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>About</span></li></Link>
                    </ul> 
    
                    <hr className="h-1 bg-red-500 my-5"/>
                </div>
            </div>
        </div>
    )
    
    
    
}

export default Sidebar;