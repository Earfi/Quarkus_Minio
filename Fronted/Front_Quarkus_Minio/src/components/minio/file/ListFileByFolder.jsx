import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function ListFileByFolder({ folder, files }) {
    const [token, setToken] = useState(null);
    const [editBtn, setEditBtn] = useState(false);
    const [filesEditName, setFilesEditName] = useState("");
    const [newName, setNewName] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        console.log(files);
    }, []);

    const openPreview = (url) => {
        setLink(url);
        document.getElementById('my_modal_2').showModal();
    };


    const deleteFile = async (fileName) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to delete File!!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteFile(fileName);
                }
            });

            const formData = new FormData();
            formData.append("fileName", fileName);
            formData.append("bucket", bucket);

            async function deleteFile(file) {
                const res = await fetch(`http://localhost:8080/minio/file/delete`, {
                    method: "DELETE",
                    body: formData,
                    headers: {
                        'X-HTTP-Method-Override': 'DELETE',
                        'Authorization': `Bearer ` + localStorage.getItem("token")
                    },
                });

                if (res.ok) {
                    Swal.fire({
                        title: "Delete File successfully",
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
        const formData = new FormData();
        formData.append("fileName", fileName);
        formData.append("bucket", bucket);

        const res = await fetch(`http://localhost:8080/minio/download/file`, {
            method: "POST",
            body: formData,
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
        if ((bytes / 1024 / 1024) >= 1024) {
            return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';
        } else if ((bytes / 1024) >= 1024) {
            return (bytes / 1024 / 1024).toFixed(2) + ' MB';
        } else {
            return (bytes / 1024).toFixed(2) + ' KB';
        }
    }

    const renameFile = async () => {
        const typeFile = filesEditName.slice(-3);
  
        let newNameValue;

        const lastIndex = filesEditName.lastIndexOf('/');
        if (lastIndex !== -1) {
            const result = filesEditName.substring(0, lastIndex);
            newNameValue = result + "/" + newName;
            console.log(result);
            console.log("1");
        } else {
            console.log("2");
            newNameValue = newName + "." + typeFile;
        }

        console.log("oldName : " + filesEditName);
        console.log("newName : " + newNameValue);

        const formData = new FormData();
        formData.append("bucket", bucket);
        formData.append("oldName", filesEditName);
        formData.append("newName", newNameValue);

        const res = await fetch(`http://localhost:8080/minio/file/edit`, {
            method: "PUT",
            body: formData,
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
            // setTimeout(() => {
            //     window.location.reload()
            // }, 1000); 
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
        window.open(link)
    }

    return (
        <div>
            <h2>{folder}</h2>
            {files.map((file, index) => (
                <div key={index} className='flex flex-col items-center justify-center border p-5 w-full bg-white'>
                    <div className='w-full flex flex-col justify-end items-start gap-5'>
                        <div className="flex flex-col sm:flex-row sm:justify-between transition-all duration-200 w-[240px] sm:w-full mx-auto overflow-hidden bg-white p-2 border-black border rounded-xl">
                            <p className='break-words text-xs'><b>Name : </b>{file.fileName}</p>
                            <p className='text-xs'><b>Size : </b>{convertBytes(file.fileSize)}</p>
                            <p className='text-xs'><b>Last Modified : </b>{convertDate(file.creationDate)}</p>
                            <dialog id="my_modal_2" className="modal">
                                                        <div className="modal-box">
                                                            {(link.includes("jpg") || link.includes("png")) && (
                                                                <img src={link} width="1000" height="600" alt="preview" />
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
                            <button onClick={() => openPreview(file.url)} className='btn-sm bg-purple-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-purple-800 text-xs'>PREVIEW</button>
                            <button onClick={() => downloadFile(file.fileName)} className='btn-sm bg-blue-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-blue-800 text-xs'>Download</button>
                            <button onClick={() => setFileEditedName(file.fileName)} className={`${token == null ? 'hidden' : 'block'} btn-sm bg-gray-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-gray-800 text-xs`}>Edit</button>
                            <button onClick={() => deleteFile(file.fileName)} className={`${token == null ? 'hidden' : 'block'} btn-sm bg-red-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-red-800 text-xs`}>DELETE</button>
                        </div>
                        <div className={` ${editBtn === true && filesEditName === file.fileName ? 'h-28 p-1' : 'h-0'} overflow-hidden transition-all w-full border shadow-lg bg-white flex flex-col justify-center items-center mx-auto border-t-8 border-t-green-500 rounded-b-2xl mb-2 text-xs`}>
                            <label className="text-sm my-1"><b>Input new File Name:</b></label>
                            <input onChange={(e) => setNewName(e.target.value)} type="text" className="p-1 rounded-md w-full border text-xs" />
                            <button onClick={() => renameFile(file)} className="bg-red-500 w-full my-1 p-1 cursor-pointer text-white font-medium hover:bg-red-800 border-2 border-gray-700 text-xs">OK</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListFileByFolder;
