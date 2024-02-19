import { Link } from "react-router-dom";

function Introduce() {
    return (
        <div className="w-full overflow-hidden">  
            <div className="mx-auto w-[90%] lg:h-[400px] shadow-2xl my-20 flex flex-col lg:flex-row items-center justify-center p-10 gap-10 backdrop-blur-3xl bg-white/30 ">
                <div className="">
                    <h1 className="text-white text-5xl font-bold w-full lg:w-[500px]">Quarkus Minio Kafka React !!</h1>  
                    <p className="text-white">------------------</p>
                    <p className="text-white text-xl">Pichaya Chantrasriwong</p>
                    <Link to="/bucket"><button className="text-white text-xl font-medium border py-2 px-3 bg-red-500 rounded-xl shadow-sm cursor-pointer hover:bg-red-800 mt-5">Get Start</button></Link>
                </div>
                <div className="">
                    <img src="../..//map.png" width={700} alt="" className="rounded-2xl shadow-2xl border w-80"/>
                </div>
            </div>
        </div>
    )
}

export default Introduce;