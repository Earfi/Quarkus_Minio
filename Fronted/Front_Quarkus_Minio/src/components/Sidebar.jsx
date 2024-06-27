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
            <div className={`lg:flex flex-col items-center h-[120vh] overflow-y-auto bg-gray-700 text-white overflow-hidden transition-all relative ${fullWidth ? 'w-[250px]' : 'w-[0]'}`}> 
                <div className={`w-full p-4 sm:p-5 mt-10 bg-gray-700 to-purple-800 from-red-800 text-white`}>
                    <p onClick={() => setFullWidth(prev => !prev)} className={`absolute text-gray-500 cursor-pointer hover:text-orange-500 ${fullWidth ? 'rotate-180 right-2 top-1 text-3xl' : 'right-7 top-1 text-2xl'}`}>&#10132;</p>
     
                    {/* <hr className="h-1 bg-red-500 my-5"/> */}
    
                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'}`}>Mode</h1> 
                    <ul className="my-2 font-semibold">
                        <Link to="/"><li className={`p-2 cursor-pointer hover:text-gray-500 ${fullWidth ? '' : 'hidden'}`}><span className={`${fullWidth ? '' : 'hidden'}`}>&#9751; HOME</span></li></Link>
                        <Link to="/bucket"><li className={`p-2 cursor-pointer hover:text-gray-500 ${fullWidth ? '' : 'hidden'}`}><span className={`${fullWidth ? '' : 'hidden'}`}>&#9778; MINIO</span></li></Link>
                        <Link to="/jasper"><li className={`p-2 cursor-pointer hover:text-gray-500 ${fullWidth ? '' : 'hidden'}`}><span className={`${fullWidth ? '' : 'hidden'}`}>&#8464; JASPER</span></li></Link>  
                    </ul> 
    
                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'}`}>Others</h1> 
                    <ul className="my-2 font-semibold"> 
                        <Link to="/announcement"><li className={`p-2 cursor-pointer hover:text-gray-500 ${fullWidth ? '' : 'hidden'}`}><span className={`${fullWidth ? '' : 'hidden'}`}>ANNOUNCEMENT</span></li></Link>
                        <Link to="/mergefiles"><li className={`p-2 cursor-pointer hover:text-gray-500 ${fullWidth ? '' : 'hidden'}`}><span className={`${fullWidth ? '' : 'hidden'}`}>PDF</span></li></Link>
                        <Link to="/products"><li className={`p-2 cursor-pointer hover:text-gray-500 ${fullWidth ? '' : 'hidden'}`}><span className={`${fullWidth ? '' : 'hidden'}`}>PRODUCT</span></li></Link>
                        <Link to="/about"><li className={`p-2 cursor-pointer hover:text-gray-500 ${fullWidth ? '' : 'hidden'}`}><span className={`${fullWidth ? '' : 'hidden'}`}>ABOUT</span></li></Link>
                        <Link to="/service"><li className={`p-2 cursor-pointer hover:text-gray-500 ${fullWidth ? '' : 'hidden'}`}><span className={`${fullWidth ? '' : 'hidden'}`}>SERVICE</span></li></Link>
                    </ul> 
    
                    <hr className="h-1 bg-red-500 my-5"/>
                </div>
            </div>
        </div>
    )
    
    
    
}

export default Sidebar;