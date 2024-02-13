import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function About() {
    return (
        <div className="w-full overflow-hidden mb-20"> 
            <Navbar/>
            <div className="flex flex-row pt-20">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="ml-[80px] flex flex-col w-[100%]"> 
                    <div className="mx-auto"> 
                        <h1 className="my-5 text-4xl font-mono border-b-2 border-b-red-500">About</h1>
                        <h1 className="text-3xl my-5 font-serif bg-green-500 text-white p-5">Pichaya Chantrasriwong</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About;