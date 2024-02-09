import { useState } from "react";

function InsertAddress() { 
    const [firstName,setFirstName] = useState(null);
    const [lastName,setLastName] = useState(null);
    const [street,setStreet] = useState(null);
    const [city,setCity] = useState(null);
    
    const addAddress = async () => {
        const data = 
        {
            "firstname" : firstName,
            "lastname" : lastName,
            "street" : street,
            "city" : city
        }

        console.log(data);

        const res = await fetch(`http://localhost:8080/address/add`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log(res); 
     
        if (res.ok) {
            alert("Data added successfully!");
            window.location.reload();
        } else {
            alert("Failed to add data!");
            console.error("Failed to add data");
        } 
    }

    return (
        <div className="w-full xl:w-[1000px] bg-gray-100 h-fit border-2 border-black ">
            <h1 className="pt-5 pl-5 text-3xl font-medium  ">Inset User Address</h1>
            <hr />
            <div className="my-5 flex flex-wrap items-center justify-center sm:justify-start">
                <div className="flex flex-col w-60 m-5">
                    <label className="">Firstname</label>
                    <input onChange={(e) => setFirstName(e.target.value)} className="p-2" type="text" name="firstname" placeholder="firstname" />
                </div>

                <div className="flex flex-col w-60 m-5">
                    <label className="">Lastname</label>
                    <input onChange={(e) => setLastName(e.target.value)} className="p-2" type="text" name="lastname" placeholder="lastname" />
                </div>

                <div className="flex flex-col w-60 m-5">
                    <label className="">Street</label>
                    <input onChange={(e) => setStreet(e.target.value)} className="p-2" type="text" name="street" placeholder="street" />
                </div>

                <div className="flex flex-col w-60 m-5">
                    <label className="">City</label>
                    <input onChange={(e) => setCity(e.target.value)} className="p-2" type="text" name="city" placeholder="city" />
                </div>
            </div>

            <button onClick={addAddress} className="w-full bg-red-500 h-16 text-xl font-bold  hover:bg-red-800 cursor-pointer text-white">SEND</button>
        </div>    
    )
}

export default InsertAddress;