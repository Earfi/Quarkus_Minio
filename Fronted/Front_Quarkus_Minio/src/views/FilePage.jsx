import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"; 
import UploadFile from "../components/file/UploadFile";
import ListFile from "../components/file/ListFile";

function FilePage() { 
 
    return (
        <div className="w-full overflow-hidden mb-20"> 
            <Navbar/>
            <div className="flex flex-row pt-20">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-[100%] mt-16"> 
                    <div className="mx-auto">
                        <UploadFile/> 
                        <ListFile bucket={"pichaya"} />
                        <ListFile bucket={"student"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilePage;