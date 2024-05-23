import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

function UploadFile() {
    const [allBuckets, setAllBuckets] = useState([]);   
    const [bucket, setBucket] = useState(''); 
    const [file, setFile] = useState(null); 
    const [fileName, setFileName] = useState(null); 
    const [folder, setFolder] = useState(null); 
    const [showUploadUI, setShowUploadUI] = useState(false);

    useEffect(() => { 
        const getAllBucket = async () => {
            const res = await fetch("http://localhost:8080/minio/all/bucket");
            const data = await res.json();
            setAllBuckets(data);
        };
        getAllBucket();
    }, []); 

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFileName(selectedFile ? selectedFile.name : null); 
        setFile(selectedFile);
    };
    
    const toggleUploadUI = () => {
        setShowUploadUI(!showUploadUI);
    };

    const uploadFile = async () => {
        if (!file) {
            alert("No file selected");
            console.error("No file selected");
            return;
        }
        if (!bucket || bucket === "Please Select") {
            alert("No bucket selected");
            console.error("No bucket selected");
            return;
        }

        const formData = new FormData();
        
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("bucket", bucket);

        if(folder != null || folder != ""){
            formData.append("folder", folder); 
        }else{ 
            formData.append("folder", ''); 
        }

        try {
            
            const res = await fetch(`http://localhost:8080/minio/file/upload`, {
                method: "POST",
                body: formData,
                headers: { 
                    'Authorization': `Bearer ` + localStorage.getItem("token")
                },
            });

            if (res.ok) {
                Swal.fire({
                    title: "File uploaded successfully",
                    text: "Please Check your File!!!",
                    icon: "success",
                    showConfirmButton: false, 
                    timer: 1000
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500); 
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error uploading file!!!", 
                }); 
            } 
       
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error uploading file!!!", 
            }); 
        }
    };

    return (
      <div className='bg-gradient-to-bl to-purple-800 from-red-800 w-full lg:w-[650px] xl:w-[800px] px-5 py-5 border-2 shadow-xl rounded-md m-auto'>
        <button onClick={toggleUploadUI} className="text-white text-sm bg-red-500 hover:bg-red-700 p-2 rounded-md mb-4 w-full md:w-auto">Upload File</button>
            {/* {showUploadUI && ( */}
            <div className={`sm:flex justify-center flex-wrap overflow-hidden transition-all duration-500 ${showUploadUI ? 'h-fit' : 'h-0'}`}>
                    <div className='m-2 p-4 bg-white rounded-lg shadow-md w-full '>
                        <h1 className='font-bold text-xl text-gray-800 mb-4'>Upload File</h1>
                        <div className='w-full'>
                            <p className='text-sm font-medium text-gray-700 mb-1'>Select Bucket</p> 
                            <select onChange={(e) => setBucket(e.target.value)} content='Bucket' className='select select-bordered h-10 border border-gray-500 cursor-pointer hover:bg-gray-200 focus:outline-none rounded-md mb-4 w-full'>
                                {allBuckets.length === 0 && (
                                    <option className='bg-red-500 text-white font-mono p-2'>No Bucket !!!</option>
                                )}
                                <option className="bg-black text-white cursor-not-allowed">Please Select</option>
                                {allBuckets.map((post, index) => ( 
                                    <option className='text-gray-800 bg-white hover:bg-gray-200 cursor-pointer' key={index} value={post}>{post}</option>
                                ))} 
                            </select>
                            <p className='text-sm font-medium text-gray-700 mb-1'>folder</p> 
                            <input type="text" onChange={(e) => setFolder(e.target.value)} className='text-sm font-medium text-gray-700 h-10 border border-gray-500 rounded-md mb-4 w-full p-2' placeholder="format ../../.."/>
                        </div>
                        <div className='mb-4'>
                            <label className='text-sm font-medium text-gray-700'>Select file : </label> 
                            <input type="file" onChange={handleFileChange} className="file-input file-input-bordered h-10 border border-gray-500 cursor-pointer hover:bg-gray-200 focus:outline-none rounded-md w-full" />
                        </div>
                        <div>
                            <button onClick={uploadFile} className='w-full bg-red-600 text-white p-2 rounded-md cursor-pointer hover:bg-red-800'>Upload File</button>
                        </div>
                        <div className="flex flex-col mt-4">
                            <p className='text-sm font-medium text-gray-700'><b>File selected : </b>{file ? file.name : 'No file selected'}</p>  
                            <p className='text-sm font-medium text-gray-700'><b>Bucket selected : </b>{bucket ? bucket : 'No bucket selected'}</p>
                        </div>
                    </div>
                </div>
            {/* )} */}
        </div>
    );
}

export default UploadFile;
