import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const FeedbackComplaints = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/feedbacksandcomplaints', {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setFeedbacks(data);
                } else {
                    throw new Error('Failed to fetch feedbacks');
                }
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100">
                <div className="container mx-auto p-5 bg-white">
                    <h1 className="text-3xl font-bold">Feedbacks and Complaints ({feedbacks.length})</h1>
                    <div className="mt-6">
                        {feedbacks.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {feedbacks.map((feedback, index) => (
                                    <div key={index} className="bg-white shadow-md rounded-lg p-4 border-2 border-gray-400">
                                        <h2 className="text-xl font-bold mb-2">{feedback.username}</h2>
                                        <p className="text-gray-600 mb-2">{feedback.email}</p>
                                        <p className="text-gray-700">{feedback.message}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-lg text-red-500 mt-4">No feedbacks or complaints found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackComplaints;
