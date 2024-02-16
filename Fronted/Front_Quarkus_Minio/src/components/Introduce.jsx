import { Link } from "react-router-dom";

function Introduce() {
    return (
        <div className="w-full relative h-[80vh] bg-gradient-to-b from-cyan-500 to-blue-700">  
            <div className="flex flex-col pt-10 items-center sm:items-start sm:pl-10 md:flex-row md:justify-center md:gap-20 md:pt-40 h-full gap-4">
                <div className="z-10">
                    <h1 className="text-2xl md:text-6xl font-medium text-white">Quarkus Minio Kafka React !!</h1>  
                    <p className="text-white">------------------</p>
                    <p className="text-white">Pichaya Chantrasriwong</p>
                    <Link to="/bucket"><button className="text-white text-xl font-medium border py-2 px-3 bg-red-500 rounded-xl shadow-sm cursor-pointer hover:bg-red-800 mt-5">Get Start</button></Link>
                </div>
                {/* <div className="sm:mr-20">
                    <img src="../..//M1-20-21.jpg" width={700} alt="" className="rounded-2xl shadow-2xl border w-80"/>
                </div> */}
            </div>
        </div>
    )
}

export default Introduce;