import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"; 
import UploadFile from "../components/minio/file/UploadFile";
import ListFile from "../components/minio/file/ListFile";
import { useEffect, useState } from "react";

function FilePage() { 
    const [token,setToken] = useState(null);

    useEffect(() => { 
        setToken(localStorage.getItem("token"))
    }, []);
 
    return (
        <div className="w-full overflow-hidden mb-20"> 
            <Navbar/>
            <div className="flex flex-row ">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-[100%] mt-16"> 
                    <div className="mx-auto">
                        <div className={`${token == null ? 'hidden' : 'block'}`}>
                            <UploadFile/>  
                        </div>
                        <ListFile bucket={"pichaya"} />
                        <ListFile bucket={"student"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilePage;