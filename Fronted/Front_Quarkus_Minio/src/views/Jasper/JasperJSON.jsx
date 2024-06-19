import { useState } from "react";
import Sidebar from "../../components/Sidebar";  
import InsertCompany from "../../components/jasper/JSON/InsertCompany";
import InsertLetter from "../../components/jasper/JSON/InsertLetter";
import Footer from "../../components/Footer";

function JasperJSON() {
    const [template,setTemplate] = useState(null); 

    return (
        <div className="w-full overflow-hidden min-h-screen h-full">  
            <div className="flex flex-row ">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-full bg-gray-100"> 
                    <div className="bg-white w-full xl:w-[70%] md:mx-auto"> 
                        <h1 className='text-center font-bold text-4xl text-gray-800 my-8'>Gen PDF with JSON</h1>
                        <hr />
                        <div className="p-5"> 
                            <p className="text-sm font-bold text-red-500">Click on the picture of interest. And look below, it will be the selected template which can be edited immediately.</p>
                            <hr />
                            <div className="grid sm:grid-cols-3 gap-10 justify-center my-5">
                                <div className="flex flex-col" onClick={(e) => setTemplate("1")}>
                                    <p className="text-lg font-mono">Letter</p>
                                    <img src="../..//simpleJasperLetter.png" className="object-contain w-fit mx-auto mt-5 border-4 border-black"  alt="" />
                                </div>
                                <div className="flex flex-col" onClick={(e) => setTemplate("2")}>
                                    <p className="text-lg font-mono">Company Client</p>
                                    <img src="../..//simpleJasper.png" className="object-contain w-fit mx-auto mt-5 border-4 border-black"  alt="" />
                                </div>
                                <div className="flex flex-col" onClick={(e) => setTemplate("0")}>
                                    <p className="text-lg font-mono">Address</p>
                                    <img src="../..//simpleJasperAddress.png" className="object-contain w-fit mx-auto mt-5 border-4 border-black"  alt="" />
                                </div>
                            </div>
                        </div>
                        <hr /> 
                        <div className="w-full">
                            {/* <InsertJson/>  */}
                            <div className="w-full xl:w-[90%] xl:mx-auto h-full p-2"> 
                                    <div>
                                        {(template == null || template == "1") && (
                                            <>
                                                <InsertLetter/>
                                            </>
                                        )}
                                        {template == "2" && (
                                            <>
                                                <InsertCompany/>
                                            </>
                                        )}
                                        {template == "0" && (
                                            <>
                                                <h1 className="text-red-500 font-bold text-center text-xl">This document cannot be used at this time. Sorry for the inconvenience.</h1>
                                            </>
                                        )}
                                    </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default JasperJSON;