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
    try { 
      if (bucket == "" || bucket == "Please Selete") {
        Swal.fire({
            title: "Please Selete Bucket!!",
            text: "Please Selete Bucket!!",
            icon: "warning"
          });
        return;
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
      <div className="w-full md:w-[600px] lg:w-[800px]  bg-gray-200 h-fit p-2 py-10 mx-auto border-black border-2">
        <div className="w-full overflow-hidden rounded-2xl transition-all">
          <h1
            className="bg-orange-500 p-2 cursor-pointer text-3xl hover:bg-red-300 px-10 text-white font-bold rounded-xl"
            onClick={() => setOpenJson(!openJson)}
          >
            Json
          </h1>
          <div
            className={` ${
              openJson == true ? "h-[500px]" : "h-0"
            } overflow-hidden transition-all`}
          >
            <div className="left-0 z-20  w-full mx-auto flex flex-col lg:flex-row md:justify-center items-center md:items-start gap-5 p-2 transition-all">
              <div className="max-w-xs mx-auto lg:m-0 h-fit p-2 border rounded-lg bg-gray-100 text-sm lg:mt-12">
                <h1 className="font-bold mb-1">รูปแบบ Json ที่ส่งไป</h1>
                <textarea
                  className="w-full h-80 mb-2 resize-none border rounded-md p-2 text-xs"
                  value={jsonData}
                  readOnly
                />
                <button
                  className={`bg-${
                    copied ? "red" : "green"
                  }-500 w-48 text-white px-4 py-2 rounded hover:bg-${
                    copied ? "red" : "green"
                  }-600`}
                  onClick={copyJsonData}
                >
                  {copied ? "Copied!" : "Copy JSON Data"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="my-2">
          <h1>
            <b>Select Bucket to Collect Files!!</b>
          </h1>
          <select
            onChange={(e) => setBucket(e.target.value)}
            content="Bucket"
            className="border border-gray-500 cursor-pointer hover:bg-gray-500 hover:text-white my-2"
            required
          >
            {allBuckets.length == 0 && (
              <>
                <option className="m-5 bg-red-500 text-white font-mono border-l-red-500 border p-2">
                  No Bucket !!!
                </option>
              </>
            )}
            <option className="bg-black text-white hover:cursor-none ">
              Please Select
            </option>
            {allBuckets.map((post) => (
              <>
                <option
                  className='m-5 text-black bg-white hover:bg-red-400 hover:text-white hover:cursor-pointer"'
                  key={post}
                  value={post}
                >
                  {post}
                </option>
              </>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start w-full my-2">
          <label>
            <b>File Name</b>
          </label>
          <input
            onChange={(e) => setFileName(e.target.value)}
            type="text"
            placeholder="input file name"
            className="border px-2 rounded-lg w-full h-10 mt-2"
          />
        </div>
        <hr className="h-2 bg-black" />
        <div className="flex flex-col items-start w-full my-2">
          <label>
            <b>Sender Address</b>
          </label>
          <input
            type="text"
            placeholder="input Sender Address"
            className="border px-2 rounded-lg w-full h-10 mt-2"
            value={senderAddress}
            onChange={(e) => setSenderAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-full my-2">
          <label>
            <b>Date</b>
          </label>
          <input
            type="text"
            placeholder="input date"
            className="border px-2 rounded-lg w-full h-10 mt-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-full my-2">
          <label>
            <b>Recipient Name</b>
          </label>
          <input
            type="text"
            placeholder="input recipient name"
            className="border px-2 rounded-lg w-full h-10 mt-2"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-full my-2">
          <label>
            <b>Recipient Address</b>
          </label>
          <input
            type="text"
            placeholder="input recipient Address"
            className="border px-2 rounded-lg w-full h-10 mt-2"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-full my-2">
          <label>
            <b>Salutation</b>
          </label>
          <input
            type="text"
            placeholder="input salutation"
            className="border px-2 rounded-lg w-full h-10 mt-2"
            value={salutation}
            onChange={(e) => setSalutation(e.target.value)}
          />
        </div>
        <div class="flex flex-col items-start w-full my-2">
          <label>
            <b>Paragraph 1</b>
          </label>
          <textarea
            type="text"
            placeholder="input paragraph 1"
            class="border px-2 rounded-lg w-full mt-2 h-44"
            value={content1}
            onChange={(e) => setContent1(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-start w-full my-2">
          <label>
            <b>Paragraph 2</b>
          </label>
          <textarea
            type="text"
            placeholder="input paragraph 2"
            className="border px-2 rounded-lg w-full mt-2 h-44"
            value={content2}
            onChange={(e) => setContent2(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-full my-2">
          <label>
            <b>Paragraph 3</b>
          </label>
          <textarea
            type="text"
            placeholder="input paragraph 3"
            className="border px-2 rounded-lg w-full mt-2 h-44"
            value={content3}
            onChange={(e) => setContent3(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-full my-2">
          <label>
            <b>Closing</b>
          </label>
          <input
            type="text"
            placeholder="input closing"
            className="border px-2 rounded-lg w-full h-10 mt-2"
            value={closing}
            onChange={(e) => setClosing(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-full my-2">
          <label>
            <b>Signature</b>
          </label>
          <input
            type="text"
            placeholder="input signature"
            className="border px-2 rounded-lg w-full h-10 mt-2"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />
        </div>
      <button
        type="submit"
        onClick={handleGeneratePdf}
        className="w-full h-10 bg-green-500 text-white font-bold my-2 hover:bg-green-800"
      >
        Generate PDF
      </button>
      </div>
    </div>
  );
}

export default InsertLetter;
