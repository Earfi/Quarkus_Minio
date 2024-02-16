import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [allBuckets,setAllBuckets] = useState([]);
    const [searchValue,setSearchValue] = useState("");  
    const [filteredBuckets, setFilteredBuckets] = useState([]); // เพิ่ม state เพื่อเก็บ bucket ที่ถูกค้นหา

    const [openBar,setOpenBar] = useState(false);
    const [search,setSearch] = useState(false);

    useEffect(() => { 
        const getAllBacket = async () => {
            const res = await fetch("http://localhost:8080/minio/all/bucket")
            const data = await res.json()
            setAllBuckets(data)
            setFilteredBuckets(data); // เริ่มต้นให้ filteredBuckets เป็น allBuckets เมื่อโหลดข้อมูลครั้งแรก
        }  
        getAllBacket() 
    },[]) 

    useEffect(() => {
        // หา bucket ที่ตรงกับค่าที่ค้นหาแล้วเก็บใน filteredBuckets
        const filtered = allBuckets.filter(bucket => bucket.includes(searchValue));
        setFilteredBuckets(filtered);
    }, [searchValue, allBuckets]);

    const goLink = () => {
        setSearch(!search);
        setTimeout(() => {
            window.location.reload();
        }, 700);
    }
    return (
        <div>
            <div className="w-full h-20 bg-blue-950 text-xl font-medium text-white flex justify-between items-center fixed z-50"> 
                <Link to="/" className="hidden md:block ml-10 text-sm md:ml-30 border py-2 px-2 rounded-full">Minio With Quarkus</Link>
                <div className="hidden lg:flex p-5 text-sm sm:text-md md:text-xl gap-7 cursor-pointer items-center">
                    <Link to="/" className="hover:text-orange-400">HOME</Link> 
                    <Link to="/bucket" className="hover:text-orange-400">BUCKET &#9778;</Link> 
                    <Link to="/jasper" className="hover:text-orange-400">JASPER &#8464;</Link> 
                    <Link to="/about" className="hover:text-orange-400">ABOUT &#8471;</Link> 
                    <Link to="/service" className="hover:text-orange-400">SERVICE &#9743;</Link>  
                </div>
                <input 
                    onClick={() => setSearch(!search)}  
                    type="text" 
                    className="p-1 rounded-md text-black mx-5" 
                    name="search" 
                    placeholder="Search Bucket" 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)} 
                />
                <div className="hidden xl:flex p-5 text-sm sm:text-xl gap-5 cursor-pointer items-center"> 
                    <Link to="/profile"><h1 className="hover:text-orange-400 text-sm sm:text-xl ">Profile</h1></Link>
                    <h1 className="text-5xl">&#9996;</h1>
                </div>
                <h1 onClick={() => setOpenBar(!openBar)} className="block lg:hidden mr-10 text-2xl cursor-pointer hover:text-red-500">&#9776;</h1>
                
                <div className={`block  absolute ${openBar ? 'right-0' : 'right-[-100%]'} w-[250px] bg-gray-800 h-[90vh] top-20 py-5 transition-all border-4 border-black`}>
                    <div className="flex flex-col justify-center items-center gap-6">
                        <Link to="/" className="hover:text-orange-400 border-b-2">HOME</Link> 
                        <Link to="/bucket" className="hover:text-orange-400 border-b-2">BUCKET &#9778;</Link> 
                        <Link to="/jasper" className="hover:text-orange-400 border-b-2">JASPER &#8464;</Link> 
                        <Link to="/about" className="hover:text-orange-400 border-b-2">ABOUT &#8471;</Link> 
                        <Link to="/service" className="hover:text-orange-400 border-b-2">SERVICE &#9743;</Link>  
                    </div>
                </div>
            </div>
            <div className={`absolute top-20 ${search ? 'h-full' : 'h-0'} w-full bg-gray-200 transition-all duration-500 overflow-hidden z-50 flex justify-center`}>
                <div className="max-w-screen-lg w-full p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredBuckets.map((bucket) => (
                            <Link to={`/file/${bucket}`} onClick={() => goLink()} key={bucket} className="w-full h-20">
                                <div className="w-full h-full bg-white rounded-lg shadow-md flex justify-center items-center hover:bg-gray-300">
                                    <h1 className="text-xl font-bold text-center">{bucket}</h1>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar;
