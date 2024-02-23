import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Service() {
    return (
        <div className="w-full overflow-hidden mb-20"> 
            <Navbar/>
            <div className="flex flex-row pt-20">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="ml-[80px] flex flex-col w-[100%]"> 
                    <div className="mx-auto w-full md:w-[900px] my-10 overflow-hidden rounded-3xl h-full">
                        {/* <div className="card xl:card-side bg-base-100 shadow-xl">
                            <figure><img src="https://images.unsplash.com/photo-1707343848873-d6a834b5f9b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-96" alt="Album"/></figure>
                            <div className="card-body w-96 h-fit">
                                <h2 className="card-title">มีปัญหาสอบถาม!!</h2>
                                <p>08X-XXX-XXXX</p>
                                <input type="text" className="border p-2 rounded-xl" placeholder="what problum!!"/>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">SEND</button>
                                </div>
                            </div>
                        </div> 


                        <div className="carousel carousel-end rounded-box w-full h-80 mt-10 mx-auto">
                            <div className="carousel-item">
                                <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" alt="Drink" />
                            </div> 
                            <div className="carousel-item">
                                <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" alt="Drink" />
                            </div> 
                            <div className="carousel-item">
                                <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" alt="Drink" />
                            </div> 
                            <div className="carousel-item">
                                <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" alt="Drink" />
                            </div> 
                            <div className="carousel-item">
                                <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" alt="Drink" />
                            </div> 
                            <div className="carousel-item">
                                <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" alt="Drink" />
                            </div> 
                            <div className="carousel-item">
                                <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" alt="Drink" />
                            </div>
                        </div> */}

                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default Service;