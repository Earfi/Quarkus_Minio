import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import GetAddress from "../components/jasper/GetAddress";
import InsertAddress from "../components/jasper/InsertAddress";

function Jasper() {
    return (
        <div className="w-full overflow-hidden mb-20"> 
            <Navbar/>
            <div className="flex flex-row pt-20">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="ml-[80px] flex flex-col w-[100%]"> 
                    <div className="w-fit mx-auto">
                        <InsertAddress/>
                        <GetAddress/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jasper;