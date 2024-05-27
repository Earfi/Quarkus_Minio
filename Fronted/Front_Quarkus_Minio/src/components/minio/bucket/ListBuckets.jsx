import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddBucket from './AddBucket';
import Swal from 'sweetalert2';

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

                    setTimeout(() => {
                        window.location.reload();
                    }, 1200);
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
        <div className='mx-auto bg-white w-full sm:w-[450px] md:w-[550px] lg:w-[650px] xl:w-[800px] px-1 py-5 mt-0 min-h-screen border border-black shadow-xl'>
            <div className={`${token == null ? 'hidden' : 'block'}`}>
                <AddBucket />
            </div>
            <h1 className='text-xl font-bold border-b-2 border-black pb-2 mt-3'>ALL : <span className="text-purple-600">Bucket &#9778;</span></h1>
            <div className='flex flex-col my-2 bg-white w-full '>
                <div className="flex justify-between my-5 mx-10 font-bold text-lg bg-black text-white py-2 px-5">
                    <h1 className="w-[200px] text-sm">Bucket Name</h1>
                    <h1 className="hidden lg:block w-[300px] text-sm">Creation Date</h1>
                </div>
                <div className="flex flex-col justify-between pb-5">
                    {buckets.length > 0 ? (
                        <>
                            {buckets.map((bucket) => (
                                <div key={bucket} className="flex flex-col" >
                                    <div className="border-b-4 border-gray-300 p-2">
                                        <Link to={`/file/${bucket}`}>
                                            <div className="flex flex-col lg:flex-row items-start lg:justify-between lg:items-center my-2 mx-10 font-mono bg-gray-100 py-2 px-5 border-b-2 cursor-pointer hover:bg-gray-200 text-md h-fit">
                                                <p className="w-[100px] md:w-[200px] text-sm">&#9778; <b className="font-extrabold">{bucket}</b></p>
                                                {/* <p className="w-[300px] text-sm">{convertDate(bucket.creationDate)}</p> */}
                                            </div>
                                        </Link>
                                        <div className={`flex gap-5 justify-end my-2 mx-10 ${token == null ? 'hidden' : 'block'}`}>
                                            <button onClick={() => deleteBucket(bucket)} className="bg-red-500 w-[100px] text-white px-2 py-1 hover:bg-red-800 text-xs">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <p className='m-5 bg-red-500 text-white font-mono border-l-red-500 border p-2'>No Buckets!!!</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListBuckets;

