import Sidebar from "../../components/Sidebar";
import Footer from "../../components/product/Footer"; 

const ProductCatagory = () => {
  return (
    <div className="w-full h-full relative min-h-[90vh]">      
            <div className="relative flex flex-row z-20 pt-20">
                <div className="absolute z-50">
                    <Sidebar/>  
                </div>
                <div className="bg-white border w-full md:w-[80%] mx-auto min-h-[100vh] h-fit">
                    <div className="w-full h-full">
                        <div className="w-full h-full">
                            <div className="w-full h-full p-5 bg-gray-100">
                                <h1 className="font-bold text-xl p-2 text-center">Catagory</h1>
                                <div className="w-full h-full">
                                    <div className="flex flex-wrap gap-5 mt-5"> 
                                        <h1 className="h-20 w-[150px] px-5 bg-amber-800 hover:bg-red-800 rounded-full text-white font-bold flex justify-center items-center cursor-pointer">Food</h1>
                                        <h1 className="h-20 w-[150px] px-5 bg-amber-800 hover:bg-green-800 rounded-full text-white font-bold flex justify-center items-center cursor-pointer">Nature</h1>
                                        <h1 className="h-20 w-[150px] p-5 bg-amber-800 hover:bg-yellow-800 rounded-full text-white font-bold flex justify-center items-center cursor-pointer">Toys</h1>
                                        
                                        <h1 className="h-20 w-[150px] p-5 bg-amber-800 hover:bg-blue-800 rounded-full text-white font-bold flex justify-center items-center cursor-pointer">Food</h1>
                                        <h1 className="h-20 w-[150px] p-5 bg-amber-800 hover:bg-gray-800 rounded-full text-white font-bold flex justify-center items-center cursor-pointer">Nature</h1>
                                        <h1 className="h-20 w-[150px] p-5 bg-amber-800 hover:bg-pink-800 rounded-full text-white font-bold flex justify-center items-center cursor-pointer">Toys</h1>

                                    </div>
                                </div>
                            </div>


                        </div> 
                    </div>
                    <Footer/>
                </div>  
            </div>   
        </div>
  )
}

export default ProductCatagory