import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="w-full h-20 bg-blue-950 text-xl font-medium text-white flex justify-between items-center fixed z-50"> 
            <Link to="/" className="hidden sm:block ml-10 text-sm md:ml-30 border py-2 px-2 rounded-full">Minio With Quarkus</Link>
            <div className="flex p-5 text-sm sm:text-md md:text-xl gap-5 cursor-pointer items-center">
                <Link to="/" className="hover:text-orange-400">HOME &#9778;</Link> 
                <Link to="/bucket" className="hover:text-orange-400">BUCKET &#9778;</Link> 
                <Link to="/file" className="hover:text-orange-400">FILE &#10063;</Link> 
                <Link to="/about" className="hover:text-orange-400">ABOUT &#9730;</Link> 
                <Link to="/service" className="hover:text-orange-400">SERVICE &#9743;</Link>  
            </div>
            <div className="hidden lg:flex p-5 text-sm sm:text-xl gap-5 cursor-pointer items-center"> 
                <input type="text" className="p-1 rounded-md text-black" name="search" placeholder="Search Backet"/>
                <Link to="/profile"><h1 className="hover:text-orange-400 text-sm sm:text-xl ">Profile</h1></Link>
                <h1 className="text-5xl">&#9996;</h1>
            </div>
        </div>
    )
}

export default Navbar;