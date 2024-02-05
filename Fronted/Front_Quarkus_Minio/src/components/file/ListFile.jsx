import { useEffect, useState } from 'react'

function Information({bucket}) { 

    const [posts,setPosts] = useState([]);

    useEffect(() => { 
        const getFileFromBucket = async () => {
        const res = await fetch(`http://localhost:8080/minio/file/all/${bucket}`)
        const data = await res.json()
        setPosts(data)
        }
 
        getFileFromBucket()
    },[])

    const deleteFile = async (file) => { 
        try {
            const res = await fetch(`http://localhost:8080/minio/file/delete/${bucket}/${file}`,{
                method: "DELETE",
                headers: {
                    'X-HTTP-Method-Override': 'DELETE', 
                },
            });

            if (res.ok) {
                alert("Delete File successfully"); 
                window.location.reload();
            } else {
                alert("Error Delete file!!!"); 
            } 
        } catch (error) {
            alert("Error Delete file!!!"); 
        }
    };   

    return (
        <>
            <div className='bg-slate-100 w-full px-10 py-5 mt-20 '>
                <h1 className='text-xl font-bold border-b-2'>Bucket : <span className='text-red-500'>${bucket}</span></h1>
                {posts.length == 0 &&
                    (
                    <>
                        <p className='m-5 bg-red-500 text-white font-mono border-l-red-500 border p-2'>No File !!!</p>
                    </>
                    )
                }
                {posts.map((post) => (
                    <div className='flex flex-col items-center justify-center border p-5'>
                        <div className='flex flex-col md:flex-row justify-center items-start'>
                            <p className='w-[250px] bg-white border-l-red-500 border p-2 cursor-pointer hover:bg-gray-400' key={post.id}>{post}</p>
                            <div className='flex flex-row gap-3 mt-2 md:mt-0 sm:ml-2'>
                                <button className='bg-purple-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-purple-800'>PREVIEW</button>
                                <button className='bg-blue-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-blue-800'>DOWNLOAD</button>
                                <button onClick={() => deleteFile(post)} className='bg-red-500 text-white px-2 py-1 font-mono rounded-lg hover:bg-red-800'>DELETE</button>
                            </div> 
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Information;