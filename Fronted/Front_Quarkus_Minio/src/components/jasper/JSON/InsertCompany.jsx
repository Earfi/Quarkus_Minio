import { useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2'

function InsertCompany() {
    const [allBuckets,setAllBuckets] = useState([]);  
    const [bucket,setBucket] = useState(''); 
     
    const [fileName,setFileName] = useState("");

    const [companyName, setCompanyName] = useState("");
    const [companyUrl, setCompanyUrl] = useState("");
    const [allUsers, setAllUsers] = useState([]);

    const [openJson,setOpenJson] = useState(false); 
    const [copied,setCopied] = useState(false)
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
            const res = await fetch("http://localhost:8080/minio/all/bucket")
            const data = await res.json()
            setAllBuckets(data)
        }  
        getAllBacket() 
    },[]) 

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

        if (setNewUser.name != "" || setNewUser.name != null) { 
            Swal.fire({
                title: "Insert Successfully!!",
                text: "Insert User Successfully!!",
                icon: "success"
              });
        }else{
            Swal.fire({
                title: "Please Input User !!",
                text: "Please Input User !!",
                icon: "error"
              });
        }
        console.log(allUsers);
        console.log(newUser);
    };

    const handleGeneratePdf = async () => {
        try {

            if(setCompanyName == "" || setCompanyUrl == ""){
                return
            }
            if(bucket == "" || bucket == "Please Selete"){ 
                Swal.fire({
                    title: "Please Selete Bucket!!",
                    text: "Please Selete Bucket!!",
                    icon: "warning"
                  });
                return
            }

            const dataToSend = {
                companyName: companyName,
                companyUrl: companyUrl,
                rows: allUsers
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
            saveAs(responseData, `${fileName}` + ".pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };
    

    return (
        <div className="my-5 px-5 w-full  "> 
            <form className="w-full md:w-[600px] lg:w-[800px]  h-fit p-2 py-10 mx-auto border-black border-2 ">
                <div className="w-full bg-gray-500 overflow-hidden rounded-2xl transition-all">
                    <h1 className="bg-purple-700 p-2 cursor-pointer text-3xl hover:bg-red-300 px-10 text-white font-bold rounded-xl" onClick={() => setOpenJson(!openJson)}>Json</h1>
                        <div className={` ${openJson == true ? 'h-[500px]' : 'h-0'} overflow-hidden transition-all`}>
                            <div className="left-0 z-20  w-full mx-auto flex flex-col lg:flex-row md:justify-center items-center md:items-start gap-5 p-2 transition-all">
        
                                <div className="max-w-xs mx-auto lg:m-0 h-fit p-2 border rounded-lg bg-gray-100 text-sm lg:mt-12">
                                    <h1 className="font-bold mb-1">รูปแบบ Json ที่ส่งไป</h1>
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
                <div className="my-2">
                    <h1><b>Select Bucket to Collect Files!!</b></h1>
                    <select onChange={(e) => setBucket(e.target.value)} content='Bucket' className='border border-gray-500 cursor-pointer hover:bg-gray-500 hover:text-white my-2' required>
                        {allBuckets.length == 0 &&
                        (
                            <>
                            <option className='m-5 bg-red-500 text-white font-mono border-l-red-500 border p-2'>No Bucket !!!</option>
                            </>
                        )
                        }
                        <option className="bg-black text-white hover:cursor-none ">Please Select</option>
                        {allBuckets.map((post) => ( 
                        <>
                            <option className='m-5 text-black bg-white hover:bg-red-400 hover:text-white hover:cursor-pointer"' key={post} value={post}>{post}</option>
                        </>
                        ))} 
                    </select>
                </div>
                <div className="flex flex-col items-start w-full my-2">
                        <label><b>File Name</b></label>
                        <input onChange={(e) => setFileName(e.target.value)} type="text" placeholder="input file name" className="border px-2 rounded-lg w-full h-10 mt-2"/>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-2 md:flex-row">
                    <div className="flex flex-col items-start w-full">
                        <label><b>Company Name</b></label>
                        <input onChange={(e) => setCompanyName(e.target.value)} type="text" placeholder="company name" className="border px-2 rounded-lg w-full h-10 mt-2" required/>
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label><b>Company Website</b></label>
                        <input onChange={(e) => setCompanyUrl(e.target.value)} type="text" placeholder="company website" className="border px-2 rounded-lg w-full h-10 mt-2" required/>
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
                            className="border px-2 rounded-lg w-full h-10 mt-2"  required
                        />
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label><b>Age</b></label>
                        <input 
                            value={newUser.age} 
                            onChange={(e) => setNewUser({ ...newUser, age: e.target.value })} 
                            type="number" 
                            placeholder="your age" 
                            className="border px-2 rounded-lg w-full h-10 mt-2"  required
                        />
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label><b>Gender</b></label>
                        <select 
                            value={newUser.gender} 
                            onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })} 
                            name="gender"  
                            className="border px-2 rounded-lg w-full h-10 mt-2"  required
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
                            className="border px-2 rounded-lg w-full h-10 mt-2"  required
                        />
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label><b>Birthday</b></label>
                        <input 
                            value={newUser.birthday} 
                            onChange={(e) => setNewUser({ ...newUser, birthday: e.target.value })} 
                            type="date" 
                            placeholder="your birthday" 
                            className="border px-2 rounded-lg w-full h-10 mt-2" required
                        />
                    </div>
                </div>

                <button type="submit" onClick={handleAddUser} className="w-full h-10 bg-red-500 text-white font-bold my-2 hover:bg-red-800">Add User</button>
                <button type="submit" onClick={handleGeneratePdf} className="w-full h-10 bg-green-500 text-white font-bold my-2 hover:bg-green-800">Generate PDF</button>
            </form>

            <hr className="h-1 w-full bg-black my-1"/>
                    
        </div>
    )
}

export default InsertCompany;
