import Sidebar from "../../components/Sidebar"; 
import ListBuckets from "../../components/minio/bucket/ListBuckets";

function Bucket() {
    return (
        <div className="w-full overflow-hidden min-h-[90vh] bg-slate-100">  
            <div className="flex flex-row ">
                <div>
                    <Sidebar />  
                </div>
                <div className="flex flex-col w-full z-0">
                    <ListBuckets/>
                </div>
            </div>
        </div>
    )
}

export default Bucket;