import { useEffect, useRef, useState } from "react"; 
import Sidebar from "../components/Sidebar";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const [decodedToken, setDecodedToken] = useState(null);
    const [userId, setUserId] = useState("");

    const [image, setImage] = useState(null);
    const [profile, setProfile] = useState(null);

    const [info, setInfo] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");

        if (token === "" || token === null) {
            navigate("/");
        }
        setDecodedToken(jwtDecode(token));

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
                            localStorage.removeItem("token");
                            localStorage.removeItem("role");
                            navigate("/login");
                        }
                    });
                }
                const data = await res.json();
                setInfo(data);
                getUserProfile(data.id);
                setUserId(data.id)
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        getUserById();

        const getUserProfile = async (id) => {
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

                if (res.status === 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops... Session does Exits!!",
                        text: "Please Login!!!",
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            localStorage.removeItem("token");
                            localStorage.removeItem("role");
                            navigate("/login");
                        }
                    });
                } else if (res.ok) {
                    const blob = await res.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    setProfile(imageUrl);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
 
    }, [navigate, info.id]);

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");

        Swal.fire({
            title: "Logout successfully",
            text: "Bye Bye!!!",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
        });
        setTimeout(() => {
            navigate("/");
            window.location.reload();
        }, 1500);
    };

    const removeAccount = () => {
        Swal.fire({
          title: "Submit your username to remove account",
          input: "text",
          inputAttributes: {
            autocapitalize: "off"
          },
          showCancelButton: true,
          confirmButtonText: "Remove",
          showLoaderOnConfirm: true,
          preConfirm: async (username) => {
            if(username == localStorage.getItem("username")){
                try {
            
                    const response = await fetch(`http://localhost:8080/user/delete/${userId}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ` + localStorage.getItem("token"),
                        } 
                    });  
             
                } catch (error) {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                }
            } 
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Delete Account Successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 1000
            });
            setTimeout(() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              localStorage.removeItem("username");
              navigate("/");
            }, 1000);
          }
        });
    };
      

    const updateProfile = async (file, id) => {
        const formData = new FormData();
        formData.append("file", file);
  
        if (file === undefined || file === null) { 
            return alert("choose picture to Update profile !!")
        }  

        const res = await fetch(`http://localhost:8080/user/${id}/profile-image`, {
            method: "POST", 
            body: formData,
        });

        if (res.status === 401) {
            Swal.fire({
                icon: "error",
                title: "Oops... Session does Exits!!",
                text: "Please Login!!!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    navigate("/login");
                }
            });
        } else if (res.ok) {
            // console.log("Successfull Update Profile");

            Swal.fire({
                title: "Update Profile Successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 1000,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    };

    function convertToThaiDateTime(dateTimeString) {
        const thaiLocaleOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return new Date(dateTimeString).toLocaleString("th-TH", thaiLocaleOptions);
    }

    const formattedUserInfo = {
        id: info.id ? info.id : "N/A",
        username: info.username ? info.username : "N/A",
        password: info.password ? info.password : "N/A",
        birthdate: info.birthdate ? info.birthdate : "N/A",
        roles: info.roles ? info.roles : "N/A",
        address: info.address ? info.address : "N/A",
        age: info.age ? info.age : "N/A",
        firstName: info.firstName ? info.firstName : "N/A",
        lastName: info.lastName ? info.lastName : "N/A",
        nickname: info.nickname ? info.nickname : "N/A",
        gender: info.gender ? info.gender : "N/A",
        phoneNumber: info.phoneNumber ? info.phoneNumber : "N/A",
        email: info.email ? info.email : "N/A",
        github: info.github ? info.github : "N/A",
        profileImagePath: info.profileImagePath ? info.profileImagePath : "N/A",
        created_at: info.created_at ? info.created_at : "N/A",
        updated_at: info.updated_at ? info.updated_at : "N/A",
    };

    return (
        <div className="w-full overflow-hidden min-h-screen">
            <div className="flex flex-row bg-slate-200"> 
                <div>
                    <Sidebar />
                </div>
                <div className="flex flex-col w-[100%] p-0">
                    <div className="mx-auto flex flex-col justify-start items-center bg-white w-[100%] sm:w-[80%] lg:w-[50%] min-h-[100vh] relative">
                         
                        <div className="bg-red-500 w-full h-48 md:h-52 absolute top-0 left-0 z-0 overflow-hidden">
                            <img className="h-full w-full object-cover" src="../../..//Rc213V-93-44.jpg" alt="" />
                        </div>

                        <div className="w-full flex flex-col justify-center z-40 mt-20">
                            <div onClick={() => handleImageClick} className="w-full">
                                {image? (
                                    <img
                                        className="w-[200px] h-[200px] object-cover mx-auto border-4 border-black rounded-full "
                                        src={URL.createObjectURL(image)}
                                        alt=""
                                    />
                                ) : (
                                    <img
                                        className="w-[200px] h-[200px] object-cover mx-auto border-4 border-black rounded-full bg-white"
                                        src={profile || "../../..//profile-icon.png"}
                                        alt=""
                                    />
                                )}
                            </div>


                            <div className="flex justify-center items-center"> 
                            <input
                                type="file"
                                ref={inputRef}
                                onChange={handleImageChange}
                                className="file-input file-input-bordered file-input-xs bg-gray-100 border mx-auto"
                                />
                            <button
                                onClick={() => updateProfile(image, info.id)}
                                className="w-28 mx-auto px-2 py-2 bg-red-500 text-white font-bold text-xs rounded-xl hover:bg-red-800 cursor-pointer"
                                >
                                UPDATE PROFILE
                            </button>
                            </div>
                        </div>

                        <div className="px-5 sm:px-10 my-3 mx-auto gap-10 w-full flex flex-wrap mt-10">
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-bold">
                                    Username:{" "}
                                </label>
                                <input
                                    type="text"
                                    className="text-md px-2 border rounded-md max-w-32"
                                    value={formattedUserInfo.username}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">
                                    First Name:{" "}
                                </label>
                                <input
                                    type="text"
                                    className="text-md px-2 border rounded-md max-w-32"
                                    value={formattedUserInfo.firstName}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">
                                    Last Name:{" "}
                                </label>
                                <input
                                    type="text"
                                    className="text-md px-2 border rounded-md max-w-40"
                                    value={formattedUserInfo.lastName}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">
                                    Nickname:{" "}
                                </label>
                                <input
                                    type="text"
                                    className="text-md px-2 border rounded-md max-w-32"
                                    value={formattedUserInfo.nickname}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">
                                    Age:{" "}
                                </label>
                                <input
                                    type="text"
                                    className="text-md px-2 border rounded-md max-w-16"
                                    value={formattedUserInfo.age}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">
                                    Gender:{" "}
                                </label>
                                <input
                                    type="text"
                                    className="text-md px-2 border rounded-md max-w-20"
                                    value={formattedUserInfo.gender}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">
                                    Birthdate:{" "}
                                </label>
                                <input
                                    type="text"
                                    className="text-md px-2 border rounded-md max-w-32"
                                    value={formattedUserInfo.birthdate}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">
                                    Roles:{" "}
                                </label>
                                <input
                                    type="text"
                                    className="text-md px-2 border rounded-md max-w-20"
                                    value={formattedUserInfo.roles}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">
                                    Address:{" "}
                                </label>
                                <input
                                    type="text"
                                    className="text-md px-2 border rounded-md max-w-full"
                                    value={formattedUserInfo.address}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">
                                    Phone Number:{" "}
                                </label>
                                <input
                                    type="text"
                                    className="text-md px-2 border rounded-md"
                                    value={formattedUserInfo.phoneNumber}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">
                                    Email:{" "}
                                </label>
                                <input
                                    type="text"
                                    className="text-md px-2 border rounded-md min-w-fit"
                                    value={formattedUserInfo.email}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">
                                    Github:{" "}
                                </label>
                                <input
                                    type="text"
                                    className="text-md px-2 border rounded-md max-w-32"
                                    value={formattedUserInfo.github}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">
                                    Created At:{" "}
                                </label>
                                <p className="text-md px-2">
                                    {convertToThaiDateTime(formattedUserInfo.created_at)}
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-gray-600 font-medium">
                                    Updated At:{" "}
                                </label>
                                <p className="text-md px-2">
                                    {convertToThaiDateTime(formattedUserInfo.updated_at)}
                                </p>
                            </div>
                        </div>

                        <div className="w-full flex h-20 gap-10 justify-center">
                            <h1
                                to="/" 
                                onClick={removeAccount}
                                className={`text-white border-2 p-2 bg-black hover:bg-gray-800 my-5 w-[100px] text-center cursor-pointer`}
                            >
                                REMOVE ACCOUNT
                            </h1>
                            <Link
                                to="/"
                                onClick={logout}
                                className={`text-white border-2 p-2 bg-red-500 hover:bg-red-800 my-5 w-[100px] text-center cursor-pointer`}
                            >
                                LOGOUT
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
