import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Swal from 'sweetalert2';
import { useParams, useNavigate } from "react-router-dom";

function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    
    const [username, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [birthDate, setBirthDate] = useState(null); 
    const [roles, setRole] = useState(null); 

    useEffect(() => {   
        const getUserById = async () => { 
            const res = await fetch(`http://localhost:8080/user/${id}`, {
                method: "GET",
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });  
            const data = await res.json();
            console.log(data); 
            setUserName(data.username);
            setPassword(data.password);
            setBirthDate(data.birthdate);
            setRole(data.roles);
 
        };
 
        getUserById();
    }, [id]);

    const editUser = async () => {
        try{ 
            const requestData = { 
                "username" : username,
                "password" : password,
                "birthDate" : birthDate,
                "roles" : roles
            };

            const res = await fetch(`http://localhost:8080/user/update/${id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ` + localStorage.getItem("token")
                },
                body: JSON.stringify(requestData),
            })
            console.log(res);
            if (res.status == 200) { 
                Swal.fire({
                    title: "Update User successfully",
                    text: "Please Check your Data!!!",
                    icon: "success",
                    showConfirmButton: false, 
                    timer: 1000
                  });
                setTimeout(() => {
                    // window.location.reload()
                }, 1500); 
            } else if (!res.ok){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error Update User!!!", 
                }); 
            }
        } catch(error) {
            alert("Error Update User!! :", error);
        }
    }

    return (
        <div className="w-full h-[100vh] flex min-w-[1300px] overflow-hidden">
            <div className="w-[15%] h-full shadow-2xl">
                <Sidebar/>
            </div>

            <div className="w-[85%] h-full overflow-hidden ">
                <h1 onClick={() => navigate(-1)} className="m-5 text-4xl text-white md:text-black md:-left-20 cursor-pointer hover:text-red-500 z-0">&#10094;</h1>
                <div>
                    <div > 
                        <div className="w-[500px] h-[600px] mx-auto m-4 bg-white p-8 rounded-md shadow-2xl border">
                            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                                        Birthdate
                                    </label>
                                    <input
                                        type="date"
                                        id="birthdate"
                                        name="birthdate" 
                                        value={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="roles" className="block text-sm font-medium text-gray-700">
                                        Roles
                                    </label>
                                    <select
                                        id="roles"
                                        name="roles" 
                                        value={roles}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    >
                                        <option value="Editor">Select Role</option>
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <button  onClick={editUser}
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                    >
                                        EDIT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
