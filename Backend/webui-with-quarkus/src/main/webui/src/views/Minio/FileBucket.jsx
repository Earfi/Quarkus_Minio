import { useParams, useNavigate } from "react-router-dom"; 
import Sidebar from "../../components/Sidebar";
import ListFile from "../../components/minio/file/ListFile";
import UploadFile from "../../components/minio/file/UploadFile";
import { useEffect, useState } from "react";

function FileBucket() {
    const { bucket } = useParams(); 
    const navigate = useNavigate();
    const [token,setToken] = useState(null);

    useEffect(() => { 
        setToken(localStorage.getItem("token"))
    }, []);

    return (
        <div className="w-full overflow-hidden min-h-[90vh] bg-slate-100">  
            <div className="flex">
                <div className='hidden lg:block'>
                    <Sidebar />
                </div>
                <div className="flex flex-col w-full"> 
                    <div className="md:mx-auto relative">
                        <h1 onClick={() => navigate(-1)} className="absolute text-4xl text-gray-400 shadow-2xl left-2 top-2 cursor-pointer hover:text-red-500 z-30">&#10094;</h1>
                        <div className={`${token == null ? 'hidden' : 'block'}`}>
                            <UploadFile/> 
                        </div>
                        <ListFile bucket={bucket} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileBucket;
