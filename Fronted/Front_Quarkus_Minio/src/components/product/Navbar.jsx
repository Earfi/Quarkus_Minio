import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

function Navbar() {
    const [openBar, setOpenBar] = useState(false); 
    const [profile, setProfile] = useState("");

    const [token, setToken] = useState(null);  
    const [id, setId] = useState(null);

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
                  navigate('/login');
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

    return (
        <div className="fixed w-full h-20 top-0 left-0 right-0 z-50">
            <nav className="bg-white w-full h-full text-black shadow-lg relative overflow-x-clip">
                <div className="flex items-center justify-around w-full h-full">

                    <h1
                        onClick={() => setOpenBar(!openBar)}
                        className="block lg:hidden text-3xl cursor-pointer hover:text-red-500 mr-5"
                    >
                        &#9776;
                    </h1>   

                    <div className="hidden lg:block">
                        <ul className="flex gap-10 items-center">
                            <Link to="/products"><li className="cursor-pointer hover:text-red-500">HOME</li></Link>
                            <Link to="/products"><li className="cursor-pointer hover:text-red-500">PAGE</li></Link>
                            <Link to="/products/catagoryPage"><li className="cursor-pointer hover:text-red-500">CATEGORY</li></Link>
                            <Link to="/products/service"><li className="cursor-pointer hover:text-red-500">SERVICE</li> </Link>
                        </ul>
                    </div>

                    <div className="flex flex-row sm:gap-9 items-center">
                        <div className="flex items-center">
                            <input type="text" placeholder="Search" className="w-48 md:w-64 px-4 py-2 mr-2 rounded-md bg-white border focus:outline-none" /> 
                        </div>
                        
                        <div className="flex justify-center items-center gap-8">
                            <div className={`${
                                    token == null ? "hidden" : "block"
                                    }`}>
                                <Link to="/products/cart" className="relative hover:text-red-500">
                                    <span>Cart</span>
                                    <span className="absolute top-[-10px] right-[-20px] bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
                                </Link>
                            </div> 
                            <div className={`${
                                    token == null ? "block" : "hidden"
                                    }`}>
                                <Link to="/login" className="relative hover:text-red-500">
                                    <span>Login</span> 
                                </Link>
                                
                            </div> 
                            {!profile ? (
                                <div>
                                    <Link to="/products/profile">
                                    <img
                                        className={`${
                                        token == null ? "hidden" : "block"
                                        } hover:text-orange-400 text-xs sm:text-sm mr-10 h-12 w-12 object-cover bg-white rounded-full`}
                                        src="../../..//profile-icon.png"
                                        alt=""
                                    />
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <Link to="/products/profile">
                                    <img
                                        className={`${
                                        token == null ? "hidden" : "block"
                                        } hover:text-orange-400 text-xs sm:text-sm mr-10 h-12 w-12 object-cover bg-white rounded-full`}
                                        src={profile}
                                        alt=""
                                    />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    

                </div>
                <div
                className={`
                    ${openBar ? "right-0" : "right-[-100%]"}  absolute
                    block w-[250px] bg-white text-black h-[90vh] top-20 py-5 transition-all shadow-2xl border-2 border-black`}
                > 
                    <ul className="flex flex-col gap-10 items-center">
                            <Link to="/products"><li className="cursor-pointer hover:text-red-500">HOME</li></Link>
                            <Link to="/products"><li className="cursor-pointer hover:text-red-500">POPULAR</li></Link>
                            <Link to="/products/catagoryPage"><li className="cursor-pointer hover:text-red-500">CATEGORY</li></Link>
                            <Link to="/products/service"><li className="cursor-pointer hover:text-red-500">SERVICE</li> </Link>
                    </ul> 
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
