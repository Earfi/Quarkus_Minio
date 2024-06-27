import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddBucket from './AddBucket';
import Swal from 'sweetalert2';
import Footer from '../../Footer';

function ListBuckets() {
    const [buckets, setBuckets] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem("token"));

        const getBucket = async () => {
            try {
                const res = await fetch(`http://localhost:8080/minio/all/bucket`, {
                    method: "GET"
                });
                const data = await res.json();
                setBuckets(data);
            } catch (error) {
                console.error("Error fetching buckets:", error);
            }
        };
        getBucket();
    }, []);

    function fetchFile() {
        const getFileFromBucket = async () => {
            const res = await fetch(`http://localhost:8080/minio/all/bucket`);
            const data = await res.json();
            setBuckets(data);
        };

        getFileFromBucket();
    }

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

    const convertDate = (dateString) => {
        const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' });
        const dateObj = new Date(dateString);
        return formatter.format(dateObj);
    };

    return (
        <div className='container mx-auto bg-white w-full sm:w-[450px] md:w-[550px] lg:w-[650px] xl:w-[800px] px-4 py-5 mt-10 min-h-screen border border-gray-300 shadow-lg rounded-lg'>
            {token && (
                <div className='mb-4'>
                    <AddBucket />
                </div>
            )}
            <h1 className='text-2xl font-bold border-b-2 border-gray-300 pb-3 mb-5 text-center'>
                ALL <span className="text-purple-600">Bucket ({buckets.length})</span>
            </h1>
            <div className='flex flex-col bg-white w-full'>
                <div className="flex justify-between my-5 mx-4 font-semibold text-lg bg-gray-800 text-white py-3 px-5 rounded">
                    <h1 className="w-[200px] text-sm">Bucket Name</h1>
                    {/* <h1 className="hidden lg:block w-[300px] text-sm">Creation Date</h1> */}
                </div>
                <div className="flex flex-col justify-between pb-5">
                    {buckets.length > 0 ? (
                        buckets.map((bucket, index) => (
                            <div key={index} className="flex flex-col mb-4">
                                <div className="border-b border-gray-200 p-2">
                                    <Link to={`/file/${bucket}`}>
                                        <div className="flex flex-col lg:flex-row items-start lg:justify-between lg:items-center my-2 mx-4 font-mono bg-gray-100 py-3 px-5 rounded-lg hover:bg-gray-200">
                                            <p className="w-full lg:w-[200px] text-sm">
                                                &#9778; <span className="font-bold">{bucket}</span>
                                            </p>
                                            {/* <p className="hidden lg:block w-[300px] text-sm">{convertDate(bucket.creationDate)}</p> */}
                                        </div>
                                    </Link>
                                    {token && (
                                        <div className="flex gap-3 justify-end my-2 mx-4">
                                            <button 
                                                onClick={() => deleteBucket(bucket)} 
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='m-5 bg-red-500 text-white font-mono border-l-4 border-red-700 p-3 rounded'>
                            No Buckets!!!
                        </p>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ListBuckets;

