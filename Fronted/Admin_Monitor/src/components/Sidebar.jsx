import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    const [fullWidth, setFullWidth] = useState(false);
    
    return (
        <div className="z-40 shadow-2xl relative min-h-screen bg-gray-700">
            <p onClick={() => setFullWidth(prev => !prev)} className="absolute left-0 text-3xl cursor-pointer hover:text-red-500 sm:bg-white p-2">&#10132;</p>
            <div className={`sm:flex flex-col items-center h-full overflow-y-auto bg-gray-700 text-white overflow-hidden transition-all relative ${fullWidth ? 'w-[250px] sm:w-[0]' : 'w-[0] sm:w-[250px]'}`}>
                <div className={`w-full p-4 sm:p-5 mt-10 bg-gray-700 to-purple-800 from-red-800 text-white`}>
                    <p onClick={() => setFullWidth(prev => !prev)} className={`absolute text-gray-500 cursor-pointer hover:text-orange-500 ${fullWidth ? 'rotate-180 sm:rotate-0 right-2 top-1 text-3xl' : 'sm:rotate-180 right-7 top-1 text-3xl'}`}>&#10132;</p>
     
                    <h1 className={`text-xl font-bold border-b-2 border-gray-600`}>Web Monitor</h1>
                    <ul className="my-2 font-semibold">
                        <Link to="/home"><li className="p-2 cursor-pointer hover:text-gray-500"><span className="">&#9778;</span> MINIO</li></Link>
                        <Link to="/user"><li className="p-2 cursor-pointer hover:text-gray-500"><span className="">&#9751;</span> USER</li></Link>
                        <Link to="/announcement"><li className="p-2 cursor-pointer hover:text-gray-500"><span className="">&#9993;</span> ANNOUNCEMENT</li></Link>
                        <Link to="/complaints"><li className="p-2 cursor-pointer hover:text-gray-500"><span className="">&#9998;</span> Feedback and Complaints</li></Link>
                    <hr className="h-1 bg-red-500 my-5"/>
                        <Link to="/complaints"><li className="p-2 cursor-pointer hover:text-gray-500"><span className=""></span>User Monitor</li></Link>
                    </ul>
    
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
