import { Link } from "react-router-dom";

function Introduce() {
    return (
        <div className="w-full relative h-[80vh] bg-gradient-to-b from-cyan-500 to-blue-700">  
            <div className="flex justify-between items-center h-full w-[1200px] gap-10 mx-auto">
                <div className="z-10 h-96 p-5">
                    <h1 className="text-6xl font-medium text-white">Connect Quarkus With Minio !!</h1>  
                    <p className="text-white">------------------------------------------------------------------</p>
                    <p className="text-white">Pichaya Chantrasriwong</p>
                    <Link to="/bucket"><button className="text-white text-xl font-medium border py-2 px-3 bg-red-500 rounded-xl shadow-sm cursor-pointer hover:bg-red-800 mt-5">Start Minio</button></Link>
                </div>
                <div>
                    <img src="../..//M1-20-21.jpg" width={700} alt="" className="rounded-2xl shadow-2xl border"/>
                </div>
            </div>
        </div>
    )
}

export default Introduce;