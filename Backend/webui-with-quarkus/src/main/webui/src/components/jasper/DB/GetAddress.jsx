import { useEffect, useState } from "react";

function GetAddress() {

    const [infoAddress,setInfoAddress] = useState([]);

    useEffect(()=> {
        const getAddress = async () => {
            const res = await fetch("http://localhost:8080/address",{
                method: "GET"
            });
            const data = await res.json();
            setInfoAddress(data);
        };  
        getAddress();
    },[])

    const removeAddress = async (id) => {
        
            const res = await fetch(`http://localhost:8080/address/${id}`, {
                method: "DELETE"
            });
    
            if (!res.ok) {
                throw new Error("Failed to Delete Id" + id);
            } else{ 
                alert("Delete Id " + id +  " successfully!");
                window.location.reload();
            } 
    }

    const downloadPdf = async () => {
        try {
            const res = await fetch("http://localhost:8080/jasper/address/export", {
                method: "GET"
            });
    
            if (!res.ok) {
                throw new Error("Failed to fetch PDF");
            }
    
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
    
            window.open(url);
    
            alert("Download file successfully!");
        } catch (error) {
            console.error("Failed to download file:", error);
            alert("Failed to download file!");
        }
    }
    

    return(
        <div className="w-full xl:w-[1000px] bg-gray-200 h-fit mt-10 border-2 border-black"> 
            <h1 className="pt-5 pl-5 text-3xl font-medium ">Address Client</h1>
            <hr className="bg-black h-1"/>  
            {infoAddress.length > 0 && (
                <button className="m-5" onClick={downloadPdf}><a href="" className="bg-purple-600 text-white  p-2 rounded-lg hover:bg-purple-800 cursor-pointer">Download</a></button>
            )}
            {infoAddress.length > 0 && (
                <div className="p-5 flex gap-5 flex-wrap justify-center">
                    {infoAddress.map((a) => (
                        <div>
                            <div className="bg-gray-800 p-5 w-[200px] h-[200px] font-sans text-white border-white border">
                                <h1><b>Firstname :</b> {a.firstname}</h1>
                                <h1><b>Lastname :</b> {a.lastname}</h1>
                                <h1><b>Street :</b> {a.street}</h1>
                                <h1><b>City :</b> {a.city}</h1>
                                <button onClick={() => removeAddress(a.id)} className="bg-red-500 cursor-pointer p-1 rounded-md mt-3 hover:bg-red-800">DELETE</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {infoAddress.length == 0 && (
                <div className="bg-red-500 w-full h-16">
                    <h1 className="text-white font-bold text-center pt-5">No Client Address!!</h1>
                </div>
            )
            }
        </div>
    )
}

export default GetAddress