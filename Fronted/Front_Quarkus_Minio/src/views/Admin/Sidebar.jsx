import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    const [name, setName] = useState(null);

    useEffect(() => { 
        setName(localStorage.getItem("username"))
    },[])

    return(
        <div className="w-52 h-[100vh] bg-blue-950 text-white p-5">
            <div className="text-2xl font-semibold mb-5">Hello, {name}</div>
            <hr className="border-white border-opacity-50 mb-5" />
            <div className="text-xl font-semibold mb-5">Menu</div>
            <div className="flex flex-col gap-4">
                <Link to="/dashboard" className="hover:text-gray-500">&#9729; Home</Link> 
                <Link to="/dashboard/user" className="hover:text-gray-500">&#9822; User</Link>
                <span className="hover:text-gray-500">&#9743; Services</span>
                <span className="hover:text-gray-500">&#10065; Bucket</span>
                <span className="hover:text-gray-500">&#10002; Calcurator</span>
                <span className="hover:text-gray-500">&#9881; Setting</span>
            </div>
            <Link to="/" className="absolute bottom-5 text-xl font-bold bg-orange-500 text-white p-2 rounded-xl hover:bg-orange-400">&#10094; Go Home</Link>
        </div>
    )
}

export default Sidebar;
