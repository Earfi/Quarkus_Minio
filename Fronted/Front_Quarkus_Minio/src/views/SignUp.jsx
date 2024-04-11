import React, { useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Swal from 'sweetalert2' 
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
 
    const [profile, setProfile] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 

    const addUser = async (userData) => { 
        if(confirmPassword !== userData.password){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error Password not Match !!!", 
            }); 
            return;
        }
        const fileProfile = new FormData(); 
        fileProfile.append('file', profile);

        try {
          const response = await fetch('http://localhost:8080/user/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData,fileProfile)
          });
      
          if (!response.ok) {
            Swal.fire({
                icon: "error",
                title: "Oops...!!",
                text: "Please SignUp!!!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("role")
                    navigate('/login');
                }
            });
          }
       
          Swal.fire({
            title: "Register Successfully", 
            icon: "Success Please SignIn",
            showConfirmButton: false,
            timer: 1000
            });
            setTimeout(() => { 
                navigate('/login');
            }, 1500); 

        } catch (error) {
          console.error('Error adding user:', error.message); 
        }
    };

    const updateProfile = async (file, id) => {
        const formData = new FormData(); 
        formData.append('file', file);

        const res = await fetch(`http://localhost:8080/user/${id}/profile-image`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem("token"),
                    },
                    body: formData
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
                } else if(res.ok){  
                    Swal.fire({
                        title: "Update Profile Successfully", 
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    setTimeout(() => { 
                        window.location.reload()
                    }, 1500);
                }
    };
 
    const [formData, setFormData] = useState({
        username: '',
        password: '', 
        birthdate: '',
        roles: 'User',
        profileImagePath: null,
        firstName: '',
        lastName: '',
        nickname: '', 
        age: '',
        gender: '',
        phoneNumber: '',
        email: '',
        address: '',
        github: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();  
        addUser(formData)
    };
 
    const handleImageClick = () => {
        inputRef.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setProfile(event.target.files[0]);
    }

    return (
        <div>
            <Navbar/> 
            <div className="w-full bg-gray-100 min-h-[100vh] flex justify-center">
                <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
                    <Link to="/login" className='text-red cursor-pointer bg-fuchsia-500 rounded-md font-medium text-white hover:bg-fuchsia-400 hover:text-red-800 border p-2'>Sign In</Link>
                    <h2 className="text-xl font-bold my-4">Registration Form</h2>
                    <form onSubmit={handleSubmit} className='mt-5'>
                        <div onClick={() => handleImageClick} className='w-full flex flex-col justify-center'> 
                            {profile ? <img className="w-[200px] h-[200px] object-cover mx-auto border-4 border-black rounded-full" src={URL.createObjectURL(profile)} alt="" />  : <img className="w-[200px] h-[200px] object-cover mx-auto border-4 border-black rounded-full" src={profile} alt="" /> }
                            <input type="file" ref={inputRef} onChange={handleImageChange} className="w-60 mx-auto file-input file-input-bordered my-5 text-xs bg-gray-100 border "/>
                        </div>

                        {/* ------------------------------------------------- */}
                        {/* ------------------------------------------------- */}
                        {/* ------------------- DATA TEXT  ------------------ */}
                        {/* ------------------------------------------------- */}
                        {/* ------------------------------------------------- */}

                        <div className='grid grid-cols-2 gap-4 mb-5'>
                            <div className="col-span-2">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username <span className='text-red-500 font-bold'>*</span></label>
                                <input type="text" name="username" id="username" className="border h-10 mt-1 p-2 block w-full border-gray-300 rounded-md" onChange={handleChange} maxLength={20} required/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password <span className='text-red-500 font-bold'>*</span></label>
                                <input type="password" name="password" id="password" className="border h-10 mt-1 p-2 block w-full border-gray-300 rounded-md" onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password <span className='text-red-500 font-bold'>*</span></label>
                                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} name="confirm_password" id="confirm_password" className="border h-10 mt-1 p-2 block w-full border-gray-300 rounded-md" />
                            </div>
                        </div>
                        <h1 className='w-full text-md font-bold text-red-500'>**</h1>
                        <hr/>
                        <div className="grid grid-cols-2 gap-4 mt-5">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name <span className='text-red-500 font-bold'>*</span></label>
                                <input type="text" name="firstName" id="firstName" className="border h-10 mt-1 p-2 block w-full border-gray-300 rounded-md" onChange={handleChange} required/>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name <span className='text-red-500 font-bold'>*</span></label>
                                <input type="text" name="lastName" id="lastName" className="border h-10 mt-1 p-2 block w-full border-gray-300 rounded-md" onChange={handleChange} required/>
                            </div>
                            <div>
                                <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">Nickname <span className='text-red-500 font-bold'>*</span></label>
                                <input type="text" name="nickname" id="nickname" className="border h-10 mt-1 p-2 block w-full border-gray-300 rounded-md" onChange={handleChange} required/>
                            </div>
                            <div>
                                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">Birthdate <span className='text-red-500 font-bold'>*</span></label>
                                <input type="date" name="birthdate" id="birthdate" className="border h-10 mt-1 p-2 block w-full border-gray-300 rounded-md" onChange={handleChange} required/>
                            </div>  
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age <span className='text-red-500 font-bold'>*</span></label>
                                <input type="number" name="age" id="age" className="border h-10 mt-1 p-2 block w-full border-gray-300 rounded-md" onChange={handleChange} maxLength={2} required/>
                            </div>
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender <span className='text-red-500 font-bold'>*</span></label>
                                <input type="text" name="gender" id="gender" className="border h-10 mt-1 p-2 block w-full border-gray-300 rounded-md" onChange={handleChange} required/>
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number <span className='text-red-500 font-bold'>*</span></label>
                                <input type="number" name="phoneNumber" id="phoneNumber" className="border h-10 mt-1 p-2 block w-full border-gray-300 rounded-md" onChange={handleChange} maxLength={10} required/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className='text-red-500 font-bold'>*</span></label>
                                <input type="email" name="email" id="email" className="border h-10 mt-1 p-2 block w-full border-gray-300 rounded-md" onChange={handleChange} required/>
                            </div>
                            <div>
                                <label htmlFor="github" className="block text-sm font-medium text-gray-700">Github</label>
                                <input type="text" name="github" id="github" className="border h-10 mt-1 p-2 block w-full border-gray-300 rounded-md" onChange={handleChange} />
                            </div>
                        </div>
                        
                        <div className='mt-5'>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea type="text" name="address" id="address" className="border mt-1 p-2 block w-full border-gray-300 rounded-md h-40" onChange={handleChange} />
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp