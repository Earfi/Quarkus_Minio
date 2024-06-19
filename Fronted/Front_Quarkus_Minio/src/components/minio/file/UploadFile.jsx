import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

function UploadFile() {
    const [allBuckets, setAllBuckets] = useState([]);   
    const [bucket, setBucket] = useState(''); 
    const [file, setFile] = useState(null); 
    const [fileName, setFileName] = useState(null); 
    const [folder, setFolder] = useState(''); 
    const [showUploadUI, setShowUploadUI] = useState(false);
    const [tags, setTags] = useState([{ key: "", value: "" }]);

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

    const handleAddTag = () => {
        if (tags.length < 10) {
            setTags([...tags, { key: "", value: "" }]);
        } else {
            Swal.fire({
                icon: "warning",
                title: "Limit reached",
                text: "You can add up to 10 tags only.",
            });
        }
    };

    const handleDeleteTag = (index) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
    };

    const handleTagChange = (index, key, value) => {
        const newTags = tags.map((tag, i) => {
            if (i === index) {
                return { ...tag, key, value };
            }
            return tag;
        });
        setTags(newTags);
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

        const filteredTags = tags.filter(tag => tag.key && tag.value);

        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("bucket", bucket);
        formData.append("tagsAsString", JSON.stringify(filteredTags.length > 0 ? filteredTags : []));

        if(folder) {
            formData.append("folder", folder); 
        } else { 
            formData.append("folder", ''); 
        }

        console.log(filteredTags);

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
        <div className='bg-gradient-to-bl to-purple-800 from-red-800 w-full px-5 py-5 border-2 shadow-xl rounded-md m-auto'>
            <div className="w-full flex justify-end pr-56">
                <button onClick={toggleUploadUI} className="text-black font-medium text-sm bg-white hover:bg-gray-200 p-2 rounded-md mb-4 w-fit md:w-auto">Upload File</button>
            </div>
            <div className={` lg:w-[650px] xl:w-[800px] mx-auto sm:flex justify-center flex-wrap overflow-hidden transition-all duration-500 ${showUploadUI ? 'h-fit' : 'h-0'}`}>
                <div className='m-2 p-4 bg-white rounded-lg shadow-md w-full '>
                <h1 className='font-bold text-xl text-gray-800 mb-4'>Upload File</h1>
                <div className='w-full'>
                    <p className='text-sm font-medium text-gray-700 mb-1'>Select Bucket</p> 
                    <select onChange={(e) => setBucket(e.target.value)} content='Bucket' className='select select-bordered h-10 border border-gray-500 cursor-pointer hover:bg-gray-200 focus:outline-none rounded-md mb-4 w-full'>
                    {allBuckets.length === 0 && (
                        <option className='bg-red-500 text-white font-mono p-2 text-xs'>No Bucket !!!</option>
                    )}
                    <option className="bg-black text-white cursor-not-allowed text-xs">Please Select</option>
                    {allBuckets.map((post, index) => ( 
                        <option className='text-gray-800 bg-white hover:bg-gray-200 cursor-pointer text-xs' key={index} value={post}>{post}</option>
                    ))} 
                    </select>
                    <p className='text-sm font-medium text-gray-700 mb-1'>Folder</p> 
                    <input type="text" onChange={(e) => setFolder(e.target.value)} className='text-sm font-medium text-gray-700 h-10 border border-gray-500 rounded-md mb-4 w-full p-2' placeholder="format ../../.."/>
                </div>
                <div className='mb-4'>
                    <label className='text-sm font-medium text-gray-700'>Select file : </label> 
                    <input type="file" onChange={handleFileChange} className="file-input file-input-bordered h-10 border border-gray-500 cursor-pointer hover:bg-gray-200 focus:outline-none rounded-md w-full text-xs" />
                </div>
                <div className="mb-4">
                    <label className='text-sm font-medium text-gray-700'>Tags </label> 
                    {tags.map((tag, index) => (
                        <div key={index} className='flex gap-2 mb-2'>
                            <input 
                                type="text" 
                                value={tag.key} 
                                onChange={(e) => handleTagChange(index, e.target.value, tag.value)} 
                                placeholder="Key no ( $ _ \ / < > * )" 
                                className="p-2 border rounded text-xs w-1/2" 
                            />
                            <input 
                                type="text" 
                                value={tag.value} 
                                onChange={(e) => handleTagChange(index, tag.key, e.target.value)} 
                                placeholder="Value no ( $ _ \ / < > * )" 
                                className="p-2 border rounded text-xs w-1/2" 
                            />
                            <button onClick={() => handleDeleteTag(index)} className="text-red-500 hover:text-red-700">x</button>
                        </div>
                    ))}
                    <button onClick={handleAddTag} className="mt-2 bg-green-500 text-xs text-white p-2 rounded hover:bg-green-700">Add More Tags</button>
                </div>
                <div>
                    <button onClick={uploadFile} className='w-full bg-red-600 text-xs text-white p-2 rounded-md cursor-pointer hover:bg-red-800'>Upload File</button>
                </div>
                <div className="flex flex-col mt-4">
                    <p className='font-medium text-gray-700 text-xs'><b>File selected : </b>{file ? file.name : 'No file selected'}</p>  
                    <p className='font-medium text-gray-700 text-xs'><b>Bucket selected : </b>{bucket ? bucket : 'No bucket selected'}</p>
                </div>
                </div>
            </div>
        </div>
      );
}

export default UploadFile;
