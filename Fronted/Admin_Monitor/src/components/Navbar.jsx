import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const [token, setToken] = useState(null);
  const [id, setId] = useState(window.location.pathname);
  const [profile, setProfile] = useState("");
 


  useEffect(() => {
    const token = localStorage.getItem("token");

    const getUserProfile = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/user/${id}/profile-image`,
          {
            method: "GET", 
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
              localStorage.removeItem("username");
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

  return (
    <div className="z-50 relative h-12 flex flex-col border-b border-gray-300 overflow-hidden">
      <div className="w-full flex justify-around items-center h-full bg-white">
        <Link
          to="/home"
          className="block ml-10 text-xs md:ml-30 border py-2 px-2 w-36 text-center rounded-full"
        >
          Minio With Quarkus
        </Link>

        <div className="flex items-center">
          <Link to="/login">
            <h1
              className={`${
                token == null ? "block" : "hidden"
              } hover:text-orange-400 text-sm mx-5`}
            >
              LOG IN
            </h1>
          </Link>
          {!profile || profile == null ? (
            <Link to="/profile">
              <img
                className={`${
                  token == null ? "hidden" : "block"
                } hover:text-orange-400 text-xs mr-10 h-10 w-10 object-cover bg-white rounded-full`}
                src="../../..//profile-icon.png"
                alt="Profile"
              />
            </Link>
          ) : (
            <Link to="/profile">
              <img
                className={`${
                  token == null ? "hidden" : "block"
                } hover:text-orange-400 text-xs mr-10 h-10 w-10 object-cover bg-white rounded-full`}
                src={profile}
                alt="Profile"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;