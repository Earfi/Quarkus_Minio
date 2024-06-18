import React from 'react';

export function FileItem({ file }) {
    const openPreview = (url) => {
        setLink(url);
        document.getElementById('my_modal_2').showModal();
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

    const setFileEditedName = (fileName) => {
        setFilesEditName(fileName);
        setEditBtn(!editBtn);
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

            async function deleteFile(fileName) {
                const res = await fetch(`http://localhost:8080/minio/file/delete/${bucket}/${fileName}`,{
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

    const setNewName = (fileName) => {
        setFilesEditName(fileName);
        setEditBtn(!editBtn);
    }; 
    
    const renameFile = async (fileName) => {
        const typeFile = fileName.slice(-3);

        let newValue = newName + "." + typeFile;

        const res = await fetch(`http://localhost:8080/minio/file/edit/${bucket}/${fileName}/${newValue}`, {
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
    
    return (
        <div className='flex flex-col items-center justify-center border p-5 w-full'>
            <div className='w-full mx-auto flex flex-col justify-end items-start gap-5'>
                <div className="flex flex-col transition-all duration-200 w-[240px] sm:w-full mx-auto overflow-hidden bg-white p-2 border-black border rounded-xl">
                    <p className='break-words'><b>Name : </b>{file.fileName}</p>
                    {/* Add your file details here */}
                </div>
                <div className='flex flex-row flex-wrap gap-3 mt-2 md:mt-0 sm:ml-2 w-full justify-center sm:justify-end'>
                    <button onClick={() => openPreview(file.url)} className='btn bg-purple-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-purple-800 hover:skeleton'>PREVIEW</button>
                    <button onClick={() => downloadFile(file.fileName)} className='bg-blue-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-blue-800 hover:skeleton'>Download</button>
                    <button onClick={() => setFileEditedName(file.fileName)} className='bg-gray-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-gray-800 hover:skeleton'>Edit</button>
                    <button onClick={() => deleteFile(file.fileName)} className='bg-red-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-red-800 hover:skeleton'>DELETE</button>
                </div>
                <div className={` ${editBtn === true && filesEditName === file.fileName ? 'h-44 p-2' : 'h-0'} overflow-hidden transition-all w-full border shadow-lg bg-white flex flex-col justify-center items-center mx-auto border-t-8 border-t-green-500 rounded-b-2xl mb-2`}>
                    <label className="text-xl my-2"><b>Input new File Name!!</b></label>
                    <input onChange={(e) => setNewName(e.target.value)} type="text" className="p-2 rounded-md w-full border" />
                    <button onClick={() => renameFile(file)} className="skeleton bg-red-500 w-full my-2 p-2 cursor-pointer text-white font-medium hover:bg-red-800 border-2 border-gray-700">OK</button>
                </div>
            </div>
        </div>
    );
}

export function FolderItem({ folder, files, folderView, handleFolderClick }) {
    return (
        <>
            <h2 onClick={() => handleFolderClick(folder)} className='cursor-pointer text-black font-bold p-2 rounded-lg mx-5 my-2 shadow-sm bg-gradient-to-bl from-yellow-500 to-yellow-300 border-l-2 border-t-2'>
                &#10066; {folder}
            </h2>
            <div className={`ml-5 transition-all duration-500 ease-in-out folder-content ${folderView === folder ? 'border-none' : 'border-none'} overflow-hidden`} style={{ maxHeight: folderView === folder ? 'fit-content' : '0px' }}>
                {files.map((file, idx) => (
                    <FileItem key={idx} file={file} openPreview={openPreview} downloadFile={downloadFile} setFileEditedName={setFileEditedName} deleteFile={deleteFile} setNewName={setNewName} renameFile={renameFile} />
                ))}
            </div>
        </>
    );
}
