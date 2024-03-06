import Navbar from "../../components/product/Navbar";
import Sidebar from "../../components/Sidebar";

function ProductSelect() {
    return(
        <div className="w-full overflow-hidden ">  
            <Navbar/>
            <div className="flex flex-row mt-32">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-[100%] min-h-[100vh]">
                    <div className="w-full h-full bg-slate-100">
                        <div className="md:w-[70%] h-full mx-auto "> 
                            <div className="flex justify-between items-center">
                                <h1 className="text-xl font-bold pt-16 px-5 pb-5 sm:p-5">Your Select Item</h1>
                                <h1 className="font-semibold pt-16 px-5 pb-5 sm:p-5">ทั้งหมด <span className="font-bold text-red-500">3</span> Item</h1>
                            </div>
                            <div className="w-full min-h-60 bg-slate-400 p-1 flex flex-col gap-2 py-5 items-center justify-center">

                                <div className="w-full bg-white h-40 flex justify-center items-center gap-2 border rounded-xl shadow-md p-3">
                                    <img className=" max-h-28 object-contain overflow-hidden rounded-xl w-[30%]" src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                    
                                    <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-20 w-[30%]">
                                        <p className="text-lg font-semibold sm:w-[60%]">Ford Mustang</p>
                                        <p className="text-xl sm:w-[40%] text-orange-500 font-bold">$21,000</p> 
                                    </div>

                                    <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-20 w-[40%]">
                                        <div className="flex justify-center items-center gap-5 ">
                                            <p className="cursor-pointer">&#9866;</p>
                                            <p>2</p>
                                            <p className="cursor-pointer">&#10010;</p> 
                                        </div> 
                                        <button className="font-bold text-white w-20 bg-red-500 p-1 rounded-lg hover:bg-red-800">DELETE</button>    
                                    </div>
                                </div>

                                <div className="w-full bg-white h-40 flex justify-center items-center gap-2 border rounded-xl shadow-md p-3">
                                    <img className=" max-h-28 object-contain overflow-hidden rounded-xl w-[30%]" src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                    
                                    <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-20 w-[30%]">
                                        <p className="text-lg font-semibold sm:w-[60%]">BMW ขับเคลื่อนหลัง</p>
                                        <p className="text-xl sm:w-[40%] text-orange-500 font-bold">$30,000</p> 
                                    </div>

                                    <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-20 w-[40%]">
                                        <div className="flex justify-center items-center gap-5 ">
                                            <p className="cursor-pointer">&#9866;</p>
                                            <p>1</p>
                                            <p className="cursor-pointer">&#10010;</p> 
                                        </div> 
                                        <button className="font-bold text-white w-20 bg-red-500 p-1 rounded-lg hover:bg-red-800">DELETE</button>    
                                    </div>
                                </div>

                                <div className="w-full bg-white h-40 flex justify-center items-center gap-2 border rounded-xl shadow-md p-3">
                                    <img className=" max-h-28 object-contain overflow-hidden rounded-xl w-[30%]" src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                    
                                    <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-20 w-[30%]">
                                        <p className="text-lg font-semibold sm:w-[60%]">Lamborghini Huracan</p>
                                        <p className="text-xl sm:w-[40%] text-orange-500 font-bold">$51,000</p> 
                                    </div>

                                    <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-20 w-[40%]">
                                        <div className="flex justify-center items-center gap-5 ">
                                            <p className="cursor-pointer">&#9866;</p>
                                            <p>1</p>
                                            <p className="cursor-pointer">&#10010;</p> 
                                        </div> 
                                        <button className="font-bold text-white w-20 bg-red-500 p-1 rounded-lg hover:bg-red-800">DELETE</button>    
                                    </div>
                                </div>
 
                            </div>
                                <div className="w-full bg-white h-20 flex items-center justify-end gap-10 pr-10">
                                    <h1 className="font-bold">ทั้งหมด <span className="text-red-500">$102,000</span></h1>
                                    <button className="bg-red-500 p-3 h-12 rounded-md font-bold text-white hover:bg-red-800">จ่ายเงิน</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductSelect;