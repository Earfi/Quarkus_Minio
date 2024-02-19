import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ListFile from "../components/file/ListFile";
import UploadFile from "../components/file/UploadFile";

function FileBucket() {
    const { bucket } = useParams(); 
    const navigate = useNavigate();
    
    return (
        <div className="w-full overflow-hidden mb-20"> 
            <Navbar/>
            <div className="flex flex-row pt-20">
                <div className="fixed ">
                    <Sidebar/>  
                </div>
                <div className="ml-[80px] flex flex-col w-[100%]"> 
                    <div className="mx-auto ">
                        {/* <h1 onClick={() => navigate(-1)} className="absolute text-4xl text-white md:text-black md:-left-20 cursor-pointer hover:text-red-500 z-0">&#10094;</h1> */}
                        <UploadFile/>
                        <ListFile bucket={bucket} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileBucket;
