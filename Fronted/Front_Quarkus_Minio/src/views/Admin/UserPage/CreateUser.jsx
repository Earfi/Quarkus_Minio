import { useState } from "react";
import Swal from 'sweetalert2'

function CreateUser() {
    const [create,setCreate] = useState(false); 

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        birthdate: '',
        roles: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const createUser = async () => {
        try {
            const res = await fetch(`http://localhost:8080/user/add`, {
                method: "POST",
                body: JSON.stringify(formData), // แปลงข้อมูลใน state เป็น JSON ก่อนส่ง
                headers: {
                    'Content-Type': 'application/json', // ต้องระบุ Content-Type เป็น application/json
                    'Authorization': `Bearer ` + localStorage.getItem("token")
                },
            });

            console.log(formData);
            console.log(res);

            if (res.ok) {
                console.log(res);
                Swal.fire({
                    title: "Create User successfully",
                    text: "Please Check your User!!!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                });
                setCreate(false)
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            } else if (res.status == 400) {
                console.log(res);
                Swal.fire({
                    icon: "error",
                    title: "Oops... Username already exists",
                    text: "Error Create User!!! Please Check your User!!", 
                }); 
            }else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error Create User!!!",
                });
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "ระบบมีปัญหา!!!",
            });
        }
    };

    return(
        <div>
            <button onClick={() => setCreate(!create)} className="border rounded-xl p-2 bg-red-500 text-white font-bold cursor-pointer">Create User</button>
            {/* {create == true && ( */}
                <div className="overflow-hidden">
                    <div className={`absolute ${create == true ? 'top-0':'top-[-100%]'} left-0 transition-all top-0 w-full h-full backdrop-blur-3xl flex justify-center items-center`}>
                        <div >
                            <h1 onClick={() => setCreate(!create)} className="text-white text-right cursor-pointer absolute top-5 right-5 hover:bg-red-500" >&#10006;</h1>
                            <div className="w-[500px] mx-auto m-4 bg-white p-8 rounded-md shadow-md">
                                <h2 className="text-xl font-semibold mb-4">Create User</h2>
                                <div>
                                    <div className="mb-4">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
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
                                            value={formData.password}
                                            onChange={handleChange}
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
                                            value={formData.birthdate}
                                            onChange={handleChange}
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
                                            value={formData.roles}
                                            onChange={handleChange}
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                        >
                                            <option value="Editor">Select Role</option>
                                            <option value="User">User</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div>
                                        <button onClick={createUser}
                                            type="submit"
                                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                        >
                                            create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* )} */}
        </div>
        
    )
}

export default CreateUser;