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
        <div className="w-full overflow-hidden mb-20"> 
            <Navbar/>
            <div className="flex flex-row ">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-[100%]"> 
                    <div className="mx-auto">
                        <h1 className="text-2xl my-5 font-medium text-center border-b-2">Profile</h1>
                        <img className="w-[300px] mx-auto border-4 border-black rounded-full" src="../..//Suzuki-36-42-stand.jpg" alt="" />
                        <input type="file" className="file-input file-input-bordered my-5 bg-gray-100 border"/>
                        <div className="flex flex-col gap-5 md:flex-row w-full">
                            <Link to="/" onClick={logout} className={`text-white border-2 p-2 bg-red-500 hover:bg-red-800 my-5`}>LOGOUT</Link> 
                            {/* <h1><span className="font-bold">Name : </span>{decodedToken.upn}</h1> */}
                            {/* <h1><span className="font-bold">Role : </span>{decodedToken.groups}</h1> */}
                            {/* <h1><span className="font-bold">Birthday : </span>{decodedToken.birthdate}</h1> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;