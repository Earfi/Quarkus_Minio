import { useState } from "react";

function AddBucket() {
    const [showAdd,setShowAdd] = useState(false);
    const [inputBucket,setInputBucket] = useState(null); 

    const uploadBucket = async () => {
        try{
            if(inputBucket == null){
                alert("Please Input Bucket Name !!!") 
                return;
            }  

            const requestData = {
                bucketName: inputBucket,
            };

            const res = await fetch("http://localhost:8080/minio/bucket/upload",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            })

            if (res.ok) {
                alert("Bucket add successfully");
                window.location.reload();
            } else {
                alert("Error adding Bucket!!!");
            }
        } catch(error) {
            alert("Error adding Bucket!! :", error);
        }
    }

    return (
        <div className="flex flex-col items-end transition-all"> 
            <button onClick={(e) => setShowAdd(!showAdd)} className="bg-red-500 w-28 float-right text-white px-2 py-1 rounded-md font-semibold border shadow-md hover:bg-red-800">
                Add Bucket
            </button> 
            {showAdd == true && (
                <div className="flex flex-col mt-5 bg-white p-2 absolute top-32 shadow-2xl border-black border-2">
                    <h1 className="font-mono">Input Bucket!!!</h1>
                    <input onChange={(e) => setInputBucket(e.target.value)} type="text" className="border px-2 py-1"/> 
                    <button onClick={uploadBucket} className="bg-red-500 mt-2 text-white px-2 py-1 rounded-md font-semibold border shadow-md hover:bg-red-800">Add</button>
                </div>
            )

            }
        </div>
    )
}

export default AddBucket;