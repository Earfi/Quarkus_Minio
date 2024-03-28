import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Service() {
    return (
        <div className="w-full overflow-hidden mb-20"> 
            <Navbar/>
            <div className="flex flex-row">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="ml-[80px] flex flex-col w-[100%]"> 
                    <div className="mx-auto w-full md:w-[900px] my-10 overflow-hidden rounded-3xl h-full">
                        <div className="flex flex-col md:flex-row w-full gap-5 ">
                            <div className="mockup-phone ">
                                <div className="camera"></div> 
                                <div className="display">
                                    <div className="artboard artboard-demo phone-1 -mt-1 w-full p-0">
                                        <img src="../../ui//phone.png" width={740} alt="" className="rounded-2xl shadow-2xl border p-0"/> 
                                    </div>
                                </div>
                            </div> 
                        </div> 

                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default Service;