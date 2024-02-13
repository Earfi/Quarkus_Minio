import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [openBar,setOpenBar] = useState(false);
    return (
        <div className="w-full h-20 bg-blue-950 text-xl font-medium text-white flex justify-between items-center fixed z-50"> 
            <Link to="/" className="block ml-10 text-sm md:ml-30 border py-2 px-2 rounded-full">Minio With Quarkus</Link>
            <div className="hidden lg:flex p-5 text-sm sm:text-md md:text-xl gap-7 cursor-pointer items-center">
                <Link to="/" className="hover:text-orange-400">HOME</Link> 
                <Link to="/bucket" className="hover:text-orange-400">BUCKET &#9778;</Link> 
                <Link to="/jasper" className="hover:text-orange-400">JASPER &#8464;</Link> 
                <Link to="/about" className="hover:text-orange-400">ABOUT &#8471;</Link> 
                <Link to="/service" className="hover:text-orange-400">SERVICE &#9743;</Link>  
            </div>
            <div className="hidden xl:flex p-5 text-sm sm:text-xl gap-5 cursor-pointer items-center"> 
                <input type="text" className="p-1 rounded-md text-black" name="search" placeholder="Search Backet"/>
                <Link to="/profile"><h1 className="hover:text-orange-400 text-sm sm:text-xl ">Profile</h1></Link>
                <h1 className="text-5xl">&#9996;</h1>
            </div>
            <h1 onClick={() => setOpenBar(!openBar)} className="block lg:hidden mr-10 text-2xl cursor-pointer hover:text-red-500">&#9776;</h1>
            
            <div className={`absolute right-${openBar == true ? '0' : '[-100%]'} w-[250px] bg-gray-800 h-[90vh] top-20 py-5 transition-all border-4 border-black`}>
                <div className="flex flex-col justify-center items-center gap-6">
                    <Link to="/" className="hover:text-orange-400 border-b-2">HOME</Link> 
                    <Link to="/bucket" className="hover:text-orange-400 border-b-2">BUCKET &#9778;</Link> 
                    <Link to="/jasper" className="hover:text-orange-400 border-b-2">JASPER &#8464;</Link> 
                    <Link to="/about" className="hover:text-orange-400 border-b-2">ABOUT &#8471;</Link> 
                    <Link to="/service" className="hover:text-orange-400 border-b-2">SERVICE &#9743;</Link>  
                </div>
            </div>
        </div>
    )
}

export default Navbar;