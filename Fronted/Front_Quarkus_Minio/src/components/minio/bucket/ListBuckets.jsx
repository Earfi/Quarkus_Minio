import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddBucket from './AddBucket';
import Swal from 'sweetalert2'

function ListBuckets() {  
    const [buckets, setBuckets] = useState([]);
    const [editBtn, setEditBtn] = useState(false);
    const [bucketEditName, setBucketEditName] = useState("");
    const [newName, setNewName] = useState("");
    const [token,setToken] = useState(null);

    useEffect(() => { 

        setToken(localStorage.getItem("token"))

        const getBucket = async () => {
            try {
                const res = await fetch(`http://localhost:8080/minio/all/bucket`, {
                    method: "GET"
                });
                const data = await res.json();
                setBuckets(data); 
                // console.log(data);
            } catch (error) {
                console.error("Error fetching buckets:", error);
            }
        };  
        getBucket();
    }, []);

    const deleteBucket = async (bucket) => { 
        try {

            Swal.fire({
                title: "Are you sure?",
                text: "You wan't to delete bucket!!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then(async (result) => {
                if (result.isConfirmed) {  
                  await deleteBucket(bucket);
                }
              });
               
            async function deleteBucket(bucket) {
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
                        icon: "success" ,
                        showConfirmButton: false, 
                        timer: 1000
                    });
                    
                    setTimeout(() => {
                        window.location.reload()
                    }, 1200); 
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Error Delete bucket!!!, Check File In Bucket!!!", 
                    }); 
                } 
            } 

            
        } catch (error) {
            alert("Error Delete bucket!!!"); 
        }
    };    

    const setBucketEditedName = (bucket) => {
        setBucketEditName(bucket);
        setEditBtn(!editBtn);
    }; 

    const convertDate = (dateString) => { 
        const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' });
        const dateObj = new Date(dateString);
        return formatter.format(dateObj);
    };

    return ( 
        <div className='mx-auto bg-gray-300 w-full sm:w-[450px] md:w-[550px] lg:w-[650px] xl:w-[800px] px-1 py-5 mt-0 h-fit border border-black shadow-xl'>
            <div className={`${token == null ? 'hidden' : 'block'}`}> 
                <AddBucket/> 
            </div>
            <h1 className='text-xl font-bold border-b-2 border-black pb-2 mt-3'>ALL : <span className="text-purple-600">Bucket &#9778;</span></h1>
            <div className='flex flex-col my-2 border-2 border-gray-600 bg-white w-full '>
                <div className="flex justify-between my-5 mx-10 border-b-gray-900 font-bold text-lg bg-black text-white py-2 px-5">
                    <h1 className="w-[200px]">Bucket Name</h1>
                    <h1 className="hidden lg:block w-[300px]">Creation Date</h1>
                </div>
                <div className="flex flex-col justify-between border pb-5">
                    {buckets.map((bucket) => (
                       <div className="flex flex-col"  >
                            <div className="border-b-4 border-gray-300 p-2">
                                <Link to={`/file/${bucket}`}>
                                    <div className="flex flex-col lg:flex-row items-start lg:justify-between lg:items-center my-2 mx-10 font-mono bg-gray-100 py-2 px-5 border-b-2 cursor-pointer hover:bg-gray-200 text-md h-fit lg:h-20">
                                        {/* <p className="w-[100px] md:w-[200px]">&#9778; <b className="font-extrabold">{bucket.name}</b></p> */}
                                        {/* <p className="w-[300px]">{  convertDate(bucket.creationDate)}</p> */}
                                        <p className="w-[100px] md:w-[200px]">&#9778; <b className="font-extrabold">{bucket}</b></p>
                                    </div>
                                </Link>
                                <div className={`flex justify-center gap-5 md:justify-end md:mr-20 my-2 ${token == null ? 'hidden' : 'block'}`}> 
                                    <button onClick={() => deleteBucket(bucket)}  className="bg-red-500 w-[100px] text-white px-2 py-1 hover:bg-red-800">Delete</button>
                                    {/* <button onClick={() => setBucketEditedName(bucket)} className="bg-purple-500 w-[100px] text-white px-2 py-1 hover:bg-purple-800">Edit</button> */}
                                </div>
                                <div className={`${(token == null || token.value == undefined) ? 'hidden' : 'block'} ${editBtn === true && bucketEditName === bucket ? 'h-40 p-2' : 'h-0'} overflow-hidden transition-all w-full border shadow-lg bg-white flex flex-col justify-center items-center mx-auto border-t-8 border-t-green-500 rounded-b-2xl`}>
                                    <label className="text-xl my-2">Input new Bucket Name!!</label>
                                    <input onChange={(e) => setNewName(e.target.value)} type="text" className="p-2 rounded-md w-full border" />
                                    <button className="bg-red-500 w-full my-2 p-2 cursor-pointer text-white font-medium hover:bg-red-800 border-2 border-gray-700">OK</button>
                                </div>
                            </div>
                       </div>
                    ))}
                    {buckets.length === 0 && (
                        <p className='m-5 bg-red-500 text-white font-mono border-l-red-500 border p-2'>No Buckets!!!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListBuckets;
