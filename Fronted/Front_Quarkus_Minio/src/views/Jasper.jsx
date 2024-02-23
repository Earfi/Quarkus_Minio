import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import GetAddress from "../components/jasper/DB/GetAddress";
import InsertAddress from "../components/jasper/DB/InsertAddress";

function Jasper() {
    return (
        <div className="w-full overflow-hidden mb-20"> 
            <Navbar/>
            <div className="flex flex-row pt-20">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-[100%] mt-36 sm:mt-5"> 
                    <div className="w-fit mx-auto"> 
                        <div className="mt-5">
                            <label className="text-xl font-mono">Gen PDF with Database : </label>
                            <Link to="/jasper/db">
                                <button className="border-b-2 border-b-red-500 hover:text-red-500 cursor-pointer">
                                    CLICK!!
                                </button>
                            </Link>
                        </div>

                        <div className="mt-5">
                            <label className="text-xl font-mono">Gen PDF with JSON : </label>
                            <Link to="/jasper/json">
                                <button className="border-b-2 border-b-red-500 hover:text-red-500 cursor-pointer">
                                    CLICK!!
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jasper;