import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; 

function Information({ bucket }) {
    const [token, setToken] = useState(null);
    const [files, setFiles] = useState([]);
    const [editBtn, setEditBtn] = useState(false);
    const [filesEditName, setFilesEditName] = useState("");
    const [newName, setNewName] = useState("");
    const [tags, setTags] = useState([{ key: "", value: "" }]);
    const [newTag, setNewTag] = useState("");
    const [deleteTagKey, setDeleteTagKey] = useState("");
    const [editMode, setEditMode] = useState("");
    const [link, setLink] = useState("");
    const [folderView, setFolderView] = useState(null);
    const [showFiles, setShowFiles] = useState(true);
    const [showFolders, setShowFolders] = useState(true);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        setToken(localStorage.getItem("token"));

        const getFileFromBucket = async () => {
            const res = await fetch(`http://localhost:8080/minio/file/all/${bucket}`);
            const data = await res.json();
            setFiles(data);
        };

        getFileFromBucket();
    }, [bucket]);

    const groupFilesByFolders = (files) => {
        return files.reduce((folders, file) => {
            const filePathParts = file.fileName.split('/');
            let currentFolder = folders;
    
            for (let i = 0; i < filePathParts.length - 1; i++) {
                const folderName = filePathParts[i];
    
                if (!currentFolder[folderName]) {
                    currentFolder[folderName] = {};
                }
    
                currentFolder = currentFolder[folderName];
            }
    
            const fileName = filePathParts[filePathParts.length - 1];
    
            if (!currentFolder[fileName]) {
                currentFolder[fileName] = [];
            }
    
            currentFolder[fileName].push(file);
            return folders;
        }, {});
    };

    const groupFilesByFolder = (files) => {
        // groupFilesByFolders(files)
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
            // console.log(folders);
            return folders;
        }, {});
    };
    
    const groupedFiles = groupFilesByFolder(files);

    const openPreview = (url) => {
        setLink(url);
        document.getElementById('my_modal_2').showModal();
    };

    const handleFolderClick = (folder) => {
        setFolderView(folderView === folder ? null : folder);
    };

    const handleEditModeChange = (mode) => {
        setEditMode(mode);
    };

    const setFileEditedName = (file) => {
        setFilesEditName(file);
        setEditBtn(!editBtn);
    };

    const handleAddTagToInput = () => {
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
    
    const handleDeleteTagToInput = (index) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
    };

    const handleTagValueChange = (index, key, value) => {
        const newTags = tags.map((tag, i) => {
            if (i === index) {
                return { ...tag, key, value };
            }
            return tag;
        });
        setTags(newTags);
    };

    // -----------------------------------
    // -----------------------------------
    // ---------- Call Backend------------
    // -----------------------------------
    // -----------------------------------
    
    // Can not edit file name in folder
    const handleRenameFile = async () => {
        
        if (newName == "" || newName == undefined || newName == null || newName == "/") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Input New File Name !!!",
                showConfirmButton: false,
                timer: 1000
            });
            return
        }

        // const typeFile = filesEditName.slice(-3);
        // console.log(typeFile);

        const parts = filesEditName.split(".");
        const typeFile = parts.pop();
  
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

        // console.log("oldName : " + filesEditName);
        // console.log("newName : " + newNameValue);

        const formData = new FormData();
        formData.append("bucket", bucket);
        formData.append("oldName", filesEditName);
        formData.append("newName", newNameValue);

        // console.log(newNameValue);

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

    const handleAddTag = async (fileName) => {
        const formData = new FormData();

        const filteredTags = tags.filter(tag => tag.key && tag.value);

        formData.append("bucket", bucket);
        formData.append("fileName", fileName);
        formData.append("tags", JSON.stringify(filteredTags.length > 0 ? filteredTags : []));

        const res = await fetch(`http://localhost:8080/minio/tags`, {
            method: "POST",
            body: formData,
            headers: { 
                'Authorization': `Bearer ` + localStorage.getItem("token")
            },
        }); 
    
        if (res.ok) {
            Swal.fire({
                title: "Add Tags Successfully !!",
                text: "Please Check your File Tags !!",
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
                text: "Error Add Tags !!",
                showConfirmButton: false,  
                timer: 1000
            });
        }
    };

    const handleDeleteTag = async (fileName,key) => {
        const formData = new FormData();
        formData.append("bucket", bucket);
        formData.append("fileName", fileName);
        formData.append("key", key);

        const res = await fetch(`http://localhost:8080/minio/tags`, {
            method: "DELETE",
            body: formData,
            headers: { 
                'Authorization': `Bearer ` + localStorage.getItem("token")
            },
        }); 
    
        if (res.ok) {
            Swal.fire({
                title: "Remove Tags Successfully !!",
                text: "Please Check your File Tags !!",
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
                text: "Error Remove Tags !!",
                showConfirmButton: false,  
                timer: 1000
            });
        }
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
                    const formData = new FormData();
                    formData.append("fileName", fileName);
                    formData.append("bucket", bucket);
    
                    const res = await fetch(`http://localhost:8080/minio/file/delete`, {
                        method: "DELETE",
                        body: formData,
                        headers: {
                            'X-HTTP-Method-Override': 'DELETE',
                            'Authorization': `Bearer ${localStorage.getItem("token")}`
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
                            text: "Failed to delete file!!!",
                            timer: 1000
                        });
                    }
                }
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to delete file!!!",
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

    const previewPdf = async () => {
        window.open(link)
    }

    return (
        <>
            <div className=' bg-white w-full lg:w-[650px] xl:w-[800px] py-5 shadow-lg'>
                <div className='w-full bg-white'>
                    <h1 className='text-xl font-bold border-b-2 p-2 ml-10'>Bucket: <span className='text-red-500'>{bucket}</span></h1>
                </div>
                <div className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setShowFiles(!showFiles)} 
                            className={`w-fit md:w-auto px-4 py-2 rounded-lg text-xs ${showFiles ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            {showFiles ? 'Hide Files' : 'Show Files'}
                        </button>
                        <button 
                            onClick={() => setShowFolders(!showFolders)} 
                            className={`w-fit md:w-auto px-4 py-2 rounded-lg text-xs ${showFolders ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            {showFolders ? 'Hide Folders' : 'Show Folders'}
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="px-4 py-1 w-full md:w-64 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                {files.length === 0 && (
                    <p className='m-5 bg-red-500 text-white font-mono border-l-red-500 border p-2'>No File !!!</p>
                )}
                {Object.keys(groupedFiles)
                    .sort((a, b) => a === "" ? -1 : 0)
                    .map((folder, idx) => (
                        <div key={idx}>
                            {folder === "" && showFiles && (
                                <div className='w-full'>
                                    {(groupedFiles[folder] || []).filter(file => Array.isArray(groupedFiles[folder]) && file.fileName.toLowerCase().includes(searchInput.toLowerCase()))
                                        .map((file, idx) => (
                                            <div key={idx} className='flex flex-col items-center justify-center border p-5 w-full'>
                                            <div className='w-full flex flex-col justify-end items-start gap-5'>
                                                <div className="flex flex-col sm:flex-row sm:justify-between transition-all duration-200 w-full mx-auto overflow-hidden bg-white p-2 border-black border rounded-xl">
                                                    <p className='break-words text-xs'><b>Name : </b>{file.fileName}</p>
                                                    <p className='text-xs'><b>Size : </b>{convertBytes(file.fileSize)}</p>
                                                    <p className='text-xs'><b>Last Modified : </b>{convertDate(file.creationDate)}</p>

                                                    <dialog id="my_modal_2" className="modal">
                                                        <div className="modal-box">
                                                            {(link.includes("jpg") || link.includes("png")) && (
                                                                <img src={link} width="1000" height="600" alt="preview" />
                                                            )}
                                                            {(link.includes("pdf") || link.includes("xlsx")) && (
                                                                <button onClick={() => previewPdf} className='btn bg-red-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-red-800 w-full'>Open New Tab</button>
                                                            )}
                                                        </div>
                                                        <form method="dialog" className="modal-backdrop">
                                                            <button>close</button>
                                                        </form>
                                                    </dialog>
                                                </div>
                                                {file.tags.length > 0 && (
                                                    <div className="tags flex items-center gap-2 flex-wrap">
                                                        <strong className='text-sm'>Tags:</strong>
                                                        <ul className="flex justify-start items-center gap-3 flex-wrap">
                                                            {file.tags.map((tag, index) => (
                                                            <li className='bg-gray-800 px-2 py-1 rounded-md text-xs font-bold text-white' key={index}>{tag}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                <div className='flex flex-row flex-wrap gap-3 mt-2 md:mt-0 sm:ml-2 w-full justify-center sm:justify-end'>
                                                    <button onClick={() => openPreview(file.url)} className='btn-sm bg-purple-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-purple-800 text-xs'>PREVIEW</button>
                                                    <button onClick={() => downloadFile(file.fileName)} className='btn-sm bg-blue-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-blue-800 text-xs'>Download</button>
                                                    <button onClick={() => setFileEditedName(file.fileName)} className={`${token == null ? 'hidden' : 'block'} btn-sm bg-gray-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-gray-800 text-xs`}>Edit</button>
                                                    <button onClick={() => deleteFile(file.fileName)} className={`${token == null ? 'hidden' : 'block'} btn-sm bg-red-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-red-800 text-xs`}>DELETE</button>
                                                </div>
                                                <div className={`${editBtn && filesEditName === file.fileName ? 'block' : 'hidden'} w-full overflow-hidden transition-all flex flex-col justify-end duration-300`}>
                                                    <div className="relative border border-gray-300 p-4 rounded-md mb-4">
                                                        <h3 className="mb-2">Select Options to Edit!</h3>
                                                        <button className="mr-2 bg-pink-600 hover:bg-pink-900 text-white text-xs font-bold py-1 px-2 rounded" onClick={() => handleEditModeChange("rename")}>Rename File</button>
                                                        <button className="mr-2 bg-purple-600 hover:bg-purple-900 text-white text-xs font-bold py-1 px-2 rounded" onClick={() => handleEditModeChange("addTag")}>Add Tag</button>
                                                        <button className="bg-red-600 hover:bg-red-900 text-white text-xs font-bold py-1 px-2 rounded" onClick={() => handleEditModeChange("deleteTag")}>Delete Tag</button>
                                                        <h1
                                                            className="text-white text-right cursor-pointer absolute right-2 top-0"
                                                            onClick={() => setFileEditedName(null)}
                                                            >
                                                            &#10006;
                                                        </h1>
                                                    </div>
                                                    <div>
                                                        {editMode === "rename" && (
                                                            <div className="mb-4">
                                                            <label className='text-sm font-medium text-gray-700'>Rename Tag</label> 
                                                                <input
                                                                    type="text"
                                                                    placeholder="New File Name"
                                                                    value={newName}
                                                                    onChange={(e) => setNewName(e.target.value)}
                                                                    className="border border-gray-300 p-2 rounded-md w-full text-xs"
                                                                />
                                                                <button onClick={handleRenameFile} className="mt-2 bg-pink-600 hover:bg-pink-900 text-white text-xs font-bold py-1 px-2 rounded">Rename</button>
                                                            </div>
                                                        )}
                                                        {editMode === "addTag" && (
                                                            <div className="mb-4">
                                                                <label className='text-sm font-medium text-gray-700'>Add Tag</label> 
                                                                {tags.map((tag, index) => (
                                                                    <div key={index} className='flex gap-2 mb-2'>
                                                                        <input 
                                                                            type="text" 
                                                                            value={tag.key} 
                                                                            onChange={(e) => handleTagValueChange(index, e.target.value, tag.value)} 
                                                                            placeholder="Key no ( $ _ \ / < > * )" 
                                                                            className="p-2 border rounded text-xs w-1/2" 
                                                                        />
                                                                        <input 
                                                                            type="text" 
                                                                            value={tag.value} 
                                                                            onChange={(e) => handleTagValueChange(index, tag.key, e.target.value)} 
                                                                            placeholder="Value no ( $ _ \ / < > * )" 
                                                                            className="p-2 border rounded text-xs w-1/2" 
                                                                        />
                                                                        <button onClick={() => handleDeleteTagToInput(index)} className="text-red-500 hover:text-red-700">x</button>
                                                                    </div>
                                                                ))}
                                                                <button onClick={handleAddTagToInput} className="mt-2 bg-slate-500 hover:bg-gray-300 ml-2 text-white text-xs font-bold py-1 px-2 rounded border">Add More Tags</button>
                                                                <button onClick={() => handleAddTag(file.fileName)} className="mt-2 bg-purple-500 hover:bg-purple-700 ml-2 text-white text-xs font-bold py-1 px-2 rounded">Add Tag</button>
                                                            </div>
                                                        )}
                                                        {editMode === "deleteTag" && (
                                                            <div className="mb-4">
                                                            <label className='text-sm font-medium text-gray-700'>Delete Tag</label> 
                                                                <input
                                                                    type="text"
                                                                    placeholder="Tag to Delete (Input Key)"
                                                                    value={deleteTagKey}
                                                                    onChange={(e) => setDeleteTagKey(e.target.value)}
                                                                    className="border border-gray-300 p-2 rounded-md w-full text-xs"
                                                                />
                                                                <button onClick={() => handleDeleteTag(file.fileName,deleteTagKey)} className="mt-2 bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded">Delete Tag</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {folder !== "" && folder != null && showFolders && (
                            <>
                                <h2 
                                    onClick={() => handleFolderClick(folder)} 
                                    className={`cursor-pointer text-black font-bold p-3 mx-5 my-1 shadow-md bg-gradient-to-r rounded-lg flex items-center transition-transform duration-200 transform text-xs border ${folderView === folder ? 'from-yellow-800 to-yellow-800 border-l-4 border-yellow-700 text-white translate-x-1' : 'from-amber-200 to-amber-200 border-l-4 border-yellow-600'}`}
                                >
                                    <div className='flex justify-between w-full'>
                                        <div className="flex gap-2">
                                            <img src="../../public/folder-icon.png" width="20"/>
                                            <p> {folder}</p>
                                        </div>
                                        <span className='material-icons mr-2'>
                                            {folderView === folder ? 'open' : 'close '}
                                        </span>
                                    </div>
                                </h2>
                                <div className={`ml-5 transition-all duration-500 ease-in-out folder-content ${folderView == folder ? 'border-none' : 'border-none'} overflow-hidden`} style={{ maxHeight: folderView === folder ? 'fit-content' : '0px' }}>
                                    {(groupedFiles[folder] || [])
                                        .filter(file => file.fileName.toLowerCase().includes(searchInput.toLowerCase()))
                                        .map((file, idx) => (
                                            <div key={idx} className='flex flex-col items-center justify-center border p-5 w-full bg-white'>
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
                                                                {(link.includes("pdf") || link.includes("xlsx")) && (
                                                                    <button onClick={() => previewPdf} className='btn bg-red-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-red-800 w-full'>Open New Tab</button>
                                                                )}
                                                            </div>
                                                            <form method="dialog" className="modal-backdrop">
                                                                <button>close</button>
                                                            </form>
                                                        </dialog>
                                                    </div>
                                                    {file.tags.length > 0 && (
                                                        <div className="tags flex items-center gap-2 flex-wrap">
                                                            <strong className='text-sm'>Tags:</strong>
                                                            <ul className="flex justify-start items-center gap-3 flex-wrap">
                                                                {file.tags.map((tag, index) => (
                                                                <li className='bg-gray-800 px-2 py-1 rounded-md text-xs font-bold text-white' key={index}>{tag}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    <div className='flex flex-row flex-wrap gap-3 mt-2 md:mt-0 sm:ml-2 w-full justify-center sm:justify-end'>
                                                        <button onClick={() => openPreview(file.url)} className='btn-sm bg-purple-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-purple-800 text-xs'>PREVIEW</button>
                                                        <button onClick={() => downloadFile(file.fileName)} className='btn-sm bg-blue-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-blue-800 text-xs'>Download</button>
                                                        <button onClick={() => setFileEditedName(file.fileName)} className={`${token == null ? 'hidden' : 'block'} btn-sm bg-gray-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-gray-800 text-xs`}>Edit</button>
                                                        <button onClick={() => deleteFile(file.fileName)} className={`${token == null ? 'hidden' : 'block'} btn-sm bg-red-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-red-800 text-xs`}>DELETE</button>
                                                    </div>
                                                    <div className={`${editBtn && filesEditName === file.fileName ? 'block' : 'hidden'} w-full overflow-hidden transition-all flex flex-col justify-end duration-300`}>
                                                        <div className="relative border border-gray-300 p-4 rounded-md mb-4">
                                                            <h3 className="mb-2">Select Options to Edit!</h3>
                                                            <button className="mr-2 bg-pink-600 hover:bg-pink-900 text-white text-xs font-bold py-1 px-2 rounded" onClick={() => handleEditModeChange("rename")}>Rename File</button>
                                                            <button className="mr-2 bg-purple-600 hover:bg-purple-900 text-white text-xs font-bold py-1 px-2 rounded" onClick={() => handleEditModeChange("addTag")}>Add Tag</button>
                                                            <button className="bg-red-600 hover:bg-red-900 text-white text-xs font-bold py-1 px-2 rounded" onClick={() => handleEditModeChange("deleteTag")}>Delete Tag</button>
                                                            <h1
                                                                className="text-white text-right cursor-pointer absolute right-2 top-0"
                                                                onClick={() => setFileEditedName(null)}
                                                                >
                                                                &#10006;
                                                            </h1>
                                                        </div>
                                                        <div>
                                                            {editMode === "rename" && (
                                                                <div className="mb-4">
                                                                <label className='text-sm font-medium text-gray-700'>Rename Tag</label> 
                                                                    <input
                                                                        type="text"
                                                                        placeholder="New File Name"
                                                                        value={newName}
                                                                        onChange={(e) => setNewName(e.target.value)}
                                                                        className="border border-gray-300 p-2 rounded-md w-full text-xs"
                                                                    />
                                                                    <button onClick={handleRenameFile} className="mt-2 bg-pink-600 hover:bg-pink-900 text-white text-xs font-bold py-1 px-2 rounded">Rename</button>
                                                                </div>
                                                            )}
                                                            {editMode === "addTag" && (
                                                                <div className="mb-4">
                                                                    <label className='text-sm font-medium text-gray-700'>Add Tag</label> 
                                                                    {tags.map((tag, index) => (
                                                                        <div key={index} className='flex gap-2 mb-2'>
                                                                            <input 
                                                                                type="text" 
                                                                                value={tag.key} 
                                                                                onChange={(e) => handleTagValueChange(index, e.target.value, tag.value)} 
                                                                                placeholder="Key no ( $ _ \ / < > * )" 
                                                                                className="p-2 border rounded text-xs w-1/2" 
                                                                            />
                                                                            <input 
                                                                                type="text" 
                                                                                value={tag.value} 
                                                                                onChange={(e) => handleTagValueChange(index, tag.key, e.target.value)} 
                                                                                placeholder="Value no ( $ _ \ / < > * )" 
                                                                                className="p-2 border rounded text-xs w-1/2" 
                                                                            />
                                                                            <button onClick={() => handleDeleteTagToInput(index)} className="text-red-500 hover:text-red-700">x</button>
                                                                        </div>
                                                                    ))}
                                                                    <button onClick={handleAddTagToInput} className="mt-2 bg-slate-500 hover:bg-gray-300 ml-2 text-white text-xs font-bold py-1 px-2 rounded border">Add More Tags</button>
                                                                    <button onClick={() => handleAddTag(file.fileName)} className="mt-2 bg-purple-500 hover:bg-purple-700 ml-2 text-white text-xs font-bold py-1 px-2 rounded">Add Tag</button>
                                                                </div>
                                                            )}
                                                            {editMode === "deleteTag" && (
                                                                <div className="mb-4">
                                                                <label className='text-sm font-medium text-gray-700'>Delete Tag</label> 
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Tag to Delete (Input Key)"
                                                                        value={deleteTagKey}
                                                                        onChange={(e) => setDeleteTagKey(e.target.value)}
                                                                        className="border border-gray-300 p-2 rounded-md w-full text-xs"
                                                                    />
                                                                    <button onClick={() => handleDeleteTag(file.fileName,deleteTagKey)} className="mt-2 bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded">Delete Tag</button>
                                                                </div>
                                                            )}
                                                        </div>
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
    );
}

export default Information;
