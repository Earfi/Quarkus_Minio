import Sidebar from "../components/Sidebar";
import { useState } from "react";

function Service() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);
        // คุณสามารถเพิ่มโค้ดเพื่อส่งข้อมูลไปยังเซิร์ฟเวอร์ที่นี่
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <div className="w-full overflow-hidden min-h-[90vh]">
            <div className="flex flex-row">
                <div className="fixed">
                    <Sidebar/>
                </div>
                <div className="ml-[80px] flex flex-col w-[100%]">
                    <div className="mx-auto w-full md:w-[900px] my-10 overflow-hidden rounded-3xl h-full">
                        <div className="flex flex-col md:flex-row w-full gap-5">  
                            <div className="w-full p-5">
                                <h2 className="text-2xl font-bold mb-5">แสดงความคิดเห็นของคุณ (คำแนะนำหรือร้องเรียน)</h2>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <label className="mb-2" htmlFor="name">ชื่อ</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="p-2 border rounded"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="mb-2" htmlFor="email">อีเมล</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="p-2 border rounded"
                                            required
                                        />
                                    </div>
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
