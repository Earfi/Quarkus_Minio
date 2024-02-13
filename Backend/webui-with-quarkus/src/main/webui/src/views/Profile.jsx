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
                        Profile
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;