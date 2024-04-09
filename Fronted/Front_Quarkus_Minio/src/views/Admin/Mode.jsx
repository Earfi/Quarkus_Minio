import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'; // แก้จาก {jwtDecode} เป็น jwtDecode

function Mode() {
    const navigate = useNavigate();
     
    const [name, setName] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {  
        // if (localStorage.getItem("token") === null) {
        //     navigate('/'); 
        // }
        // const token = localStorage.getItem("token") 
        // console.log(jwtDecode(token));  

        setName(localStorage.getItem("username"));  
        // if (token) {   
        //     const decodedToken = jwtDecode(token);
        //     console.log(decodedToken.groups);  
        //     setRole(decodedToken.groups);  
        //     if (decodedToken.groups !== 'Admin') {
        //         navigate('/'); 
        //     } 
        // }
    }, [navigate]);

    return(
        <div>
            {/* { role === 'Admin' ?   */}
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
            {/* :
                <div>
                    <p>คุณไม่ได้รับสิทธิ์ในการเข้าถึงหน้านี้</p>
                    <Link to="/">กลับสู่หน้าหลัก</Link>
                </div>
            } */}
        </div>
    )
}

export default Mode;
