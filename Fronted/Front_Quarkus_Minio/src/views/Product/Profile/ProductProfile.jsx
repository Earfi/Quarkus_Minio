import Sidebar from "../../../components/Sidebar"; 
import { useEffect, useState } from "react"; 
import { jwtDecode } from "jwt-decode";
import FirstPage from "./Page/FirstPage";
import SecondPage from "./Page/SecondPage";
import ThirdPage from "./Page/ThirdPage";
import { Link, useNavigate } from "react-router-dom";

const ProductProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState("");
    const [token, setToken] = useState(null);  
    const [id, setId] = useState(null);
    const [catagory,setCatagory] = useState("first");
    const [menu,setMenu] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        const getUserProfile = async () => {
          try {
            const res = await fetch(
              `http://localhost:8080/user/${id}/profile-image`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ` + localStorage.getItem("token"),
                },
              }
            ); 
            if (res.ok) {
              const blob = await res.blob();
              const imageUrl = URL.createObjectURL(blob);
              setProfile(imageUrl);
            } else if(res.status == 401) {
              Swal.fire({
                  icon: "error",
                  title: "Oops... Session does Exits!!",
                  text: "Please Login!!!",  
              }).then(async (result) => {
                  if (result.isConfirmed) {  
                      localStorage.removeItem("token")
                      localStorage.removeItem("role")
                      window.location.reload();
                      // navigate('/login');
                  }
              });
            } 
          } catch (error) {
            console.error("Error fetching user data:", error);
            Swal.fire({
              icon: "error",
              title: "Oops... Session does Exits!!",
              text: "Please Login!!!",  
          }).then(async (result) => {
              if (result.isConfirmed) {  
                  localStorage.removeItem("token")
                  localStorage.removeItem("role")
                  window.location.reload();
                  // navigate('/login');
              }
          });
          }
        };

        if (token) {
            getUserProfile();
        }
      
        if (token) {
        const decodedToken = jwtDecode(token);
        setId(decodedToken.userId);
        }
      
        setToken(localStorage.getItem("token")); 
           
    }, [id]);

    return(
        <div className="w-full overflow-hidden min-h-[90vh]">       
            <div className="flex flex-row mt-20">
                <div className="absolute">
                    {/* <Sidebar/>   */}
                </div>
                <div className="flex flex-col w-[100%] min-h-[100vh]">
                    <div className="w-full h-full bg-white"> 
                        <div className="boorder w-full h-full"> 
                            <div className="md:w-[70%] min-h-[90vh] mx-auto relative border">  
                                <p className='rotate-180 text-3xl cursor-pointer float-start absolute top-5 left-2 z-40' onClick={() => navigate(-1)}>&#10145;</p>
                                {/* profile */}  
                                <div className="border-b-2 h-64 border-black">
                                    <div className="w-full h-40 md:h-44 relative top-0 left-0 z-0 overflow-hidden">
                                        <img className="h-full w-full object-cover absolute" src="../../..//Rc213V-93-44.jpg" alt="" />
                                    </div>
                                    <div onClick={() => setMenu(!menu)} className="absolute top-3 right-5 text-3xl text-black hover:text-gray-500 cursor-pointer">
                                        <h1>&#10010;</h1>
                                    </div>
                                    {menu == true && 
                                        ( 
                                            <ul className="absolute top-12 right-5 w-32 backdrop-blur-3xl flex flex-col gap-5 p-5 z-50 border rounded-xl overflow-hidden">
                                                <li className="text-white font-bold cursor-pointer hover:text-red-200">รายละเอียด</li>
                                                <li className="text-white font-bold cursor-pointer hover:text-red-200">ร้องเรียน</li>  
                                            </ul> 
                                        )
                                    } 
                                    <div className="w-full absolute top-20 left-12 z-0 overflow-hidden">
                                        {!profile ? (
                                            <div>
                                                <Link to="/products/profile">
                                                <img
                                                    className={`${
                                                        token == null ? "hidden" : "block"
                                                    } hover:text-orange-400 text-xs sm:text-sm mr-10 h-32 w-32 object-cover bg-white rounded-full`}
                                                    src="../../..//profile-icon.png"
                                                    alt=""
                                                    />
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="flex items-end gap-0">
                                                <div className="flex flex-col items-start">
                                                    <Link to="/products/profile">
                                                        <img
                                                            className={`${
                                                                token == null ? "hidden" : "block"
                                                            } hover:text-orange-400 text-xs sm:text-sm mr-10 h-32 w-32 object-cover bg-white rounded-full`}
                                                            src={profile}
                                                            alt=""
                                                            />
                                                    </Link>
                                                    <h1 className="text-xl font-bold">Earf</h1>
                                                </div>
                                                <div>
                                                    <ul className="flex gap-5 text-xs">
                                                        <li className="bg-white px-2 py-1 border-2 border-black hover:bg-gray-100 cursor-pointer">ติดตาม</li>
                                                        <li className="bg-white px-2 py-1 border-2 border-black hover:bg-gray-100 cursor-pointer">chat</li>
                                                    </ul>
                                                </div> 
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* mode content */}

                                <div className="w-full h-full border-b-2 border-black">
                                    <nav className="w-full h-6 bg-black text-white">
                                        <ul className="w-full flex h-full justify-around text-sm">
                                            <li className={`${catagory == "first" ? 'bg-orange-600' : 'bg-white text-black'} cursor-pointer h-full w-[33%] text-center`} onClick={() => setCatagory("first")}>หน้าแรก</li>
                                            <li className={`${catagory == "second" ? 'bg-orange-600' : 'bg-white text-black'} cursor-pointer h-full w-[33%] text-center`} onClick={() => setCatagory("second")}>สินค้าทั้งหมด</li>
                                            <li className={`${catagory == "third" ? 'bg-orange-600' : 'bg-white text-black'} cursor-pointer h-full w-[33%] text-center`} onClick={() => setCatagory("third")}>หมวดหมู่</li>
                                        </ul>
                                    </nav>
                                </div>

                                {/* content */} 

                                <div className="w-[95%] h-fit min-h-[50vh] my-2 mx-auto border p-2"> 
                                    { catagory === "first" ? (
                                        <>
                                            <FirstPage/>
                                        </>
                                    ) : catagory === "second" ? (
                                        <>
                                            <SecondPage/>
                                        </>
                                    ) : (
                                        <>
                                            <ThirdPage/>
                                        </>
                                    )} 
                                </div>

                            </div>


                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductProfile