import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {jwtDecode} from 'jwt-decode';

function Profile() { 
    const [decodedToken,setDecodedToken] = useState(null)

    useEffect(()=>{
        const token = localStorage.getItem("token")
        setDecodedToken(jwtDecode(token)); 
    },[])

    return (
        <div className="w-full overflow-hidden mb-20"> 
            <Navbar/>
            <div className="flex flex-row pt-20">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-[100%]"> 
                    <div className="mx-auto">
                        <h1 className="text-2xl my-5 font-medium text-center border-b-2">Profile</h1>
                        <img className="w-[300px] mx-auto border-4 border-black rounded-full" src="../..//Suzuki-36-42-stand.jpg" alt="" />
                        <input type="file" className="file-input file-input-bordered my-5 bg-gray-100 border"/>
                        <div className="flex flex-col gap-5 md:flex-row w-full">
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