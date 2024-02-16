import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

function UploadFile() {
    const [allBuckets,setAllBuckets] = useState([]);  
    // to send backend
    const [bucket,setBucket] = useState(''); 
    const [file,setFile] = useState(null); 
    const [fileName,setFileName] = useState(null); 
  
    useEffect(() => { 
        const getAllBacket = async () => {
            const res = await fetch("http://localhost:8080/minio/all/bucket")
            const data = await res.json()
            setAllBuckets(data)
        }  
        getAllBacket() 
    },[]) 

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFileName(selectedFile ? selectedFile.name : null); 
        setFile(selectedFile);
      };
    
      const uploadFile = async () => {
        try {
          if (!file) {
            alert("No file selected");
            console.error("No file selected");
            return;
          }
          if (!bucket || bucket == "Please Select") {
            alert("No bucket selected");
            console.error("No bucket selected");
            return;
          }
      
          const formData = new FormData();
          formData.append("file", file);
          formData.append("fileName", fileName);
      
          const res = await fetch(`http://localhost:8080/minio/file/upload/${bucket}`, {
            method: "POST",
            body: formData,
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
                window.location.reload()
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
        <div className='bg-blue-950 w-full sm:w-[450px] md:w-[550px] lg:w-[650px] xl:w-[800px] px-5 py-5  border-2 shadow-xl'>
          <h1 className='font-bold text-xl text-white '>UploadFile</h1>
          <div className=' sm:flex justify-center flex-row h-fit  '> 
            <div className='m-2 w-full'>
              <p className='text-md font-serif text-white'>Select Bucket</p> 
              <select onChange={(e) => setBucket(e.target.value)} content='Bucket' className='border border-gray-500 cursor-pointer hover:bg-gray-500 hover:text-white '>
                {allBuckets.length == 0 &&
                  (
                    <>
                      <option className='m-5 bg-red-500 text-white font-mono border-l-red-500 border p-2'>No Bucket !!!</option>
                    </>
                  )
                }
                <option className="bg-black text-white hover:cursor-none ">Please Select</option>
                {allBuckets.map((post) => ( 
                  <>
                    <option className='m-5 text-black bg-white hover:bg-red-400 hover:text-white hover:cursor-pointer"' key={post} value={post}>{post}</option>
                  </>
                ))} 
              </select>
            </div>
            <div className='mb-5'>
              <label className='text-md font-serif ms-2 text-white'>Select file : </label>
              <input multiple onChange={handleFileChange} className='bg-white border w-full' type="file"  />
            </div>
          </div>
          <button onClick={uploadFile} className='w-full bg-red-600 text-white p-2 cursor-pointer hover:bg-red-800'>Upload File</button>
          <div className="flex flex-col mt-2 bg-white px-2 py-1">
            <p><b>file select : </b>{file ? file.name : 'No file selected'}</p>  
            <p><b>bucket select : </b>{bucket ? bucket : 'No bucket selected'}</p>
          </div>
        </div>
    )
}

export default UploadFile;