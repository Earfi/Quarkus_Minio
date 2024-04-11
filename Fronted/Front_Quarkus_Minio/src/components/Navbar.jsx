import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 

function Navbar() {
    const navigate = useNavigate();
    const [allBuckets,setAllBuckets] = useState([]);
    const [searchValue,setSearchValue] = useState("");  
    const [filteredBuckets, setFilteredBuckets] = useState([]); // เพิ่ม state เพื่อเก็บ bucket ที่ถูกค้นหา

    const [openBar,setOpenBar] = useState(false);
    const [search,setSearch] = useState(false);

    const [token,setToken] = useState(null);
    
    const [path,setPath] = useState(window.location.pathname);

    const [id,setId] = useState(window.location.pathname);
    
    const [profile, setProfile] = useState("");

    useEffect(() => { 
        const token = localStorage.getItem("token") 
        
        const getUserProfile = async () => {  
            try { 
                const res = await fetch(`http://localhost:8080/user/${id}/profile-image`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem("token"),
                    },
                });
                if(res.ok){
                    const blob = await res.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    setProfile(imageUrl);

                }

            } catch (error) {
                console.error("Error fetching user data:", error);
            } 
        };

        if (token) {
            getUserProfile();
        }


        if (token) {   
            const decodedToken = jwtDecode(token); 
            setId(decodedToken.userId);
          }

        setToken(localStorage.getItem("token"))

        const getAllBacket = async () => {
            const res = await fetch("http://localhost:8080/minio/all/bucket")
            const data = await res.json()
            setAllBuckets(data)
            setFilteredBuckets(data); // เริ่มต้นให้ filteredBuckets เป็น allBuckets เมื่อโหลดข้อมูลครั้งแรก
        }  
        getAllBacket() 

    },[id]) 

    useEffect(() => { 
        const filtered = allBuckets.filter(bucket => bucket.includes(searchValue));
        setFilteredBuckets(filtered);
    }, [searchValue, allBuckets]);

    const goLink = () => {
        setSearch(!search);
        setTimeout(() => {
            window.location.reload();
        }, 700);
 
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("username")

        Swal.fire({
            title: "Logout successfully",
            text: "Bye Bye!!!",
            icon: "success",
            showConfirmButton: false, 
            timer: 1000
        });
        setTimeout(() => {
            navigate('/');
            window.location.reload()
        }, 1500); 
    }

    
    return (
        <div className="z-50 relative h-20">
            <div className="w-full h-20 bg-gradient-to-l from-blue-600 to-blue-950 text-xl font-medium text-white flex justify-between sm:justify-around items-center fixed "> 
                <Link to="/" className="block ml-10 text-xs md:ml-30 border py-2 px-2 rounded-full">Minio With Quarkus</Link>
                <div className="hidden xl:flex p-5 text-xs sm:text-sm md:text-xl gap-7 cursor-pointer items-center">
                    <Link to="/" className="hover:text-orange-400">HOME</Link> 
                    <Link to="/bucket" className="hover:text-orange-400">BUCKET</Link> 
                    <Link to="/jasper" className="hover:text-orange-400">JASPER</Link> 
                    <Link to="/products" className="hover:text-orange-400">PRODUCTS</Link>  
                    <Link to="/about" className="hover:text-orange-400">ABOUT</Link> 
                    <Link to="/service" className="hover:text-orange-400">SERVICE</Link>  
                    {/* <Link to="/" onClick={logout} className={`${token == null ? 'hidden' : 'block'} hover:text-orange-400 border-b-2`}>LOGOUT</Link>  */}
                </div>
                <div className="flex justify-center gap-2 items-center">
                    <div className={` ${path.includes("products") ? 'hidden' : 'block'} flex flex-row relative overflow-hidden`}>
                        <input 
                            onClick={() => setSearch(true)}  
                            type="text" 
                            className="hidden sm:block p-1 rounded-md text-black mx-5 w-36 sm:w-fit" 
                            name="search" 
                            placeholder="Search Bucket" 
                            value={searchValue} 
                            onChange={(e) => setSearchValue(e.target.value)} 
                        /> 
                    </div>
                    <Link to="/login"><h1 className={`${token == null ? 'block' : 'hidden'} hover:text-orange-400 text-xl sm:text-sm mx-5`}>LOG IN</h1></Link>
                    {/* <Link to="/profile"><img src="../..//profile-icon.png" className={`${token == null ? 'hidden' : 'block'} hover:text-orange-400 text-xs sm:text-sm mr-10 max-w-12 object-contain bg-white rounded-full`}></img></Link> */}
                    <Link to="/profile"><img className={`${token == null ? 'hidden' : 'block'} hover:text-orange-400 text-xs sm:text-sm mr-10 max-w-12 object-contain bg-white rounded-full`} src={profile} alt="" /></Link>
                    <h1 onClick={() => setOpenBar(!openBar)} className="block xl:hidden text-4xl cursor-pointer hover:text-red-500 mr-5">&#9776;</h1>
                </div>
                
                <div className={`block xl:hidden absolute ${openBar ? 'right-0' : 'right-[-100%]'} w-[250px] bg-gray-800 h-[90vh] top-20 py-5 transition-all border-4 border-black`}>
                    <div className="flex flex-col justify-center items-center gap-6">
                        <input 
                            onClick={() => setSearch(true)}  
                            type="text" 
                            className={`${path.includes("products") ? 'hidden' : 'block'} p-1 rounded-md text-black mx-8 w-52`} 
                            name="search" 
                            placeholder="Search Bucket" 
                            value={searchValue} 
                            onChange={(e) => setSearchValue(e.target.value)} 
                        />
                        <Link to="/" className="hover:text-orange-400 border-b-2">HOME</Link> 
                        <Link to="/bucket" className="hover:text-orange-400 border-b-2">BUCKET &#9778;</Link> 
                        <Link to="/jasper" className="hover:text-orange-400 border-b-2">JASPER &#8464;</Link> 
                        <Link to="/about" className="hover:text-orange-400 border-b-2">ABOUT &#8471;</Link> 
                        <Link to="/service" className="hover:text-orange-400 border-b-2">SERVICE &#9743;</Link> 
                        <Link to="/products" className="hover:text-orange-400 border-b-2">PRODUCTS</Link> 
                        <Link to="/" onClick={logout} className={`${token == null ? 'hidden' : 'block'} absolute bottom-10 hover:text-orange-400 border-b-2`}>LOGOUT</Link> 
                    </div>
                </div>
            </div>
            <div className={`fixed top-20 ${search ? 'h-full' : 'h-0'} w-full bg-blue-200  transition-all duration-500 overflow-hidden z-50 flex justify-center `}>
                <div className="max-w-screen-lg w-full p-4 backdrop-blur-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
                        <h1 className="text-white text-right cursor-pointer absolute right-2" onClick={() => setSearch(!search)}>&#10006;</h1>
                        {filteredBuckets.map((bucket) => (
                            <Link to={`/file/${bucket}`} onClick={() => goLink()} key={bucket} className="w-full h-20 mt-10">
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
