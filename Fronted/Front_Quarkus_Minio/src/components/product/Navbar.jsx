import { Link } from "react-router-dom";

function Navbar() { 
    
    return (
        <div className="z-50 h-32 w-full flex flex-col fixed">

            <div className="w-full h-24 bg-gray-700 text-xl font-medium text-white flex justify-center gap-20 items-center "> 
                <Link to="/products"><h1 className="hidden sm:block">PICHAYA</h1> </Link>
                <div className="flex justify-center items-center flex-col gap-2">
                    <div className="flex justify-center items-center gap-2">
                        <input type="text" placeholder="Search" className="w-[100px] md:w-[500px] h-10 p-2 text-black border-none rounded-md" />
                        <button className="w-10 h-10 bg-gray-800 text-3xl">&#10003;</button>
                    </div>  
                    <ul className="hidden sm:flex gap-5 text-sm">
                        <li>การแจ้งเตือน</li>
                        <li>ช่วยเหลือ</li>
                        <li>สมัครใหม่</li>
                        <li>เข้าสู่ระบบ</li>
                    </ul>  
                </div>
                <Link to="/products/select">
                    <div className="relative">
                        <h1 className="mr-9 sm:mr-0"><span>ตะกร้าสินค้า</span></h1>
                        <p className="absolute top-[-20px] left-24 font-bold text-md bg-red-500 w-8 h-8 text-center rounded-full">3</p>
                    </div>
                </Link>
            </div> 

            <div className="sm:flex w-full h-8 bg-red-600 font-medium text-white text-xs justify-between sm:justify-around items-center">

                <ul className="flex gap-5">
                    <li>Seller Centre</li>
                    <li>เริ่มต้นขายสินค้า</li>
                    <li>ดาวน์โหลด</li>
                    <li>ติดตามเราบน</li>
                </ul>    
                <ul className="flex gap-5">
                    <li>การแจ้งเตือน</li>
                    <li>ช่วยเหลือ</li>
                    <li>สมัครใหม่</li>
                    <li>เข้าสู่ระบบ</li>
                </ul> 
            </div>
            
        </div>
    )
}

export default Navbar;
