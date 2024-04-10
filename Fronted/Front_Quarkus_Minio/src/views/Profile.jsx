import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom";

function Profile() { 
    const navigate = useNavigate();

    const [decodedToken,setDecodedToken] = useState(null) 

    const inputRef = useRef(null);
    const [image,setImage] = useState("");

    const [info,setInfo] = useState([]);
    const [profile,setProfile] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
    
        if (token === '' || token === null) {
            navigate('/');
        }
        setDecodedToken(jwtDecode(token));
        // http://localhost:8080/user/50/profile-image

        const getUserById = async () => {
            try {
                const res = await fetch(`http://localhost:8080/user/find/${username}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status === 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops... Session does Exits!!",
                        text: "Please Login!!!",  
                    }).then(async (result) => {
                        if (result.isConfirmed) {  
                            localStorage.removeItem("token")
                            localStorage.removeItem("role")
                            navigate('/login');
                        }
                    });
                }
                const data = await res.json(); 
                setInfo(data);
     
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const getUserProfile = async () => {
            try {
                const res = await fetch(`http://localhost:8080/user/${info.id}/profile-image`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status === 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops... Session does Exits!!",
                        text: "Please Login!!!",  
                    }).then(async (result) => {
                        if (result.isConfirmed) {  
                            localStorage.removeItem("token")
                            localStorage.removeItem("role")
                            navigate('/login');
                        }
                    });
                }
                const data = await res.json(); 
                setProfile(data);
                // setProfile("http://localhost:8080/user/${info.id}/profile-image");
     
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
    
        getUserById();
        getUserProfile();
    }, []);
    

    const handleImageClick = () => {
        inputRef.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]; 
        setImage(event.target.files[0]);
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

    function convertToThaiDateTime(dateTimeString) {
        const thaiLocaleOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateTimeString).toLocaleString('th-TH', thaiLocaleOptions);
    }

    const formattedUserInfo = {
        id: info.id ? info.id : 'N/A',
        username: info.username ? info.username : 'N/A',
        password: info.password ? info.password : 'N/A',
        birthdate: info.birthdate ? info.birthdate : 'N/A',
        roles: info.roles ? info.roles : 'N/A',
        address: info.address ? info.address : 'N/A',
        age: info.age ? info.age : 'N/A',
        firstName: info.firstName ? info.firstName : 'N/A',
        lastName: info.lastName ? info.lastName : 'N/A',
        nickname: info.nickname ? info.nickname : 'N/A',
        gender: info.gender ? info.gender : 'N/A',
        phoneNumber: info.phoneNumber ? info.phoneNumber : 'N/A',
        email: info.email ? info.email : 'N/A',
        github: info.github ? info.github : 'N/A',
        profileImagePath: info.profileImagePath ? info.profileImagePath : 'N/A',
        created_at: info.created_at ? info.created_at : 'N/A',
        updated_at: info.updated_at ? info.updated_at : 'N/A'
    };

    return (
        <div className="w-full overflow-hidden"> 
            <Navbar/>
            <div className="flex flex-row bg-slate-200 min-h-[100vh]">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-[100%] min-h-[100vh]"> 
                    <div className="mx-auto flex flex-col justify-start items-center bg-white w-[100%] sm:w-[60%] md:w-[50%] min-h-[100vh]">
                        <h1 className="text-2xl my-5 font-medium text-center border-b-2">Profile</h1>


                        <div onClick={handleImageClick}>
                            
                            {image ? <img className="w-[200px] h-[200px] object-cover mx-auto border-4 border-black rounded-full" src={URL.createObjectURL(image)} alt="" />  : <img className="w-[200px] h-[200px] object-contain mx-auto border-4 border-black rounded-full" src={`http://localhost:8080/user/${info.id}/profile-image`} alt="" /> }
                            <input type="file" ref={inputRef} onChange={handleImageChange} className="file-input file-input-bordered my-5 bg-gray-100 border "/>
                        </div>


                        <div className="px-5 sm:px-10 my-3 mx-auto gap-10 w-full flex flex-wrap">
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-bold">Username: </label>
                                <input type="text" className="text-md px-2 border rounded-md max-w-32" value={formattedUserInfo.username}/>
                            </div> 
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">First Name: </label> 
                                <input type="text" className="text-md px-2 border rounded-md max-w-32" value={formattedUserInfo.firstName}/>
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">Last Name: </label> 
                                <input type="text" className="text-md px-2 border rounded-md max-w-40" value={formattedUserInfo.lastName}/>
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">Nickname: </label>
                                <input type="text" className="text-md px-2 border rounded-md max-w-32" value={formattedUserInfo.nickname}/> 
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">Age: </label>
                                <input type="text" className="text-md px-2 border rounded-md max-w-16" value={formattedUserInfo.age}/>  
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">Gender: </label>
                                <input type="text" className="text-md px-2 border rounded-md max-w-20" value={formattedUserInfo.gender}/>  
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">Birthdate: </label>
                                <input type="text" className="text-md px-2 border rounded-md max-w-32" value={formattedUserInfo.birthdate}/>  
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">Roles: </label>
                                <input type="text" className="text-md px-2 border rounded-md max-w-20" value={formattedUserInfo.roles}/>   
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">Address: </label>
                                <input type="text" className="text-md px-2 border rounded-md" value={formattedUserInfo.address}/>    
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">Phone Number: </label>
                                <input type="text" className="text-md px-2 border rounded-md max-w-28" value={formattedUserInfo.phoneNumber}/>    
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">Email: </label>
                                <input type="text" className="text-md px-2 border rounded-md max-w-96" value={formattedUserInfo.email}/>   
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">Github: </label>
                                <input type="text" className="text-md px-2 border rounded-md max-w-32" value={formattedUserInfo.github}/>    
                            </div> 
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">Created At: </label>
                                <p className="text-md px-2" >{convertToThaiDateTime(formattedUserInfo.created_at)}</p> 
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">Updated At: </label>
                                <p className="text-md px-2" >{convertToThaiDateTime(formattedUserInfo.updated_at)}</p> 
                            </div>
                        </div>


                        <Link to="/" onClick={logout} className={`text-white border-2 p-2 bg-red-500 hover:bg-red-800 my-5 w-[100px] text-center`}>LOGOUT</Link> 
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;