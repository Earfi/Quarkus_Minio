import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ObjectBrowse() {
    return (
        <div className="w-full overflow-hidden"> 
            <Navbar/>
            <div className="flex flex-row ">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-[100%]">
                    <img src="../..//M1-20-21.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default ObjectBrowse;