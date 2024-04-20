import Sidebar from "../../components/Sidebar"; 
import ListBuckets from "../../components/minio/bucket/ListBuckets";

function Bucket() {
    return (
        <div className="w-full overflow-hidden min-h-[90vh]">  
            <div className="flex flex-row ">
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