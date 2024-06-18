import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    const [name, setName] = useState(null);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => { 
        setName(localStorage.getItem("username"))
    },[])

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return(
        <nav className="bg-blue-950 text-white w-screen">
            <div className="w-full px-4 py-2 flex justify-around items-center">
                <div className="text-2xl font-semibold">Hello, {name}</div>
                <button onClick={toggleNavbar} className="text-xl">&#9776;</button>
            </div>
            <div className={`px-2 pb-4 transition-all duration-300 overflow-hidden ${isOpen ? 'h-40' : 'h-0'}`}>
                <hr className="border-white border-opacity-50 mb-5" />
                <div className="text-xl font-semibold mb-5">Menu</div>
                <div className="flex flex-row gap-10">
                    <Link to="/dashboard" className="hover:text-gray-500">&#9729; Home</Link> 
                    <Link to="/dashboard/user" className="hover:text-gray-500">&#9822; User</Link>
                    <span className="hover:text-gray-500">&#9743; Services</span>
                    <span className="hover:text-gray-500">&#10065; Bucket</span>
                    <span className="hover:text-gray-500">&#10002; Calculator</span>
                    <span className="hover:text-gray-500">&#9881; Settings</span>
                </div>
                <Link to="/" className="block text-sm font-bold bg-orange-500 text-white p-2 rounded-xl mt-4 hover:bg-orange-400">&#10094; Go Home</Link>
            </div>
        </nav>
    )
}

export default Sidebar;
