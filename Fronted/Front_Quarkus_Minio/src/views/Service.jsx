import Sidebar from "../components/Sidebar";
import { useState } from "react";
import {jwtDecode} from 'jwt-decode'; 
import Swal from "sweetalert2";

function Service() {
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (token) {
            const decodedToken = jwtDecode(token);
            const userName = decodedToken.upn;
            const userEmail = "-";

            await uploadBucket(userName, userEmail);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Login!!!",
            });
            return;
        }
    };

    const uploadBucket = async (userName, userEmail) => {
        try {
            const requestData = {
                username: userName,
                email: userEmail,
                message: message
            };

            const res = await fetch("http://localhost:8080/feedbacksandcomplaints", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(requestData),
            });
            if (res.ok) {
                Swal.fire({
                    title: "Your feedback add successfully",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                });
                setMessage("")
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error adding feedback!!!",
                });
            }
        } catch (error) {
            alert("Error adding feedback!! :", error);
        }
    };

    return (
        <div className="w-full overflow-hidden min-h-[90vh]">
            <div className="flex flex-row">
                <div className="fixed">
                    <Sidebar />
                </div>
                <div className="ml-[80px] flex flex-col w-[100%]">
                    <div className="mx-auto w-full md:w-[900px] my-10 overflow-hidden rounded-3xl h-full">
                        <div className="flex flex-col md:flex-row w-full gap-5">
                            <div className="w-full p-5">
                                <h2 className="text-2xl font-bold mb-5">แสดงความคิดเห็นของคุณ (คำแนะนำหรือร้องเรียน)</h2>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <label className="mb-2" htmlFor="message">ข้อความ</label>
                                        <textarea
                                            id="message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="p-2 border rounded"
                                            rows="5"
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="p-2 bg-blue-500 text-white rounded mt-3">ส่งความคิดเห็น</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Service;
