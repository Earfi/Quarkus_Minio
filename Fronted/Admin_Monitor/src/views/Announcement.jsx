import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

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

    const handleAddAnnouncement = async () => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const announcementData = {
            ...newAnnouncement,
            user: userId,
            announcement_id: null
        };

        try {
            const res = await fetch('http://localhost:8080/announcement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(announcementData)
            });

            if (res.ok) {
                const newAnnounce = await res.json();
                setAnnounce([...announce, newAnnounce]);
                setIsAdding(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Announcement added successfully',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => { 
                    fetchAnnounce();
                });
                
            } else {
                Swal.fire('Error', 'Failed to add announcement', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to add announcement', 'error');
        }
    };

    const handleDeleteAnnouncement = async (announcementId) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:8080/announcement/${announcementId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setAnnounce(announce.filter(a => a.announcement_id !== announcementId)); 
                Swal.fire({
                    icon: 'success',
                    title: 'Announcement deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => { 
                    fetchAnnounce();
                });
            } else {
                Swal.fire('Error', 'Failed to delete announcement', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to delete announcement', 'error');
        }
    };

    function fetchAnnounce() {
        const getAnnouncement = async () => {
            const res = await fetch(`http://localhost:8080/announcement`);
            const data = await res.json();
            setAnnounce(data);
        };
        getAnnouncement();
    }

    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100">
                <div className='w-full'>
                    <div>
                        <div className="container mx-auto bg-white p-5">
                            <h1 className="text-3xl font-bold">Announcements ({announce.length})</h1>
                            <div>
                                <div className={`w-full flex justify-end`}>
                                    <button 
                                        className='border bg-gray-500 hover:bg-gray-800 px-2 py-1 font-bold text-white text-lg rounded-md my-2'
                                        onClick={() => setIsAdding(!isAdding)}
                                    >
                                        {isAdding ? "Cancel" : "Add Announcement"}
                                    </button>
                                </div>
                                {isAdding && (
                                    <div className="bg-white p-6 rounded-lg shadow-md mb-4 flex flex-col gap-5 border-2 border-gray-400">
                                        <h2 className="text-xl font-semibold mb-4">New Announcement</h2>
                                        <input 
                                            type="text"
                                            name="title"
                                            placeholder="Title"
                                            value={newAnnouncement.title}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                        <textarea 
                                            name="content"
                                            placeholder="Content"
                                            value={newAnnouncement.content}
                                            onChange={handleInputChange}
                                            className="w-full min-h-96 p-2 border border-gray-300 rounded break-words"
                                        /> 
                                        <select
                                            name="announcementType"
                                            value={newAnnouncement.announcementType}
                                            onChange={handleInputChange}
                                            className='select select-bordered w-full max-w-xs h-10'
                                        >
                                            <option value='ประกาศทั่วไป'>ประกาศทั่วไป</option>
                                            <option value='ประกาศสำหรับสมาชิก'>ประกาศสำหรับสมาชิก</option>
                                        </select>
                                        <button 
                                            onClick={handleAddAnnouncement}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                )}
                                {announce.map(announcement => (
                                    <div key={announcement.announcement_id} className="bg-white p-6 rounded-lg shadow-md mb-4 border-2 border-slate-400">
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
                                            <button 
                                                onClick={() => handleDeleteAnnouncement(announcement.announcement_id)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default Announcement;