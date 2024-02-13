import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Profile() {
    return (
        <div className="w-full overflow-hidden mb-20"> 
            <Navbar/>
            <div className="flex flex-row pt-20">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="ml-[80px] flex flex-col w-[100%]"> 
                    <div className="mx-auto">
                        <h1 className="text-2xl my-5 font-medium text-center border-b-2">Profile</h1>
                        <img className="w-[200px] mx-auto border-4 border-black rounded-full" src="../..//profile-icon.png" alt="" />
                        <input type="file" className="my-5 bg-gray-100 border"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;