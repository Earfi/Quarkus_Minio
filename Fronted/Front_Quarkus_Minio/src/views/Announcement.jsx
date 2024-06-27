import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import Footer from '../components/Footer';

const Announcement = () => {
    const [role, setRole] = useState(""); 
    const [announce, setAnnounce] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: "",
        content: "",
        announcementType: "ประกาศทั่วไป"
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const getAnnouncement = async () => {
            const res = await fetch(`http://localhost:8080/announcement`);
            const data = await res.json();
            setAnnounce(data);    
        }; 

        if (token) {
            const decodedToken = jwtDecode(token);
            setRole(decodedToken.groups)
        }


        getAnnouncement();
    }, []);

    function formatDate(isoDateString) {
        const dateObj = new Date(isoDateString);
    
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
    
        const formattedDate = `${day}/${month}/${year}`;
    
        return formattedDate;
    } 
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAnnouncement({ ...newAnnouncement, [name]: value });
    };

    return (
        <div className="w-full overflow-hidden min-h-screen bg-gray-100 ">  
            <div className="flex flex-row h-full">
                <div>
                    <Sidebar />  
                </div>
                <div className="flex flex-col w-full h-full"> 
                    <div className='w-full'>
                        <div className="py-12 px-5">
                            <div className="container mx-auto">
                                <h1 className='text-center font-bold text-4xl text-gray-800 mb-8'>Announcements ({announce.length})</h1>
                                <div className="">
                                    {announce.map(announcement => (
                                        <div key={announcement.announcement_id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                                            <div className='sm:flex justify-between items-start mb-4'>
                                                <div>
                                                    <h2 className="text-xl font-semibold mb-2">{announcement.title}</h2>
                                                    <p className="text-sm text-gray-500 mb-1">Posted by : {announcement.user.username}, {formatDate(announcement.postDate)}</p>
                                                    {/* {announcement.user.username} */}
                                                </div>
                                                <div>
                                                    <div className="px-3 py-1 mb-2 w-fit bg-blue-200 text-blue-800 rounded-full text-sm font-semibold">
                                                        {announcement.announcement_type}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-700 break-words">{announcement.content}</p>
                                            <div className='w-full flex justify-end'>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <Footer/>
        </div>
    );
};

export default Announcement;