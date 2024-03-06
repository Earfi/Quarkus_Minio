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
        <div className="z-10 shadow-2xl relative"> 
            <p onClick={() => setFullWidth((prev) => !prev)}  className="absolute left-2 text-3xl cursor-pointer hover:text-red-500 bg-white p-2">&#10132;</p>
            <div className={` lg:flex flex-col items-center h-[120vh] overflow-y-auto bg-black text-white overflow-hidden transition-all relative ${fullWidth ? 'w-[250px]' : 'w-[0]'}`}> 
                <div className={`w-full p-4 sm:p-5 mt-10 bg-gradient-to-bl ${path.includes("products")? 'from-orange-800' : 'from-blue-600'} ${path.includes("products")? 'from-orange-700' : 'to-blue-950'}`}>
                    <p onClick={() => setFullWidth((prev) => !prev)} 
                        className={`absolute text-gray-500 cursor-pointer hover:text-orange-500  ${fullWidth ? 'rotate-180 right-2 top-1 text-3xl ' : 'right-7 top-1 text-2xl'}`} >&#10132;</p>


                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'} ${role == "Admin" ? 'block' : 'hidden'}`}>Administrator</h1>
                    <ul className={`my-2 font-semibold  text-white ${role == "Admin" ? 'block' : 'hidden'}`}>
                        <Link to="/dashboard"><li className="p-2 cursor-pointer hover:bg-gray-300 my-2"><span className={`${fullWidth ? '' : 'hidden'}`}>DASHBOARD</span></li></Link>
                        {/* <Link to="/obj-browse"><li className="p-2 cursor-pointer hover:bg-gray-300 my-2"><span className={`${fullWidth ? '' : 'hidden'}`}>Object Browser</span></li></Link>
                        <li className="p-2 cursor-pointer hover:bg-gray-300 my-2"><span className={`${fullWidth ? '' : 'hidden'}`}>Access Keys</span></li>
                        <li className="p-2 cursor-pointer hover:bg-gray-300 my-2"><span className={`${fullWidth ? '' : 'hidden'}`}>Documentation</span></li> 
                        <li className="p-2 cursor-pointer hover:bg-gray-300 my-2"><span className={`${fullWidth ? '' : 'hidden'}`}>Policies</span></li>
                        <li className="p-2 cursor-pointer hover:bg-gray-300 my-2"><span className={`${fullWidth ? '' : 'hidden'}`}>Identity</span></li>  */}
                    </ul> 

                    <Link to="/"><li className={`p-2 cursor-pointer ${path.includes("products") ? 'hover:bg-orange-500' : 'hover:bg-blue-800 my-2'} `}><span className={`${fullWidth ? '' : 'hidden'}`}>HOME</span></li></Link>
                    <hr className="h-1 bg-red-500 my-5"/>

                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'}`}>User</h1> 
                    <ul className="my-2 font-semibold  text-white">
                        <Link to="/bucket"><li className={`p-2 cursor-pointer ${path.includes("products") ? 'hover:bg-orange-500' : 'hover:bg-blue-800 my-2'} `}><span className="rounded-full -ml-2 p-2 text-white">&#9778;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>Buckets</span></li></Link>
                        <Link to="/file"><li className={`p-2 cursor-pointer ${path.includes("products") ? 'hover:bg-orange-500' : 'hover:bg-blue-800 my-2'} `}><span className="rounded-full -ml-2 p-2 text-white">&#10063;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>File</span></li></Link> 
                        <Link to="/jasper"><li className={`p-2 cursor-pointer ${path.includes("products") ? 'hover:bg-orange-500' : 'hover:bg-blue-800 my-2'} `}><span className="rounded-full -ml-2 p-2 text-white">&#8464;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>Jasper</span></li></Link> 
                        <Link to="/products"><li className={`p-2 cursor-pointer ${path.includes("products") ? 'hover:bg-orange-500' : 'hover:bg-blue-800 my-2'} `}><span className="rounded-full -ml-2 p-2 text-white">&#9778;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>Products</span></li></Link>
                    </ul>
 
                    <hr className="h-1 bg-red-500 my-5"/>

                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'} `}>Jasper</h1> 
                    <ul className="my-2 font-semibold  text-white">
                        <Link to="/file"><li className={`p-2 cursor-pointer ${path.includes("products") ? 'hover:bg-orange-500' : 'hover:bg-blue-800 my-2'} `}><span className="rounded-full -ml-2 p-2 text-white">&#10063;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>File</span></li></Link> 
                        <Link to="/jasper"><li className={`p-2 cursor-pointer ${path.includes("products") ? 'hover:bg-orange-500' : 'hover:bg-blue-800 my-2'} `}><span className="rounded-full -ml-2 p-2 text-white">&#8464;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>Jasper</span></li></Link>  
                    </ul> 

                    <hr className="h-1 bg-red-500 my-5"/>
 
                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'} `}>Minio</h1>
                    <ul className="my-2 font-semibold  text-white"> 
                        <li className={`p-2 cursor-pointer ${path.includes("products") ? 'hover:bg-orange-500' : 'hover:bg-blue-800 my-2'} `}><span className="rounded-full -ml-2 p-2 text-white">&#9738;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>Policies</span></li>
                        <li className={`p-2 cursor-pointer ${path.includes("products") ? 'hover:bg-orange-500' : 'hover:bg-blue-800 my-2'} `}><span className="rounded-full -ml-2 p-2 text-white">&#9750;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>Identity</span></li> 
                    </ul> 

                    <hr className="h-1 bg-red-500 my-5"/>

                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'} `}>Quarkus</h1> 
                    <ul className="my-2 font-semibold  text-white"> 
                        <Link to="/obj-browse"><li className={`p-2 cursor-pointer ${path.includes("products") ? 'hover:bg-orange-500' : 'hover:bg-blue-800 my-2'} `}><span className="rounded-full -ml-2 p-2 text-white">&#9737;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>Object Browser</span></li></Link>
                        <li className={`p-2 cursor-pointer ${path.includes("products") ? 'hover:bg-orange-500' : 'hover:bg-blue-800 my-2'} `}><span className="rounded-full -ml-2 p-2 text-white">&#9729;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>Access Keys</span></li>
                        <li className={`p-2 cursor-pointer ${path.includes("products") ? 'hover:bg-orange-500' : 'hover:bg-blue-800 my-2'} `}><span className="rounded-full -ml-2 p-2 text-white">&#9733;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>Documentation</span></li> 
                    </ul> 

                    <hr className="h-1 bg-red-500 my-5"/>

                    <h1 className={`text-xl font-bold border-b-2 border-gray-600 ${fullWidth ? '' : 'hidden'} `}>React</h1>
                    <ul className="my-2 font-semibold  text-white"> 
                        <li className={`p-2 cursor-pointer ${path.includes("products") ? 'hover:bg-orange-500' : 'hover:bg-blue-800 my-2'} `}><span className="rounded-full -ml-2 p-2 text-white">&#9738;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>Policies</span></li>
                        <li className={`p-2 cursor-pointer ${path.includes("products") ? 'hover:bg-orange-500' : 'hover:bg-blue-800 my-2'} `}><span className="rounded-full -ml-2 p-2 text-white">&#9750;</span> <span className={`${fullWidth ? '' : 'hidden'}`}>Identity</span></li> 
                    </ul> 

                    <hr className="h-1 bg-red-500 mt-5 mb-96"/>

                </div>
            </div>
        </div>
    )
}

export default Sidebar;