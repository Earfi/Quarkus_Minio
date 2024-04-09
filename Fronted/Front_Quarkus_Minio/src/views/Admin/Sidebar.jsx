import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    const [name,setName] = useState(null);

    useEffect(() => { 

        setName(localStorage.getItem("username"))

    },[])

    return(
        <div className="w-full h-full border p-5 bg-blue-950">
                {/* <div className="w-[95%] h-[90%] border mx-auto p-2 bg-gradient-to-tl from-gray-800 to-gray-950"> */}
                    <h1 className=" text-white p-2 w-full text-2xl">Hello {name}</h1>
                    <hr />
                    <div className="my-5 text-white">
                        <h1 className="text-xl font-bold text-white">Menu</h1>
                        <div className="flex flex-col gap-8 w-full p-5 text-xl font-mono">
                            <Link to="/dashboard"><h1 className="hover:text-gray-500 cursor-pointer">&#9729; Home</h1></Link> 
                            <Link to="/dashboard/user"><h1 className="hover:text-gray-500 cursor-pointer">&#9822; User</h1></Link>
                            <h1 className="hover:text-gray-500 cursor-pointer">&#9743; Services</h1>
                            <h1 className="hover:text-gray-500 cursor-pointer">&#10065; Bucket</h1>
                            <h1 className="hover:text-gray-500 cursor-pointer">&#10002; Calcurator</h1>
                            <h1 className="hover:text-gray-500 cursor-pointer">&#9881; Setting</h1>
                        </div>
                    </div>
                {/* </div> */}
                <Link to="/"><h1 className="absolute bottom-5 text-xl font-bold bg-orange-500 text-white cursor-pointer p-2 rounded-xl hover:bg-orange-400">&#10094; Go Home</h1></Link>
        </div>
    )
}

export default Sidebar;