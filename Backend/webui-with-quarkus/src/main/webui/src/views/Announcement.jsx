import React from 'react';
import Sidebar from '../components/Sidebar';

const Announcement = () => {
    const announcements = [
        { id: 1, title: 'Important Announcement 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit justo nec sem scelerisque, vel cursus lorem venenatis.', imageUrl: 'https://via.placeholder.com/300' },
        { id: 2, title: 'Important Announcement 2', content: 'Aliquam semper fermentum nulla, sit amet congue risus pulvinar non. Phasellus nec ipsum nec justo sagittis dapibus.', imageUrl: 'https://via.placeholder.com/300' },
        { id: 3, title: 'Important Announcement 3', content: 'Vestibulum quis velit in purus hendrerit ullamcorper. Nam faucibus nisl eget massa ullamcorper, id aliquet felis tincidunt.', imageUrl: 'https://via.placeholder.com/300' },
        { id: 4, title: 'Important Announcement 2', content: 'Aliquam semper fermentum nulla, sit amet congue risus pulvinar non. Phasellus nec ipsum nec justo sagittis dapibus.', imageUrl: 'https://via.placeholder.com/300' },
        { id: 5, title: 'Important Announcement 3', content: 'Vestibulum quis velit in purus hendrerit ullamcorper. Nam faucibus nisl eget massa ullamcorper, id aliquet felis tincidunt.', imageUrl: 'https://via.placeholder.com/300' },
        { id: 6, title: 'Important Announcement 3', content: 'Vestibulum quis velit in purus hendrerit ullamcorper. Nam faucibus nisl eget massa ullamcorper, id aliquet felis tincidunt.', imageUrl: 'https://via.placeholder.com/300' },
        { id: 7, title: 'Important Announcement 3', content: 'Vestibulum quis velit in purus hendrerit ullamcorper. Nam faucibus nisl eget massa ullamcorper, id aliquet felis tincidunt.', imageUrl: 'https://via.placeholder.com/300' },
        { id: 8, title: 'Important Announcement 3', content: 'Vestibulum quis velit in purus hendrerit ullamcorper. Nam faucibus nisl eget massa ullamcorper, id aliquet felis tincidunt.', imageUrl: 'https://via.placeholder.com/300' },
        { id: 9, title: 'Important Announcement 3', content: 'Vestibulum quis velit in purus hendrerit ullamcorper. Nam faucibus nisl eget massa ullamcorper, id aliquet felis tincidunt.', imageUrl: 'https://via.placeholder.com/300' },
    ];

    return (
        <div className="w-full overflow-hidden min-h-[90vh]">  
            <div className="flex flex-row ">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-[100%]"> 
                    <div className='w-full'>
                        <div className="bg-gray-100 min-h-screen py-12 px-5">
                            <div className="container mx-auto">
                                <h1 className="text-3xl font-semibold text-center mb-8">Announcements</h1>
                                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                    {announcements.map(announcement => (
                                        <div key={announcement.id} className="bg-white p-6 rounded-lg shadow-md">
                                            <div className="mb-4">
                                                <img src={announcement.imageUrl} alt={announcement.title} className="w-full h-auto object-cover rounded-lg" />
                                            </div>
                                            <h2 className="text-lg font-semibold mb-2">{announcement.title}</h2>
                                            <p className="text-sm text-gray-700">{announcement.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Announcement;
