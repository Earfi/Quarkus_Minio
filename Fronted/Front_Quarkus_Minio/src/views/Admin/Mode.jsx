import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Mode() {
    const [name,setName] = useState(null);

    useEffect(() => { 

        setName(localStorage.getItem("username"))

    },[])

    return(
<div className="w-full h-screen bg-gray-100 flex justify-center items-center">
    <div className="w-96 rounded-lg bg-white shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Hello, {name}</h1>
        <div className="space-y-4">
            <Link to="/">
                <button className="my-1 w-full border border-gray-800 py-3 rounded-lg bg-gray-800 text-white font-mono text-xl hover:bg-gray-700">HOME PAGE</button>
            </Link> 
            <Link to="/dashboard">
                <button className="my-1 w-full border border-gray-800 py-3 rounded-lg bg-gray-800 text-white font-mono text-xl hover:bg-gray-700">DASHBOARD</button>
            </Link> 
        </div>
    </div>
</div>

    )
}

export default Mode;