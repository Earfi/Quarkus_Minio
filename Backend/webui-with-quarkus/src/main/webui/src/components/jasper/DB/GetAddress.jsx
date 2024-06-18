import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

function GetAddress() {
    const [allBuckets,setAllBuckets] = useState([]);  
    const [bucket,setBucket] = useState(''); 

    const [infoAddress,setInfoAddress] = useState([]);

    useEffect(()=> {
        const getAddress = async () => {
            const res = await fetch("http://localhost:8080/address",{
                method: "GET"
            });
            const data = await res.json();
            setInfoAddress(data);
        };  

        const getAllBacket = async () => {
            const res = await fetch("http://localhost:8080/minio/all/bucket")
            const data = await res.json()
            setAllBuckets(data)
        }  
        getAddress();
        getAllBacket();
    },[])

    const removeAddress = async (id) => {
        
            const res = await fetch(`http://localhost:8080/address/${id}`, {
                method: "DELETE"
            }); 
            if (!res.ok) {
                throw new Error("Failed to Delete Id" + id);
            } else{ 
                Swal.fire({
                    title: "Delete successfully",
                    text: "Please Check your Address!!!",
                    icon: "success" ,
                    showConfirmButton: false, 
                    timer: 1000
                });
                setTimeout(() => {
                    window.location.reload()
                }, 1000); 
            } 
    }

    const downloadPdf = async () => {
        try {
            const res = await fetch(`http://localhost:8080/jasper/address/export/${bucket}`, {
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
                <div className="flex flex-row">
                    <button className="m-5" onClick={downloadPdf}><a href="" className="bg-purple-600 text-white  p-2 rounded-lg hover:bg-purple-800 cursor-pointer">GEN PDF</a></button>
                    <select onChange={(e) => setBucket(e.target.value)} content='Bucket' className='border border-gray-500 cursor-pointer hover:bg-gray-500 hover:text-white my-2' required>
                        {allBuckets.length == 0 &&
                        (
                            <>
                            <option className='m-5 bg-red-500 text-white font-mono border-l-red-500 border p-2'>No Bucket !!!</option>
                            </>
                        )
                        }
                        <option className="bg-black text-white hover:cursor-none ">Please Select Bucket</option>
                        {allBuckets.map((post) => ( 
                        <>
                            <option className='m-5 text-black bg-white hover:bg-red-400 hover:text-white hover:cursor-pointer"' key={post} value={post}>{post}</option>
                        </>
                        ))} 
                    </select>
                </div>
            )}
            {infoAddress.length > 0 && (
                <div className="p-5 flex gap-5 flex-wrap justify-start">
                    {infoAddress.map((a) => (
                        <div>
                            <div className="bg-white p-5 w-[200px] h-[200px] font-sans text-black border-white border">
                                <h1><b>Firstname :</b> {a.firstname}</h1>
                                <h1><b>Lastname :</b> {a.lastname}</h1>
                                <h1><b>Street :</b> {a.street}</h1>
                                <h1><b>City :</b> {a.city}</h1>
                                <button onClick={() => removeAddress(a.id)} className="bg-red-500 cursor-pointer text-white p-1 rounded-md mt-3 hover:bg-red-800">DELETE</button>
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