import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";

function Profile() { 
    const [decodedToken,setDecodedToken] = useState(null)
    const [token,setToken] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("token")
        setDecodedToken(jwtDecode(token)); 
    },[])

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("username")

        Swal.fire({
            title: "Logout successfully",
            text: "Bye Bye!!!",
            icon: "success",
            showConfirmButton: false, 
            timer: 1000
        });
        setTimeout(() => {
            navigate('/');
            window.location.reload()
        }, 1500); 
    }

    return (
        <div className="w-full overflow-hidden"> 
            <Navbar/>
            <div className="flex flex-row bg-slate-200 min-h-[100vh]">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-[100%] min-h-[100vh]"> 
                    <div className="mx-auto flex flex-col justify-start items-center bg-white w-[100%] sm:w-[60%] md:w-[50%] min-h-[100vh]">
                        <h1 className="text-2xl my-5 font-medium text-center border-b-2">Profile</h1>
                        <img className="w-[300px] mx-auto border-4 border-black rounded-full" src="../..//Suzuki-36-42-stand.jpg" alt="" />
                        <input type="file" className="file-input file-input-bordered my-5 bg-gray-100 border "/> 
                        <div className="px-2 sm:px-10 my-3 gap-10 w-full flex flex-wrap justify-around">
                            <div className="flex items-center gap-1">
                                <label className="text-lg text-gray-600 font-medium">Name: </label>
                                <p className="text-md">Earf</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-lg text-gray-600 font-medium">Email: </label>
                                <p className="text-md">pichaya.chan.work@gmail.com</p>
                            </div>
                            
                            <div className="flex items-center gap-1">
                                <label className="text-lg text-gray-600 font-medium">Call: </label>
                                <p className="text-md">082-XXX-XXXX</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-lg text-gray-600 font-medium">Github: </label>
                                <p className="text-md">Earfi</p>
                            </div>
                        </div>
                        <Link to="/" onClick={logout} className={`text-white border-2 p-2 bg-red-500 hover:bg-red-800 my-5 w-[100px]`}>LOGOUT</Link> 
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;