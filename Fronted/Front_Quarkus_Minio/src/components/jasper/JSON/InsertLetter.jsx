import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

function InsertLetter() {
  const [allBuckets, setAllBuckets] = useState([]);
  const [bucket, setBucket] = useState("");

  const [fileName, setFileName] = useState("");

  const [senderAddress, setSenderAddress] = useState("");
  const [date, setDate] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [salutation, setSalutation] = useState("");
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [content3, setContent3] = useState("");
  const [closing, setClosing] = useState("");
  const [signature, setSignature] = useState("");

  const [copied, setCopied] = useState(false);
  const [openJson, setOpenJson] = useState(false);
  const [jsonData] = useState(`{
        "senderAddress": "123 Main St, Cityville, State, ZIP",
        "date": "February 18, 2024",
        "recipientName": "John Doe",
        "recipientAddress": "456 Elm St, Townsville, State, ZIP",
        "salutation": "Dear John,",
        "content1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque commodo quam, at laoreet orci facilisis at. Donec pulvinar ante vel neque cursus, ut ultrices nunc vulputate. Cras vehicula malesuada purus at lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque commodo quam, at laoreet orci facilisis at. Donec pulvinar ante vel neque cursus, ut ultrices nunc vulputate. Cras vehicula malesuada purus at lacinia.",
        "content2": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque commodo quam, at laoreet orci facilisis at. Donec pulvinar ante vel neque cursus, ut ultrices nunc vulputate. Cras vehicula malesuada purus at lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque commodo quam, at laoreet orci facilisis at. Donec pulvinar ante vel neque cursus, ut ultrices nunc vulputate. Cras vehicula malesuada purus at lacinia.",
        "content3": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque commodo quam, at laoreet orci facilisis at. Donec pulvinar ante vel neque cursus, ut ultrices nunc vulputate. Cras vehicula malesuada purus at lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque commodo quam, at laoreet orci facilisis at. Donec pulvinar ante vel neque cursus, ut ultrices nunc vulputate. Cras vehicula malesuada purus at lacinia.",
        "closing": "Sincerely,",
        "signature": "John Doe"
      }
      `);

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
    };
    getAllBacket();
  }, []);

  const handleGeneratePdf = async () => {
    // try { 
      if (bucket == "" || bucket == "Please Selete") {
        Swal.fire({
            title: "Please Selete Bucket!!",
            text: "Please Selete Bucket!!",
            icon: "warning"
          });
        return;
      // }else if(senderAddress.length == 0 || date.length == 0 || recipientName.length == 0 || recipientAddress.length == 0 || salutation.length == 0 || content1.length == 0 || content2.length == 0 || content3.length == 0 || closing.length == 0 || signature.length == 0){
        // alert("senderAddress")
      
      }
      
    const dataToSend = {
        senderAddress: senderAddress,
        date: date,
        recipientName: recipientName,
        recipientAddress: recipientAddress,
        salutation: salutation,
        content1: content1,
        content2: content2,
        content3: content3,
        closing: closing,
        signature: signature,
    };

    const response = await fetch(
        `http://localhost:8080/api/v1/report/generate/${fileName}/${bucket}/3`,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
        }
    );

    console.log(response);

    // if (!response.ok) {
    //   throw new Error("Failed to generate PDF");
    // }

    const responseData = await response.blob();
    saveAs(responseData, `${fileName}` + ".pdf");

      
    // } catch (error) {
    //   console.error("Error generating PDF:", error);
    // }
  };
  
  return (
    <form className="my-5 px-5 w-full">
        <div className="w-full bg-white h-fit p-6 py-8 mx-auto border-black border-2 rounded-lg">
            <h1 className="text-3xl font-bold text-red-700 text-center">Letter</h1>
            <div className="my-4">
                <h1 className="font-semibold text-sm py-2">Select Bucket to Collect Files!!</h1>
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
            <div className="flex flex-col items-start w-full my-4">
                <label className="font-semibold text-sm">File Name</label>
                <input
                    onChange={(e) => setFileName(e.target.value)}
                    type="text"
                    placeholder="input file name"
                    className="border px-3 py-2 rounded-lg w-full mt-2 text-xs"
                    required
                />
            </div>
            <hr className="my-6 border-black" />
            <div className="flex w-full flex-wrap gap-6 h-fit">
                <div className="flex flex-col items-start w-full lg:w-1/3">
                    <label className="font-semibold text-sm">Sender Address</label>
                    <textarea
                        placeholder="input Sender Address"
                        className="border px-3 py-2 rounded-lg w-full mt-2 text-xs"
                        value={senderAddress}
                        onChange={(e) => setSenderAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col items-start w-full lg:w-1/4">
                    <label className="font-semibold text-sm">Date</label>
                    <input
                        type="text"
                        placeholder="input date"
                        className="border px-3 py-2 rounded-lg w-full mt-2 text-xs"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col items-start w-full lg:w-1/4">
                    <label className="font-semibold text-sm">Recipient Name</label>
                    <input
                        type="text"
                        placeholder="input recipient name"
                        
                        className="border px-3 py-2 rounded-lg w-full mt-2 text-xs"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col items-start w-full lg:w-1/3">
                    <label className="font-semibold text-sm">Recipient Address</label>
                    <textarea
                        placeholder="input recipient Address"
                        
                        className="border px-3 py-2 rounded-lg w-full mt-2 text-xs"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col items-start w-full lg:w-1/4">
                    <label className="font-semibold text-sm">Salutation</label>
                    <input
                        type="text"
                        placeholder="input salutation"
                        
                        className="border px-3 py-2 rounded-lg w-full mt-2 text-xs"
                        value={salutation}
                        onChange={(e) => setSalutation(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col items-start w-full lg:w-1/3">
                    <label className="font-semibold text-sm">Paragraph 1</label>
                    <textarea
                        placeholder="input paragraph 1"
                        
                        className="border px-3 py-2 rounded-lg w-full mt-2 text-xs"
                        value={content1}
                        onChange={(e) => setContent1(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col items-start w-full lg:w-1/3">
                    <label className="font-semibold text-sm">Paragraph 2</label>
                    <textarea
                        placeholder="input paragraph 2"
                        
                        className="border px-3 py-2 rounded-lg w-full mt-2 text-xs"
                        value={content2}
                        onChange={(e) => setContent2(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col items-start w-full lg:w-1/3">
                    <label className="font-semibold text-sm">Paragraph 3</label>
                    <textarea
                        placeholder="input paragraph 3"
                        
                        className="border px-3 py-2 rounded-lg w-full mt-2 text-xs"
                        value={content3}
                        onChange={(e) => setContent3(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col items-start w-full lg:w-1/4">
                    <label className="font-semibold text-sm">Closing</label>
                    <input
                        type="text"
                        placeholder="input closing"
                        
                        className="border px-3 py-2 rounded-lg w-full mt-2 text-xs"
                        value={closing}
                        onChange={(e) => setClosing(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col items-start w-full lg:w-1/4">
                    <label className="font-semibold text-sm">Signature</label>
                    <input
                        type="text"
                        placeholder="input signature"
                        
                        className="border px-3 py-2 rounded-lg w-full mt-2 text-xs"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        required
                    />
                </div>
            </div>
            <hr className="my-2"/>
            <div className="flex gap-2">
                <p onClick={() => setOpenJson(!openJson)} className="mt-2 bg-red-500 text-xs text-white p-2 rounded hover:bg-red-900 font-bold cursor-pointer">Json</p>
                <button type="submit" onClick={handleGeneratePdf} className="mt-2 bg-green-500 text-xs text-white p-2 rounded hover:bg-green-900 font-bold">Generate PDF</button>
            </div>
            <div className="w-full overflow-hidden rounded-2xl transition-all">
                <div className={`overflow-hidden transition-all ${openJson ? "max-h-96" : "max-h-0"}`}>
                    <div className="w-full mx-auto flex flex-col items-center md:items-start gap-5 p-2">
                        <div className="w-full lg:w-auto p-4 border rounded-lg bg-gray-100 text-sm">
                            <h1 className="font-bold mb-2">รูปแบบ JSON ที่ส่งไป</h1>
                            <textarea
                                className="w-full h-80 mb-2 resize-none border rounded-md p-2 text-xs"
                                value={jsonData}
                                readOnly
                            />
                            <button
                                className={`w-48 text-white px-4 py-2 rounded transition ${copied ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                                onClick={copyJsonData}
                            >
                                {copied ? "Copied!" : "Copy JSON Data"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
);

}

export default InsertLetter;
