import { useState } from "react"; 
import Swal from 'sweetalert2'
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function App() { 
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username != '' && password != '') {
      login();
    } else {
      setError('Invalid username or password');
    }
  }; 

  const login = async () => {
    const formData = JSON.stringify({
        username: username,
        password: password
    });
    
    const res = await fetch(`http://localhost:8080/auth/admin/login`, {
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
        console.log(res);
        console.log(decodedToken);

        setTimeout(() => {
            navigate('/home');
            window.location.reload()
        }, 1500); 

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error Login !!!", 
        }); 
    } 
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-6 text-center">LOGIN</h1>
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button 
            onClick={handleLogin} 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
