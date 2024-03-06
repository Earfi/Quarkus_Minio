import { useEffect, useState } from "react";
import Navbar from "../../components/product/Navbar";
import Sidebar from "../../components/Sidebar";

function Products() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700); 
        
 
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="w-full overflow-hidden min-h-[100vh]">  
            {loading ? (
                    <div className="flex justify-center items-center h-full w-full">
                            <span className="loading loading-bars loading-lg"></span>
                        </div>
                    ) : (
                        <>
                            <Navbar/>
                            <div className="flex flex-row mt-32">
                                <div className="fixed">
                                    <Sidebar/>  
                                </div>
                                <div className="flex flex-col w-[100%] min-h-[100vh]">   
                                    {/* products */}
                                    <div className="w-full h-full bg-slate-100">
                                        <div className="sm:w-[70%] h-full mx-auto "> 
                                            <h1 className="text-3xl font-bold pt-16 px-5 pb-5 sm:p-5">Products</h1>
 
                                            <div className="w-full h-fit mb-20 bg-white p-1 flex flex-wrap items-center justify-center">
                                                <div className="w-full flex justify-between flex-wrap gap-5 sm:px-10 py-2 h-full">
                                                    <select className="w-36 ">
                                                        <option value="">Class</option>
                                                        <option value="">Hypercar</option>
                                                        <option value="">Supercar</option>
                                                        <option value="">Sportcar</option>
                                                        <option value="">Motorcycle</option>
                                                    </select>
                                                    <select className="w-36 ">
                                                        <option value="">Rating</option>
                                                        <option value="">1</option>
                                                        <option value="">2</option>
                                                        <option value="">3</option>
                                                        <option value="">4</option>
                                                        <option value="">5</option>
                                                    </select>
                                                    <select className="w-36 ">
                                                        <option value="">Location</option>
                                                        <option value="">Thailand</option>
                                                        <option value="">Swedden</option>
                                                        <option value="">America</option>
                                                        <option value="">Japan</option>
                                                        <option value="">Korea</option>
                                                    </select>
                                                    <select className="w-36 ">
                                                        <option value="">Brands</option>
                                                        <option value="">BMW</option>
                                                        <option value="">BENZ</option>
                                                        <option value="">PAGANI</option>
                                                        <option value="">KOENIGSEGG</option>
                                                        <option value="">FORD</option>
                                                    </select>
                                                </div>
                                                <div className="w-full sm:w-[98%] flex justify-center border p-5">
                                                    <div className="w-full flex justify-center flex-wrap gap-5">

                                                        <div className="sm:max-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md shadow-xl">
                                                            <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                                            <p className="text-lg font-semibold">Ford Mustang</p>
                                                            <p className="text-xl font-normal">$21,000</p>
                                                            <hr />
                                                            <div className="flex justify-between items-center mt-2">
                                                                <p className="">&#9735; Thailand</p>
                                                                <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                                            </div>
                                                        </div>

                                                        <div className="sm:max-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md shadow-xl">
                                                            <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                                            <p className="text-lg font-semibold">BMW ขับเคลื่อนหลัง</p>
                                                            <p className="text-xl font-normal">$30,000</p>
                                                            <hr />
                                                            <div className="flex justify-between items-center mt-2">
                                                                <p className="">&#9735; Thailand</p>
                                                                <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                                            </div>
                                                        </div>

                                                        <div className="sm:max-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md shadow-xl">
                                                            <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                                            <p className="text-lg font-semibold overflow-hidden">Lamborghini Huracan</p>
                                                            <p className="text-xl font-normal">$51,000</p>
                                                            <hr />
                                                            <div className="flex justify-between items-center mt-2">
                                                                <p className="">&#9735; Thailand</p>
                                                                <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                                            </div>
                                                        </div>

                                                        <div className="sm:max-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md shadow-xl">
                                                            <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1611740801135-00c6dd101c34?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                                            <p className="text-lg font-semibold">Audi R8</p>
                                                            <p className="text-xl font-normal">$49,000</p>
                                                            <hr />
                                                            <div className="flex justify-between items-center mt-2">
                                                                <p className="">&#9735; Thailand</p>
                                                                <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                                            </div>
                                                        </div>

                                                        <div className="sm:max-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md shadow-xl">
                                                            <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                                            <p className="text-lg font-semibold">Ford Mustang</p>
                                                            <p className="text-xl font-normal">$21,000</p>
                                                            <hr />
                                                            <div className="flex justify-between items-center mt-2">
                                                                <p className="">&#9735; Thailand</p>
                                                                <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                                            </div>
                                                        </div>

                                                        <div className="sm:max-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md shadow-xl">
                                                            <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                                            <p className="text-lg font-semibold">BMW ขับเคลื่อนหลัง</p>
                                                            <p className="text-xl font-normal">$30,000</p>
                                                            <hr />
                                                            <div className="flex justify-between items-center mt-2">
                                                                <p className="">&#9735; Thailand</p>
                                                                <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                                            </div>
                                                        </div>

                                                        <div className="sm:max-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md shadow-xl">
                                                            <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                                            <p className="text-lg font-semibold">Audi R8</p>
                                                            <p className="text-xl font-normal">$49,000</p>
                                                            <hr />
                                                            <div className="flex justify-between items-center mt-2">
                                                                <p className="">&#9735; Thailand</p>
                                                                <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                                            </div>
                                                        </div>

                                                        <div className="sm:max-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md shadow-xl">
                                                            <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                                            <p className="text-lg font-semibold">Ford Mustang</p>
                                                            <p className="text-xl font-normal">$21,000</p>
                                                            <hr />
                                                            <div className="flex justify-between items-center mt-2">
                                                                <p className="">&#9735; Thailand</p>
                                                                <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                                            </div>
                                                        </div>

                                                        <div className="sm:max-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md shadow-xl">
                                                            <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                                            <p className="text-lg font-semibold">BMW ขับเคลื่อนหลัง</p>
                                                            <p className="text-xl font-normal">$30,000</p>
                                                            <hr />
                                                            <div className="flex justify-between items-center mt-2">
                                                                <p className="">&#9735; Thailand</p>
                                                                <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    )}
        </div>
    )
}

export default Products;


{/* <div className="max-w-44 h-[280px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md">
    <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
    <p className="text-lg font-semibold">Ford Mustang</p>
    <p className="text-xl font-normal">$21,000</p>
    <hr />
    <p className="">&#9735; Thailand</p>
    <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
</div> */}


{/* <div className="w-full h-fit bg-white p-5 flex items-center gap-5 overflow-x-scroll"> */}
                            {/* <div className="min-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md">
                                    <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                    <p className="text-lg font-semibold">Ford Mustang</p>
                                    <p className="text-xl font-normal">$21,000</p>
                                    <hr />
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="">&#9735; Thailand</p>
                                        <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                    </div>
                                </div>

                                <div className="min-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md">
                                    <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                    <p className="text-lg font-semibold">BMW ขับเคลื่อนหลัง</p>
                                    <p className="text-xl font-normal">$30,000</p>
                                    <hr />
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="">&#9735; Thailand</p>
                                        <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                    </div>
                                </div>

                                <div className="min-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md">
                                    <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                    <p className="text-lg font-semibold overflow-hidden">Lamborghini Huracan</p>
                                    <p className="text-xl font-normal">$51,000</p>
                                    <hr />
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="">&#9735; Thailand</p>
                                        <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                    </div>
                                </div>

                                <div className="min-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md">
                                    <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                    <p className="text-lg font-semibold">Audi R8</p>
                                    <p className="text-xl font-normal">$49,000</p>
                                    <hr />
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="">&#9735; Thailand</p>
                                        <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                    </div>
                                </div>

                                <div className="min-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md">
                                    <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                    <p className="text-lg font-semibold">Ford Mustang</p>
                                    <p className="text-xl font-normal">$21,000</p>
                                    <hr />
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="">&#9735; Thailand</p>
                                        <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                    </div>
                                </div>

                                <div className="min-w-52 h-[250px] bg-white-500 text-black border-2 border-black my-auto px-4 py-4 flex flex-col gap-1 overflow-hidden rounded-md">
                                    <img className="mx-auto w-full min-h-28 object-contain overflow-hidden" src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                                    <p className="text-lg font-semibold">BMW ขับเคลื่อนหลัง</p>
                                    <p className="text-xl font-normal">$30,000</p>
                                    <hr />
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="">&#9735; Thailand</p>
                                        <p className="text-orange-400">&#10030; &#10030; &#10030; &#10030; &#10030;</p>
                                    </div>
                                </div>

                            </div> */}