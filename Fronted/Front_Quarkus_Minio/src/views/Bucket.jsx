import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"; 
import ListBuckets from "../components/bucket/ListBuckets";

function Bucket() {
    return (
        <div className="w-full overflow-hidden"> 
            <Navbar/>
            <div className="flex flex-row pt-20">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div style={{ width: "calc(100% - 80px)" }} className="ml-[80px] flex flex-col w-[100%-80px] ">
                    <ListBuckets/>
                </div>
            </div>
        </div>
    )
}

export default Bucket;