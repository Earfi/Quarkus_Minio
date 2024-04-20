import Sidebar from "../../components/Sidebar";
import GetAddress from "../../components/jasper/DB/GetAddress";
import InsertAddress from "../../components/jasper/DB/InsertAddress";

function JasperDB() {
    return (
        <div className="w-full overflow-hidden min-h-[90vh]">  
            <div className="flex flex-row ">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-[100%] mt-16"> 
                    <div className="w-fit mx-auto">
                        <InsertAddress/>
                        <GetAddress/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JasperDB;