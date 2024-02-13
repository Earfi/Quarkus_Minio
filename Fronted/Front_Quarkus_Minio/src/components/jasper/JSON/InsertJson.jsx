import { useState } from "react";
import { saveAs } from 'file-saver';

function InsertJson() {

    const [fileName,setFileName] = useState("");

    const [companyName, setCompanyName] = useState("");
    const [companyUrl, setCompanyUrl] = useState("");
    const [allUsers, setAllUsers] = useState([]);

    const [newUser, setNewUser] = useState({
        name: "",
        age: "",
        gender: "",
        phone: "",
        birthday: ""
    });

    const handleAddUser = () => {
        setAllUsers([...allUsers, newUser]);
        setNewUser({
            name: "",
            age: "",
            gender: "",
            phone: "",
            birthday: ""
        });

        console.log(allUsers);
        console.log(newUser);
    };

    const handleGeneratePdf = async () => {
        try {
            const dataToSend = {
                companyName: companyName,
                companyUrl: companyUrl,
                rows: allUsers
            };
    
            const response = await fetch(`http://localhost:8080/api/v1/report/generate/${fileName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            });
    
            if (!response.ok) {
                throw new Error("Failed to generate PDF");
            }
    
            const responseData = await response.blob();
            saveAs(responseData, `${fileName}` + ".pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };
    

    return (
        <div className="my-2 w-full bg-gray-100">
            <div className="w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] bg-gray-200 h-fit p-2 mx-auto border-black border-2">
                <div className="flex flex-col items-start w-full my-2">
                        <label><b>File Name</b></label>
                        <input onChange={(e) => setFileName(e.target.value)} type="text" placeholder="input file name" className="border px-2 rounded-lg w-full h-10 mt-2"/>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-2 md:flex-row">
                    <div className="flex flex-col items-start w-full">
                        <label><b>Company Name</b></label>
                        <input onChange={(e) => setCompanyName(e.target.value)} type="text" placeholder="company name" className="border px-2 rounded-lg w-full h-10 mt-2"/>
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label><b>Company Website</b></label>
                        <input onChange={(e) => setCompanyUrl(e.target.value)} type="text" placeholder="company website" className="border px-2 rounded-lg w-full h-10 mt-2"/>
                    </div>
                </div>
                <hr className="my-2"/>
                <h1 className="text-center font-bold border-fuchsia-400 border-b-8 ">Input User Information</h1>
                
                <div className="w-full my-2 border border-gray-100 p-2 bg-gray-300 flex flex-col items-center gap-2 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <div className="flex flex-col items-start w-full">
                        <label><b>Name</b></label>
                        <input 
                            value={newUser.name} 
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            type="text" 
                            placeholder="your name" 
                            className="border px-2 rounded-lg w-full h-10 mt-2"
                        />
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label><b>Age</b></label>
                        <input 
                            value={newUser.age} 
                            onChange={(e) => setNewUser({ ...newUser, age: e.target.value })} 
                            type="number" 
                            placeholder="your age" 
                            className="border px-2 rounded-lg w-full h-10 mt-2"
                        />
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label><b>Gender</b></label>
                        <select 
                            value={newUser.gender} 
                            onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })} 
                            name="gender"  
                            className="border px-2 rounded-lg w-full h-10 mt-2"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">FeMale</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label><b>Phone</b></label>
                        <input 
                            value={newUser.phone} 
                            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} 
                            type="number" 
                            placeholder="your phone" 
                            className="border px-2 rounded-lg w-full h-10 mt-2"
                        />
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label><b>Birthday</b></label>
                        <input 
                            value={newUser.birthday} 
                            onChange={(e) => setNewUser({ ...newUser, birthday: e.target.value })} 
                            type="date" 
                            placeholder="your birthday" 
                            className="border px-2 rounded-lg w-full h-10 mt-2"
                        />
                    </div>
                </div>

                <button onClick={handleAddUser} className="w-full h-10 bg-red-500 text-white font-bold my-2 hover:bg-red-800">Add User</button>
                <button onClick={handleGeneratePdf} className="w-full h-10 bg-green-500 text-white font-bold my-2 hover:bg-green-800">Generate PDF</button>
            </div>
        </div>
    )
}

export default InsertJson;
