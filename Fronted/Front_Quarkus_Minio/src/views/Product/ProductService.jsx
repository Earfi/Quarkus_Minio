import React from 'react' 
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/product/Footer'

const ProductService = () => {
    return(
        <div className="w-full overflow-hidden min-h-[90vh]">       
            <div className="flex flex-row mt-20">
                <div className="absolute">
                    <Sidebar/>  
                </div>
                <div className="bg-white border w-full md:w-[80%] mx-auto min-h-[100vh] h-fit">
                    <div className='h-96 p-5'>
                        <h1 className='text-xl text-center font-bold my-5'>SERIVCE</h1>
                        <p className='indent-10'>นี่คือ website ขายสินค้าของเรา เป็นแพลตฟอร์มที่เปิดโอกาสให้กับผู้ขายสินค้าต่างๆ ที่ต้องการขายสินค้าออนไลน์ในประเทศไทย โดยให้ความสำคัญกับการเสนอสินค้าที่มีคุณภาพและหลากหลาย</p>
                    </div>  
                    <Footer/>
                </div>  
            </div>
        </div>
    )
}

export default ProductService