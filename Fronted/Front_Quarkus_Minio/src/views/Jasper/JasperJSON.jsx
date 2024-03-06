import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar"; 
import InsertJson from "../../components/jasper/JSON/InsertJson";

function JasperJSON() {
    

    return (
        <div className="w-full overflow-hidden mb-20"> 
            <Navbar/>
            <div className="flex flex-row ">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-full mb-40"> 
                    <h1 className="text-xl font-bold my-5 ml-5 text-center">Gen PDF with JSON :</h1>
                    <hr />
                    <div className="p-5">
                        <h1 className="text-center text-2xl font-bold text-black my-5">Example output file!!</h1>    
                        <hr />
                        <div className="flex flex-wrap gap-10 justify-center my-5">
                            <div className="flex flex-col">
                                <p className="text-lg font-mono">Letter</p>
                                <img src="../..//simpleJasperLetter.png" className="md:h-[500px] object-contain w-fit mx-auto mt-5 border-4 border-black"  alt="" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-lg font-mono">Company Client</p>
                                <img src="../..//simpleJasper.png" className="md:h-[500px] object-contain w-fit mx-auto mt-5 border-4 border-black"  alt="" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-lg font-mono">Address</p>
                                <img src="../..//simpleJasperAddress.png" className="md:h-[500px] object-contain w-fit mx-auto mt-5 border-4 border-black"  alt="" />
                            </div>
                        </div>
                    </div>
                    <hr /> 
                    <InsertJson/> 
                </div>
            </div>
        </div>
    )
}

export default JasperJSON;