import Sidebar from "./Sidebar";
import { useEffect, useState } from "react"; 
import { Link,useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 

function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
        navigate('/'); 
    }

    const token = localStorage.getItem("token") 

    if (token) {   
      const decodedToken = jwtDecode(token); 
      if (decodedToken.groups !== 'Admin') {
          navigate('/'); 
      } 
    } 

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div> 
      <div className="w-full h-[100vh] flex min-w-[1300px] bg-slate-100">
        {loading ? (
          <div className="flex justify-center items-center h-full w-full">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="w-[15%] h-full shadow-2xl">
              <Sidebar />
            </div>

            <div className="w-[85%] h-[100vh] overflow-auto">
              <div className="w-full h-full">
                <div className="w-full shadow-xl h-44 flex justify-center items-center gap-5">
                  <div className="relative w-[20%] h-[80%] bg-gradient-to-r from-blue-500 to-blue-800 rounded-2xl p-2 text-white flex flex-col justify-center">
                    <h1 className="font-bold">This Month Revenue</h1>
                    <h1 className="text-3xl">$15200</h1>
                    <button className="border rounded-md p-2 bg-white text-black w-fit h-fit my-2 text-sm">
                      +12.6%
                    </button>
                    <p className="absolute bottom-2 right-2 text-red-500">
                      details
                    </p>
                  </div>
                  <div className="relative w-[20%] h-[80%] bg-gradient-to-r from-red-500 to-red-800 rounded-2xl p-2 text-white flex flex-col justify-center">
                    <h1 className="font-bold">Today Earning</h1>
                    <h1 className="text-3xl">$15200</h1>
                    <button className="border rounded-md p-2 bg-white text-black w-fit h-fit my-2 text-sm">
                      +12.6%
                    </button>
                    <p className="absolute bottom-2 right-2 text-red-500">
                      details
                    </p>
                  </div>
                  <div className="relative w-[20%] h-[80%] bg-gradient-to-r from-yellow-500 to-yellow-800 rounded-2xl p-2 text-white flex flex-col justify-center">
                    <h1 className="font-bold">Today Orders</h1>
                    <h1 className="text-3xl">$15200</h1>
                    <button className="border rounded-md p-2 bg-white text-black w-fit h-fit my-2 text-sm">
                      +12.6%
                    </button>
                    <p className="absolute bottom-2 right-2 text-red-500">
                      details
                    </p>
                  </div>
                  <div className="relative w-[20%] h-[80%] bg-gradient-to-r from-green-500 to-green-800 rounded-2xl p-2 text-white flex flex-col justify-center">
                    <h1 className="font-bold">Product Sold</h1>
                    <h1 className="text-3xl">$15200</h1>
                    <button className="border rounded-md p-2 bg-white text-black w-fit h-fit my-2 text-sm">
                      +12.6%
                    </button>
                    <p className="absolute bottom-2 right-2 text-red-500">
                      details
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-5 w-full h-96 p-2 ">
                  <div className="h-full w-[30%] bg-white p-5 relative rounded-xl shadow-xl overflow-hidden">
                    <h1 className="text-2xl font-medium">Sales</h1>
                    <p className="absolute right-3 top-2 text-2xl font-bold">
                      :
                    </p>
                    <div className="flex w-full items-center justify-between my-2">
                      <button className="bg-blue-600 p-2 text-white rounded-xl overflow-hidden pr-0">
                        weekly{" "}
                        <span className="bg-gray-200 h-fit p-3 text-black rounded-xl">
                          Monthly
                        </span>
                      </button>
                      <p>
                        <span className="font-bold">Total : </span>$330.50
                      </p>
                    </div>
                    <img
                      className="h-[70%] mx-auto my-5"
                      src="../../Admin/Dashboard//graph_sale.png"
                      alt=""
                    />
                  </div>
                  <div className="h-full w-[60%] bg-white p-5 relative rounded-xl shadow-xl overflow-hidden">
                    <h1 className="text-2xl font-medium">
                      Monthly Acquisition
                    </h1>
                    <div className="absolute right-3 top-2 font-semibold flex gap-5 items-center">
                      <p>
                        <span className="text-xl text-orange-500">
                          &#9787;
                        </span>{" "}
                        Income
                      </p>
                      <p>
                        <span className="text-xl text-blue-500">&#9787;</span>{" "}
                        Users
                      </p>
                      <p className="text-xl font-bold">:</p>
                    </div>
                    <img
                      className="h-[80%] mx-auto my-5"
                      src="../../Admin/Dashboard//Monthly_Acquisition.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div> 
    </div>
  );
}

export default Dashboard;