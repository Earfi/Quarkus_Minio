import Sidebar from "../../components/Sidebar";
import Footer from "../../components/product/Footer";
import Items from "../../components/product/Items";
import CatagoryRows from "../../components/product/CatagoryRows";

const ProductByCatagory = () => {
    return (
        <div className="w-full h-full relative min-h-[90vh]">         
            <div className="relative flex flex-row z-20 pt-20">
                <div className="absolute z-50">
                    <Sidebar/>  
                </div>
                <div className="bg-white border w-full md:w-[80%] mx-auto min-h-[100vh] h-fit">
                    <div className="w-full h-full">
                        <div className="w-full h-full">
                            <h1 className="text-center font-bold text-xl my-5">FOOD</h1>
                            <div className="w-[300px] h-[200px] sm:w-[500px] sm:h-[300px] mx-auto my-10 bg-white object-contain">  
                                <img src="../../products/home//intro_food.jpg" className="object-cover w-full h-full"/>
                            </div>
 
                            {/* product */}

                            <div className="w-full h-full p-5 bg-gray-100 ">
                                <h1 className="font-bold text-xl p-2">Products</h1>
                                <div className="w-full h-full flex flex-wrap gap-3"> 
                                    <Items/>
                                    <Items/>
                                    <Items/>
                                    <Items/>
                                    <Items/>
                                    <Items/>
                                </div>
                            </div>

                            {/* catagory */}

                            <CatagoryRows/>


                        </div> 
                    </div>
                    <Footer/>
                </div>  
            </div>   
        </div>
    )
}

export default ProductByCatagory