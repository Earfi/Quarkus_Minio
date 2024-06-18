import { useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2'

function InsertCompany() {
    const [allBuckets, setAllBuckets] = useState([]);
    const [bucket, setBucket] = useState('');

    const [fileName, setFileName] = useState("");

    const [companyName, setCompanyName] = useState("");
    const [companyUrl, setCompanyUrl] = useState("");
    const [allUsers, setAllUsers] = useState([]);

    const [user, setUser] = useState([
        {
            name: "",
            age: "",
            gender: "",
            phone: "",
            birthday: ""
        }
    ]);

    const [openJson, setOpenJson] = useState(false);
    const [copied, setCopied] = useState(false);
    const [jsonData] = useState(`{
        "companyName": "Company",
        "companyUrl": "www.company.com",
        "rows": [
          {
            "name": "John Smith",
            "age": "40",
            "gender": "Male",
            "phone": "321-654-9870",
            "birthday": "1983-11-10"
          },
          {
            "name": "Lady nano",
            "age": "30",
            "gender": "feMale",
            "phone": "321-654-9870",
            "birthday": "1983-11-10"
          }
        ]
      }`);

    const copyJsonData = () => {
        navigator.clipboard.writeText(jsonData);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    useEffect(() => {
        const getAllBacket = async () => {
            const res = await fetch("http://localhost:8080/minio/all/bucket");
            const data = await res.json();
            setAllBuckets(data);
        }
        getAllBacket();
    }, []);

    const handleAddUser = () => {
        setUser([
            ...user,
            {
                name: "",
                age: "",
                gender: "",
                phone: "",
                birthday: ""
            }
        ]);
    };

    const handleDeleteUser = (index) => {
        const newUser = user.filter((_, i) => i !== index);
        setUser(newUser);
    };

    const handleUserChange = (index, key, value) => {
        const newUser = user.map((u, i) => {
            if (i === index) {
                return { ...u, [key]: value };
            }
            return u;
        });
        setUser(newUser);
    };

    const handleGeneratePdf = async (e) => {
        e.preventDefault();
        try {
            if (companyName === "" || companyUrl === "") {
                return;
            }
            if (bucket === "" || bucket === "Please Select") {
                Swal.fire({
                    title: "Please Select Bucket!!",
                    text: "Please Select Bucket!!",
                    icon: "warning"
                });
                return;
            }

            const dataToSend = {
                companyName: companyName,
                companyUrl: companyUrl,
                rows: user
            };

            const response = await fetch(`http://localhost:8080/api/v1/report/generate/${fileName}/${bucket}/1`, {
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
            saveAs(responseData, `${fileName}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <div className="my-5 px-5 w-full">
            <form className="w-full h-fit p-2 py-10 mx-auto border-black border-2 bg-white" onSubmit={handleGeneratePdf}>
                <h1 className="text-3xl font-bold text-red-700 text-center">Company</h1>
                <div className="my-2">
                    <h1><b>Select Bucket to Collect Files!!</b></h1>
                    <select
                        onChange={(e) => setBucket(e.target.value)}
                        className="border border-gray-500 cursor-pointer hover:bg-gray-500 hover:text-white p-2 rounded-lg w-full text-xs"
                        required
                    >
                        {allBuckets.length === 0 && (
                            <option className="bg-red-500 text-white font-mono p-2">No Bucket !!!</option>
                        )}
                        <option className="bg-black text-white text-xs">Please Select</option>
                        {allBuckets.map((post) => (
                            <option key={post} value={post} className="text-black text-xs bg-white hover:bg-red-400 hover:text-white">
                                {post}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col items-start w-full my-2">
                    <label className="text-sm"><b>File Name</b></label>
                    <input onChange={(e) => setFileName(e.target.value)} type="text" placeholder="input file name" className="border px-2 rounded-lg w-full h-10 mt-2 text-xs" />
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-2 md:flex-row">
                    <div className="flex flex-col items-start w-full">
                        <label className="text-sm"><b>Company Name</b></label>
                        <input onChange={(e) => setCompanyName(e.target.value)} type="text" placeholder="company name" className="border px-2 rounded-lg w-full h-10 mt-2 text-xs" required />
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label className="text-sm"><b>Company Website</b></label>
                        <input onChange={(e) => setCompanyUrl(e.target.value)} type="text" placeholder="company website" className="border px-2 rounded-lg w-full h-10 mt-2 text-xs" required />
                    </div>
                </div>
                <h1 className="text-center font-bold my-5 bg-gray-500 p-2 text-white">Input User Information</h1>

                <div className="mb-4 border-2 p-2">
                    {user.map((user, index) => (
                        <div>
                            <div key={index} className='flex flex-wrap gap-2 mb-2 w-full'>
                                <div className="flex flex-col">
                                    <label className="text-xs"><b>Name</b></label>
                                    <input
                                        type="text"
                                        value={user.name}
                                        onChange={(e) => handleUserChange(index, 'name', e.target.value)}
                                        placeholder="user name"
                                        className="p-2 border rounded text-xs"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs"><b>Age</b></label>
                                    <input
                                        type="number"
                                        value={user.age}
                                        onChange={(e) => handleUserChange(index, 'age', e.target.value)}
                                        placeholder="age"
                                        maxLength={2}
                                        className="p-2 border rounded text-xs"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs"><b>Gender</b></label>
                                    <select
                                        value={user.gender}
                                        onChange={(e) => handleUserChange(index, 'gender', e.target.value)}
                                        className="p-2 border rounded text-xs"
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs"><b>Phone</b></label>
                                    <input
                                        type="phone"
                                        value={user.phone}
                                        onChange={(e) => handleUserChange(index, 'phone', e.target.value)}
                                        placeholder="phone"
                                        className="p-2 border rounded text-xs"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs"><b>Birthday</b></label>
                                    <input
                                        type="date"
                                        value={user.birthday}
                                        onChange={(e) => handleUserChange(index, 'birthday', e.target.value)}
                                        className="p-2 border rounded text-xs"
                                    />
                                </div>
                                <button type="button" onClick={() => handleDeleteUser(index)} className="text-red-500 hover:text-red-700">x</button>
                            </div>
                            <h1 className="text-center font-bold border-black border-b-2 mb-5"></h1>
                        </div>
                    ))}
                    <div className="flex gap-2">
                        <button type="button" onClick={handleAddUser} className="mt-2 bg-gray-700 text-xs text-white p-2 rounded hover:bg-gray-900 font-bold">Add More User</button>
                        <p onClick={() => setOpenJson(!openJson)} className="mt-2 bg-red-500 text-xs text-white p-2 rounded hover:bg-red-900 font-bold cursor-pointer">Json</p>
                        <button type="submit" className="mt-2 bg-green-500 text-xs text-white p-2 rounded hover:bg-green-900 font-bold">Generate PDF</button>
                    </div>
                </div>
                
                <div className="w-full bg-gray-500 overflow-hidden rounded-2xl transition-all">
                    <div className={` ${openJson ? 'h-[500px]' : 'h-0'} overflow-hidden transition-all`}>
                        <div className="left-0 z-20  w-full mx-auto flex flex-col lg:flex-row md:justify-center items-center md:items-start gap-5 p-2 transition-all">
                            <div className="max-w-xs mx-auto lg:m-0 h-fit p-2 border rounded-lg bg-gray-100 text-sm lg:mt-12">
                                <h1 className="font-bold mb-1 text-sm">รูปแบบ Json ที่ส่งไป</h1>
                                <textarea
                                    className="w-full h-80 mb-2 resize-none border rounded-md p-2 text-xs"
                                    value={jsonData}
                                    readOnly
                                />
                                <button
                                    className={`bg-${copied ? 'red' : 'green'}-500 w-48 text-white px-4 py-2 rounded hover:bg-${copied ? 'red' : 'green'}-600`}
                                    onClick={copyJsonData}
                                >
                                    {copied ? 'Copied!' : 'Copy JSON Data'}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default InsertCompany;
