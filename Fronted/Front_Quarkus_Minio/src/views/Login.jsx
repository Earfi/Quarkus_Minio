import { useState } from "react";
import Navbar from "../components/Navbar";
import Swal from 'sweetalert2'
import {jwtDecode} from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [mode,setMode] = useState("login");

    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);

    const handleMode = () => { 
        mode === "login" ? setMode("signUp") : setMode("login"); 
  }

  const login = async () => {
    const formData = JSON.stringify({
        username: username,
        password: password
    });
      
    const res = await fetch(`http://localhost:8080/auth/login`, {
        method: "POST",
        body: formData,
        headers: {
            "Content-Type": "application/json"
        }
    });
 

    if (res.ok) {
        const data = await res.json();
        const token = data.token.string; 

        const decodedToken = jwtDecode(token); 

        localStorage.setItem('token', token);
        localStorage.setItem('username', decodedToken.upn);
        localStorage.setItem('role', decodedToken.groups); 

        Swal.fire({
            title: "Login successfully",
            text: "Hello Please Check your File!!!",
            icon: "success",
            showConfirmButton: false, 
            timer: 1000
        });
 
        if(decodedToken.groups === "User"){
            setTimeout(() => {
                navigate('/');
                window.location.reload()
            }, 1500); 
        }else if(decodedToken.groups === "Admin"){
            setTimeout(() => {
                navigate('/mode');
                window.location.reload()
            }, 1500); 
        }

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error Login !!!", 
        }); 
    } 
};



  return (
    <div>
        <Navbar/> 
        <div className="w-full h-[100vh] flex justify-center items-center ">
            <div className="md:bg-gray-500 mt-[-80px] w-[90%] h-[80%] grid justify-center items-center rounded-3xl">
                <div className="bg-white w-[100%] h-fit flex justify-center items-center rounded-2xl overflow-hidden border border-black shadow-2xl">
                    <div className="relative h-full hidden lg:block overflow-hidden">
                        <div className="h-[500px] w-[500px] bg-[url('../../login//crash.jpg')] bg-cover brightness-75  ">
                            {/* <img src="../../login//crash.jpg" width={200} height={24}></img> */}
                            <div className="w-full"></div>
                        </div>
                        <div className="absolute top-[20%] h-full w-full text-white text-2xl font-medium text-center shadow-xl">
                        <p>Welcome To My first Project</p>
                        <p>Try Login</p>
                        </div>
                    </div>
                
                {mode === "login" ? (
                    <div className={`h-[500px] w-[350px] grid bg-white font-medium py-0 px-11 relative transition-all text-black ${mode === "login" ? 'right-[0%]' : 'right-[-100%] overflow-hidden'}`}>
                        <h1 className="text-center pt-3">Blog</h1>
                        <div className="flex flex-col">
                            <label className="text-xs pt-3">USERNAME</label>
                            <input onChange={(e) => setUsername(e.target.value)} className="rounded-xl h-10 py-0 px-3 border" type="text" placeholder="username..." required/>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs pt-3">PASSWORD</label>
                            <input onChange={(e) => setPassword(e.target.value)} className="rounded-xl h-10 py-0 px-3 border" type="password" placeholder="password..." required/>
                        </div>
                        <button onClick={login} className="rounded-xl h-10 w-full mt-4 bg-red-500 text-white cursor-pointer hover:bg-red-800">LOGIN</button>
                        <div className="mt-5">
                            <div className="flex items-center mb-3 gap-3 cursor-pointer pl-[20%] hover:text-red-300">
                            <img src="../../login//google.png" width={24} height={24}></img>
                            <p>Sign in with Google</p>
                            </div>
                            <div className="flex items-center mb-3 gap-3 cursor-pointer pl-[20%] hover:text-red-300">
                            <img src="../../login//facebook.png" width={24} height={24}></img>
                            <p>Sign in with Facebook</p>
                            </div>
                            <div className="flex items-center mb-3 gap-3 cursor-pointer pl-[20%] hover:text-red-300">
                            <img src="../../login//github.png" width={24} height={24}></img>
                            <p>Sign in with Github</p>
                            </div>
                        </div>
                        <hr />
                        {/* <p className="text-center mt-1">
                            Dont't have an account ? <span className="text-red cursor-pointer hover:text-red-800" onClick={handleMode}>Sign Up</span>
                        </p> */}
                        <Link to="/signUp" className="text-center mt-1"> Dont't have an account ? <span className="text-red cursor-pointer hover:text-red-800" onClick={handleMode}>Sign Up</span></Link>
                    </div>
                )
                :
                (
                    <div className={`h-[500px] w-[350px] grid bg-white font-medium py-0 px-11 relative transition-all text-black ${mode === "signUp" ? 'right-[0%]' : 'right-[-100%]'}`}>
                        <h1 className="text-center pt-3">Blog</h1>
                        <div className="flex flex-col">
                            <label className="text-xs pt-3">USERNAME</label>
                            <input className="rounded-xl h-10 py-0 px-3 border" type="text" placeholder="username..." />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs pt-3">PASSWORD</label>
                            <input className="rounded-xl h-10 py-0 px-3 border" type="text" placeholder="password..." />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs pt-3">CONFIRM PASSWORD</label>
                            <input className="rounded-xl h-10 py-0 px-3 border" type="text" placeholder="confirm password..." />
                        </div>
                        <button className="rounded-xl h-10 w-full mt-4 bg-red-500 text-white cursor-pointer hover:bg-red-800">SIGN UP</button>
                        <hr className="mt-5"/>
                        <p className="text-center mt-1">
                            <span className="text-red cursor-pointer hover:text-red-800" onClick={handleMode}>Sign In</span>
                        </p>
                    </div>
                )}

                
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;