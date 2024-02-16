import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar"; 
import InsertJson from "../../components/jasper/JSON/InsertJson";

function JasperJSON() {
    const [copied,setCopied] = useState(false)
    const [jsonData] = useState(`{
        "companyName": "Company",
        "companyUrl": "www.company.com",
        "rows": [
          {
            "name": "John Smith",
            "age": "40",
            "gender": "Male",
            "phone": "321-654-9870",
            "birthday": "1983-11-10"
          },
          {
            "name": "Lady nano",
            "age": "30",
            "gender": "feMale",
            "phone": "321-654-9870",
            "birthday": "1983-11-10"
          }
        ]
      }`);

      const copyJsonData = () => {
        navigator.clipboard.writeText(jsonData); 
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      };


    return (
        <div className="w-full overflow-hidden mb-20"> 
            <Navbar/>
            <div className="flex flex-row pt-20">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div style={{ width: "calc(100% - 80px)" }} className="ml-[80px] flex flex-col w-[100%-80px] "> 
                    <h1 className="text-xl font-bold my-5 ml-5">Gen PDF with JSON :</h1>
                    <InsertJson/>
                    <hr className="h-1 w-full bg-black my-1"/>
                    <div className="w-full mx-auto flex flex-col lg:flex-row md:justify-center items-center md:items-start gap-5">
 
                        <div className="pt-5 md:pt-0 mx-auto lg:m-0">
                            <h1 className="text-center text-2xl font-bold">Example output file!!</h1>    
                            <img src="../..//simpleJasper.png" className="md:h-[800px] object-contain w-fit mx-auto mt-5 border-4 border-black"  alt="" />
                        </div>

                        <div className="max-w-xs mx-auto lg:m-0 h-fit p-2 border rounded-lg bg-gray-100 text-sm lg:mt-12">
                            <h1 className="font-bold mb-1">รูปแบบ Json ที่ส่งไป</h1>
                            <textarea
                                className="w-full h-80 mb-2 resize-none border rounded-md p-2 text-xs"
                                value={jsonData}
                                readOnly
                            />
                            <button
                                className={`bg-${copied ? 'red' : 'blue'}-500 w-48 text-white px-4 py-2 rounded hover:bg-${copied ? 'red' : 'blue'}-600`}
                                onClick={copyJsonData}
                            >
                                {copied ? 'Copied!' : 'Copy JSON Data'}
                            </button> 
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default JasperJSON;