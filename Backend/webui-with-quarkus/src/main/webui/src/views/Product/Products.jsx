import Sidebar from "../../components/Sidebar";
import Footer from "../../components/product/Footer";
import Items from "../../components/product/Items";
import CatagoryRows from "../../components/product/CatagoryRows";

function Products() { 
 
    return (
        <div className="w-full h-full relative min-h-[90vh]">       
            <div className="relative flex flex-row z-20 mt-20">
                <div className="absolute z-50">
                    <Sidebar/>  
                </div>
                <div className="bg-white border w-full md:w-[80%] mx-auto min-h-[100vh] h-fit">
                    <div className="w-full h-full">
                        <div className="w-full h-full">

                             <div className="carousel w-full">
                                <div id="slide1" className="carousel-item relative w-full">
                                    <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide4" className="btn btn-circle">❮</a> 
                                    <a href="#slide2" className="btn btn-circle">❯</a>
                                    </div>
                                </div> 
                                <div id="slide2" className="carousel-item relative w-full">
                                    <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide1" className="btn btn-circle">❮</a> 
                                    <a href="#slide3" className="btn btn-circle">❯</a>
                                    </div>
                                </div> 
                                <div id="slide3" className="carousel-item relative w-full">
                                    <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide2" className="btn btn-circle">❮</a> 
                                    <a href="#slide4" className="btn btn-circle">❯</a>
                                    </div>
                                </div> 
                                <div id="slide4" className="carousel-item relative w-full">
                                    <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide3" className="btn btn-circle">❮</a> 
                                    <a href="#slide1" className="btn btn-circle">❯</a>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="w-[300px] h-[200px] sm:w-[500px] sm:h-[300px] mx-auto my-10 bg-white object-contain">  
                                <img src="../../products/home//intro_food.jpg" className="object-cover w-full h-full"/>
                            </div>  */}

                            {/* catagory */}

                            <CatagoryRows/>
 
                            {/* product */}

                            <div className="w-[95%] h-full p-5 bg-gray-100 border my-2 mx-auto">
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


                        </div> 
                    </div>
                    <Footer/>
                </div>  
            </div>   
        </div>
    )
}

export default Products;
