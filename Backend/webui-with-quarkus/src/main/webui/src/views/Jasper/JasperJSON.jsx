import Sidebar from "../../components/Sidebar"; 
import InsertJson from "../../components/jasper/JSON/InsertJson";

function JasperJSON() {
    

    return (
        <div className="w-full overflow-hidden min-h-screen h-full">  
            <div className="flex flex-row ">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-full mb-40 bg-gray-100"> 
                    <div className="bg-white w-full md:w-[70%] md:mx-auto">
                        <h1 className="text-xl font-bold my-5 ml-5 text-center">Gen PDF with JSON</h1>
                        <hr />
                        <div className="p-5">
                            <h1 className="text-md font-bold text-blue-500 my-5">Example output file!!</h1>    
                            <hr />
                            <div className="flex flex-wrap gap-10 justify-center my-5">
                                <div className="flex flex-col">
                                    <p className="text-lg font-mono">Letter</p>
                                    <img src="../..//simpleJasperLetter.png" className="h-[200px] xl:h-[400px] object-contain w-fit mx-auto mt-5 border-4 border-black"  alt="" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-lg font-mono">Company Client</p>
                                    <img src="../..//simpleJasper.png" className="h-[200px] xl:h-[400px] object-contain w-fit mx-auto mt-5 border-4 border-black"  alt="" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-lg font-mono">Address</p>
                                    <img src="../..//simpleJasperAddress.png" className="h-[200px] xl:h-[400px] object-contain w-fit mx-auto mt-5 border-4 border-black"  alt="" />
                                </div>
                            </div>
                        </div>
                        <hr /> 
                        <div className="w-full">
                            <InsertJson/> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JasperJSON;