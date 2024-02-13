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
                <div className="ml-[80px] flex flex-col w-[100%]"> 
                    <div className="mx-auto">
                        <UploadFile/> 
                        <ListFile bucket={"1testbacket"} />
                        <ListFile bucket={"2testbucket"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilePage;