import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

function Information({bucket}) {  
    const [files, setFiles] = useState([]);
    const [editBtn, setEditBtn] = useState(false);
    const [filesEditName, setFilesEditName] = useState("");
    const [newName, setNewName] = useState("");
    const [link, setLink] = useState("");
    const [token, setToken] = useState(null);
    const [folderView, setFolderView] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem("token"));

        const getFileFromBucket = async () => {
            const res = await fetch(`http://localhost:8080/minio/file/all/${bucket}`);
            const data = await res.json();
            setFiles(data);
            // console.log(data);
        };

        getFileFromBucket();
    }, [bucket]);

    const groupFilesByFolder = (files) => {
        return files.reduce((folders, file) => {
            const indexOfSlash = file.fileName.indexOf('/');
            let folderPath;
            if (indexOfSlash !== -1) {
                folderPath = file.fileName.substring(0, indexOfSlash);
            } else {
                folderPath = "";
            }
    
            if (!folders[folderPath]) {
                folders[folderPath] = [];
            }
            folders[folderPath].push(file);
            console.log(folders);
            return folders;
        }, {});
    };
    
    
    // console.log(folders);
    

    const groupedFiles = groupFilesByFolder(files);

    const openPreview = (url) => {
        setLink(url);
        document.getElementById('my_modal_2').showModal();
    };

    const handleFolderClick = (folder) => {
        setFolderView(folderView === folder ? null : folder);
    };

    const deleteFile = async (file) => { 
        try {

            Swal.fire({
                title: "Are you sure?",
                text: "You wan't to delete File!!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then(async (result) => {
                if (result.isConfirmed) {  
                  await deleteFile(file);
                }
              });

            async function deleteFile(file) {
                const res = await fetch(`http://localhost:8080/minio/file/delete/${bucket}/${file}`,{
                    method: "DELETE",
                    headers: {
                        'X-HTTP-Method-Override': 'DELETE', 
                        'Authorization': `Bearer ` + localStorage.getItem("token")
                    },
                });
            
                if (res.ok) {
                    Swal.fire({
                        title: "Delete File successfully",
                        text: "Please Check your File!!!",
                        icon: "success" ,
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
                        text: "Failed Delete file!!!", 
                        timer: 1000 
                    }); 
                } 
            }
            
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed Delete file!!!", 
                timer: 1000  
            }); 
        }
    };   

    const downloadFile = async (fileName) => {
        const res = await fetch(`http://localhost:8080/minio/download/file/${bucket}/${fileName}`, {
            method: "GET",
        });
    
        if (res.ok) {
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url); 
            Swal.fire({
                title: "Downloaded File Successfully!!",
                text: "Please Check your File!!!",
                icon: "success",
                showConfirmButton: false, 
                timer: 1000
              });
            // setTimeout(() => {
            //     window.location.reload()
            // }, 1500); 
        } else { 
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error Downloading file!!!",
                showConfirmButton: false,  
                timer: 1000
            });
        }
    };
    
    const setFileEditedName = (file) => {
        setFilesEditName(file);
        setEditBtn(!editBtn);
    }; 
    
    const convertDate = (dateString) => { 
        const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' });
        const dateObj = new Date(dateString);
        dateObj.setHours(dateObj.getHours() + 7);
        return formatter.format(dateObj);
    };
    
    const convertBytes = (bytes) => {

        if ((bytes/1024/1024) >= 1024) {
            return (bytes / 1024/1024/1024).toFixed(2) + ' GB';
        } else if ((bytes/1024) >= 1024) {
            return (bytes / 1024/1024).toFixed(2) + ' MB';
        } else {
            return (bytes / 1024).toFixed(2) + ' KB';
        }
    }

    const convertFileName = (name) => {
        let text = name.replace(/\+%28/g, " (");
        text = text.replace(/%29/g, ")");
        text = text.replace(/\+/g, " ");

        return text;
    }

    const renameFile = async () => {
        const typeFile = filesEditName.slice(-3);

        let newValue = newName + "." + typeFile;
        // console.log("Bucket name : " + bucket);
        // console.log("Old name : " + filesEditName);
        // console.log("Type File : " + typeFile);
        // console.log("New name : " + newValue);

        const res = await fetch(`http://localhost:8080/minio/file/edit/${bucket}/${filesEditName}/${newValue}`, {
            method: "PUT",
            headers: { 
                'Authorization': `Bearer ` + localStorage.getItem("token")
            },
        }); 
    
        if (res.ok) {
            Swal.fire({
                title: "Edit File Successfully!!",
                text: "Please Check your File!!!",
                icon: "success",
                showConfirmButton: false, 
                timer: 1000
              });
            setTimeout(() => {
                window.location.reload()
            }, 1000); 
        } else { 
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error Edit file Name!!!",
                showConfirmButton: false,  
                timer: 1000
            });
        }
    };


    const previewPdf = async () => {
        // const url = window.URL.createObjectURL(link);
        window.open(link)
        // saveAs(link + ".pdf");
        console.log(link);
        console.log("pdf");
    }

    return (
        <>
            <div className='bg-white w-full lg:w-[650px] xl:w-[800px] py-5 shadow-lg'>
                <div className='w-full bg-white'>
                    <h1 className='text-xl font-bold border-b-2 p-2'>Bucket: <span className='text-red-500'>{bucket}</span></h1>
                </div>
                {files.length === 0 && (
                    <p className='m-5 bg-red-500 text-white font-mono border-l-red-500 border p-2'>No File !!!</p>
                )}
                {/* เพิ่มการเช็ค folder ชื่อ "Root" และการแสดงไว้ที่นี่ */}
                {Object.keys(groupedFiles).sort((a, b) => a === "" ? -1 : 0).map((folder, idx) => (
                    <div key={idx}>
                        {folder == "" && (
                            <div>
                                {groupedFiles[folder].map((file, idx) => (
                                    <div key={idx} className='flex flex-col items-center justify-center border p-5 w-full'>
                                        <div className='w-full mx-auto flex flex-col justify-end items-start gap-5'>
                                            <div className="flex flex-col transition-all duration-200 w-[240px] sm:w-full mx-auto overflow-hidden bg-white p-2 border-black border rounded-xl">
                                                <p className='break-words'><b>Name : </b>{file.fileName}</p>
                                                <p><b>Size : </b>{convertBytes(file.fileSize)}</p>
                                                <p><b>Last Modified : </b>{convertDate(file.creationDate)}</p>

                                                <dialog id="my_modal_2" className="modal">
                                                    <div className="modal-box">
                                                        {(link.includes("jpg") || link.includes("png")) && (
                                                            <img src={link} width="1000" height="600" alt="preview"></img>
                                                        )}
                                                        {(link.includes("pdf")) && (
                                                            <button onClick={() => previewPdf} className='btn bg-red-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-red-800 w-full'>Open New Tab</button>
                                                        )}
                                                    </div>
                                                    <form method="dialog" className="modal-backdrop">
                                                        <button>close</button>
                                                    </form>
                                                </dialog>
                                            </div>
                                            <div className='flex flex-row flex-wrap gap-3 mt-2 md:mt-0 sm:ml-2 w-full justify-center sm:justify-end'>
                                                <button onClick={() => openPreview(file.url)} className='btn bg-purple-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-purple-800 hover:skeleton'>PREVIEW</button>
                                                <button onClick={() => downloadFile(file.fileName)} className='bg-blue-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-blue-800 hover:skeleton'>Download</button>
                                                <button onClick={() => setFileEditedName(file.fileName)} className={`${token == null ? 'hidden' : 'block'} bg-gray-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-gray-800 hover:skeleton`}>Edit</button>
                                                <button onClick={() => deleteFile(file.fileName)} className={`${token == null ? 'hidden' : 'block'} bg-red-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-red-800 hover:skeleton`}>DELETE</button>
                                            </div>

                                            <div className={` ${editBtn === true && filesEditName === file.fileName ? 'h-44 p-2' : 'h-0'} overflow-hidden transition-all w-full border shadow-lg bg-white flex flex-col justify-center items-center mx-auto border-t-8 border-t-green-500 rounded-b-2xl mb-2`}>
                                                <label className="text-xl my-2"><b>Input new File Name!!</b></label>
                                                <input onChange={(e) => setNewName(e.target.value)} type="text" className="p-2 rounded-md w-full border" />
                                                <button onClick={() => renameFile(file)} className="skeleton bg-red-500 w-full my-2 p-2 cursor-pointer text-white font-medium hover:bg-red-800 border-2 border-gray-700">OK</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {folder !== "" && (
                            <>
                                <h2 onClick={() => handleFolderClick(folder)} className='cursor-pointer text-black font-bold p-2 rounded-lg mx-5 my-2 shadow-sm bg-gradient-to-bl from-yellow-500 to-yellow-300 border-l-2 border-t-2'>&#10066; {folder}</h2>
                                <div className={`ml-5 transition-all duration-500 ease-in-out folder-content ${folderView == folder ? 'border-none' : 'border-none'} `} style={{ maxHeight: folderView === folder ? '1000px' : '0px', overflow: 'hidden' }}>
                                    {groupedFiles[folder].map((file, idx) => (
                                        <div key={idx} className='flex flex-col items-center justify-center border p-5 w-full bg-white'>
                                            <div className='w-full mx-auto flex flex-col justify-end items-start gap-5'>
                                                <div className="flex flex-col transition-all duration-200 w-[240px] sm:w-full mx-auto overflow-hidden bg-white p-2 border-black border rounded-xl">
                                                    <p className='break-words'><b>Name : </b>{file.fileName}</p>
                                                    <p><b>Size : </b>{convertBytes(file.fileSize)}</p>
                                                    <p><b>Last Modified : </b>{convertDate(file.creationDate)}</p>

                                                    <dialog id="my_modal_2" className="modal">
                                                        <div className="modal-box">
                                                            {(link.includes("jpg") || link.includes("png")) && (
                                                                <img src={link} width="1000" height="600" alt="preview"></img>
                                                            )}
                                                            {(link.includes("pdf")) && (
                                                                <button onClick={() => previewPdf} className='btn bg-red-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-red-800 w-full'>Open New Tab</button>
                                                            )}
                                                        </div>
                                                        <form method="dialog" className="modal-backdrop">
                                                            <button>close</button>
                                                        </form>
                                                    </dialog>
                                                </div>
                                                <div className='flex flex-row flex-wrap gap-3 mt-2 md:mt-0 sm:ml-2 w-full justify-center sm:justify-end'>
                                                    <button onClick={() => openPreview(file.url)} className='btn bg-purple-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-purple-800 hover:skeleton'>PREVIEW</button>
                                                    <button onClick={() => downloadFile(file.fileName)} className='bg-blue-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-blue-800 hover:skeleton'>Download</button>
                                                    <button onClick={() => setFileEditedName(file.fileName)} className={`${token == null ? 'hidden' : 'block'} bg-gray-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-gray-800 hover:skeleton`}>Edit</button>
                                                    <button onClick={() => deleteFile(file.fileName)} className={`${token == null ? 'hidden' : 'block'} bg-red-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-red-800 hover:skeleton`}>DELETE</button>
                                                </div>

                                                <div className={` ${editBtn === true && filesEditName === file.fileName ? 'h-44 p-2' : 'h-0'} overflow-hidden transition-all w-full border shadow-lg bg-white flex flex-col justify-center items-center mx-auto border-t-8 border-t-green-500 rounded-b-2xl mb-2`}>
                                                    <label className="text-xl my-2"><b>Input new File Name!!</b></label>
                                                    <input onChange={(e) => setNewName(e.target.value)} type="text" className="p-2 rounded-md w-full border" />
                                                    <button onClick={() => renameFile(file)} className="skeleton bg-red-500 w-full my-2 p-2 cursor-pointer text-white font-medium hover:bg-red-800 border-2 border-gray-700">OK</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>  
                ))}     
            </div>   
        </>
    )
    
}

export default Information;