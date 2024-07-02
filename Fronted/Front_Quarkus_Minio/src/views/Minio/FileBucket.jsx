import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Sidebar from '../../components/Sidebar';
import ListFile from '../../components/minio/file/ListFile';
import UploadFile from '../../components/minio/file/UploadFile';
import AddBucket from '../../components/minio/bucket/AddBucket';

const FileBucket = () => {
    const [buckets, setBuckets] = useState([]);
    const [filteredBuckets, setFilteredBuckets] = useState([]);
    const [token, setToken] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const [selectedBucket,setSelectedBucket] = useState("");

    function fetchFile() {
        const getFileFromBucket = async () => {
            const res = await fetch(`http://localhost:8080/minio/all/bucket`);
            const data = await res.json();
            setBuckets(data);
        };

        getFileFromBucket();
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"));

        const getBucket = async () => {
            try {
                const res = await fetch(`http://localhost:8080/minio/all/bucket`, {
                    method: "GET"
                });
                const data = await res.json();
                setBuckets(data);
                setFilteredBuckets(data);
                setSelectedBucket(data[0])
            } catch (error) {
                console.error("Error fetching buckets:", error);
            }
        };
        getBucket();
    }, []);

    useEffect(() => {
        const filtered = buckets.filter(bucket => bucket.toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredBuckets(filtered);
    }, [searchValue, buckets]);

    const deleteBucket = async (bucket) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You want to delete the bucket!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                const res = await fetch(`http://localhost:8080/minio/${bucket}/delete`, {
                    method: "DELETE",
                    headers: {
                        'X-HTTP-Method-Override': 'DELETE',
                        'Authorization': `Bearer ` + localStorage.getItem("token")
                    },
                });

                if (res.ok) {
                    Swal.fire({
                        title: "Delete bucket successfully",
                        text: "Please Check your bucket!!!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1000
                    });

                    fetchFile();
                    setSelectedBucket("");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Error Deleting the bucket, Check Files In Bucket!!!",
                    });
                }
            }
        } catch (error) {
            console.error("Error Deleting the bucket:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error Deleting the bucket, Check Files In Bucket!!!",
            });
        }
    };

    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100">
                <div className="container mx-auto p-5 bg-white">
                    <div className='w-full flex justify-between items-center mb-6'>
                        <div>
                            <h1 className="text-3xl font-bold">Buckets ({filteredBuckets.length})</h1>
                        </div>
                        <div className={`${token ? 'block' : 'hidden'}`}>
                            <AddBucket />
                        </div>
                    </div>
                    <div className="mb-4 flex gap-2 items-center justify-between">
                        <p className='font-semibold'>Total Buckets: <span className='text-red-500 font-bold text-xl'>{filteredBuckets.length}</span></p>
                        <input
                            type="text"
                            className="p-2 border sm:w-96 rounded"
                            placeholder="Search Buckets..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>

                    <hr className='border border-gray-400 mb-5'/>

                    {/* all bucket */}
                    {filteredBuckets.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredBuckets.map((bucket, index) => (
                                <div onClick={(e) => setSelectedBucket(bucket)} key={index} className={`shadow-md rounded-lg p-4 cursor-pointer border-2 border-black ${selectedBucket === bucket ? 'bg-blue-800 text-white' : 'bg-white'}`}>
                                    {/* <Link to={`/file/${bucket}`}> */}
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-semibold">&#9778; {bucket}</p>
                                        </div>
                                    {/* </Link> */}
                                    {token && (
                                        <div className="flex justify-end mt-4">
                                            <button 
                                                onClick={() => deleteBucket(bucket)} 
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='mt-5 bg-red-500 text-white font-mono border-l-4 border-red-700 p-3 rounded'>
                            No Buckets!!!
                        </p>
                    )}
                </div>

                {/* all file */}
                <div className="container mx-auto p-5 bg-white">
                    <div className={`${token ? 'block' : 'hidden'}`}>
                        <UploadFile/>
                    </div>
                    <ListFile bucket={selectedBucket} />
                </div>
            </div>
        </div>
    )
}

export default FileBucket;
