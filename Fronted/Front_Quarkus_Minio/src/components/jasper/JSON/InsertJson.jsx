import { useState } from "react";
import InsertCompany from "./InsertCompany";
import InsertLetter from "./InsertLetter";


function InsertJson() {
    const [template,setTemplate] = useState(null);

    return (
       <div  className="w-full h-full bg-gradient-to-bl to-purple-800 from-red-800">
            <hr />
            <div className="w-full p-4 bg-gray-800 rounded-lg shadow-md">
                <h1 className="text-xl font-bold my-2 text-center text-white">Select Template</h1>
                <select 
                    onChange={(e) => setTemplate(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white font-bold text-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    <option value="0" className="bg-black text-white cursor-default">Select</option> 
                    <option value="1" className="bg-white text-black">Letter</option> 
                    <option value="2" className="bg-white text-black">Company Client</option> 
                </select>
            </div>
            <div className="w-full xl:w-[80%] xl:mx-auto h-full p-2"> 
                    <div>
                        {(template == null || template == "1" || template == "0") && (
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
