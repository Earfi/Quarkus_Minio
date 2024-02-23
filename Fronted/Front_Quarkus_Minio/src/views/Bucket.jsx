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
                <div className="flex flex-col w-full mt-16">
                    <ListBuckets/>
                </div>
            </div>
        </div>
    )
}

export default Bucket;