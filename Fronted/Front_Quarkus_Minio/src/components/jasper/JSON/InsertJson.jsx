import { useState } from "react";
import InsertCompany from "./InsertCompany";
import InsertLetter from "./InsertLetter";


function InsertJson() {
    const [template,setTemplate] = useState(null);

    return (
       <div  className="w-full h-fit ">
        <hr />
            <div>
                <h1 className="ml-5 text-xl font-bold my-2 text-center">Select Template</h1>
                <select onChange={(e) => setTemplate(e.target.value) } className="w-full h-18 border text-lg p-5 bg-blue-800 font-bold text-white text-center hover:bg-blue-900" >
                    {/* <option value="0" className="bg-black hover:bg-gray-800">Select Template</option> */}
                    <option value="0" className="bg-black text-white hover:bg-gray-800 cursor-none" >select</option> 
                    <option value="1" className="bg-white text-black">Letter</option> 
                    <option value="2" className="bg-white text-black">Company Client</option> 
                </select>
            </div>
            <div className="w-full min-h-[100vh]"> 
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
                    </div> 
            </div>

       </div>
    )
}

export default InsertJson;
