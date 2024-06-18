import { Link } from "react-router-dom"; 
import Sidebar from "../../components/Sidebar"; 

function Jasper() {
    return (
        <div className="w-full overflow-hidden min-h-[90vh]">  
            <div className="flex flex-row ">
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