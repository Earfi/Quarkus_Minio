import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ListFile from "../components/file/ListFile";
import UploadFile from "../components/file/UploadFile";

function FileBucket() {
    const {bucket} = useParams();
 
    return (
        <div className="w-full overflow-hidden mb-20"> 
            <Navbar/>
            <div className="flex flex-row pt-20">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="ml-[80px] flex flex-col w-[100%]"> 
                    <div className="mx-auto">
                        <UploadFile/>
                        <ListFile bucket={bucket} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileBucket;