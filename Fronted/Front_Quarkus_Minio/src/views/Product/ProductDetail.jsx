import Sidebar from "../../components/Sidebar";
import Footer from "../../components/product/Footer";
import Items from "../../components/product/Items";
import CatagoryRows from "../../components/product/CatagoryRows";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductDetail = () => {
    const navigate = useNavigate();
    const [num,setNum] = useState(1);

    const [product,setProduct] = useState({
        "name":"ผลไม้ขวด",
        "introduce":"สัปปะรดคัดแล้ว จากดวงจันทร์ อุดมไปด้วยแร่ธาตุนับหมื่นชนิด กินแล้ว... ร่างกายสดชื่น !!!",
        "introDetail":"หม่าล่า - ก็คือหม่าล่า แม้ว่าหน้าตาจะละม้ายคล้ายคลึงกันระหว่าง มะแขว่น และ มะข่วงก็ตาม แต่กลิ่นจะมีความหอมที่แตกต่างจากมะแขว่นของทางเหนือเป็นอย่างยิ่ง หม่าล่า - ก็คือหม่าล่า แม้ว่าหน้าตาจะละม้ายคล้ายคลึงกันระหว่าง มะแขว่น และ มะข่วงก็ตาม แต่กลิ่นจะมีความหอมที่แตกต่างจากมะแขว่นของทางเหนือเป็นอย่างยิ่ง หม่าล่า - ก็คือหม่าล่า แม้ว่าหน้าตาจะละม้ายคล้ายคลึงกันระหว่าง มะแขว่น และ มะข่วงก็ตาม แต่กลิ่นจะมีความหอมที่แตกต่างจากมะแขว่นของทางเหนือเป็นอย่างยิ่ง ",
        "otherDetail":"<b>มะแขว่น</b> - เครื่องเทศเมืองเหนือ อีกชนิดหนึ่งซึ่งถือได้ว่าเป็นพืชเศรษฐกิจที่สำคัยเลยทีเดียว พันธุ์ไม้ชนิดนี้จะพบมากทางภาคเหนือของประเทศไทย โดยจะพบขึ้นอยู่ตามป่าดิบบนพื้นที่ระดับต่ำไปจนถึงสูงจากระดับน้ำทะเล 500 เมตร ขึ้นไป แต่มะแขว่นที่มีคุณภาพที่ดีและให้กลิ่นหอมควรจะอยู่ที่ระดับควมสูงตั้งแต่ 800-1400 เมตร และ ยิ่งหากได้มะแขว่นจากป่าธรรมชาติด้วยแล้วก็จะถือว่าเป็นเครื่องเทศชั้นยอดเลยที่เดียว เหตุผลง่ายๆ ก็คือความเป็นพืชอินทรีย์ (organic) ยังไงละ เพราะพืชอินทรีย์โดยทั่วไปจะให้ความหอม และ รสชาติที่ดีกว่า ปัจจุบันนี้มีมะแขว่นที่มาจากหลายแหล่ง ทั้งที่เก็บมาจากป่า และ แลูกเองในเชิงเกษตร เหตุเพราะพื้นที่ป่าถูกทำลายไปมากจึงมีผู้ที่หันมาปลูกมะแขว่นขายในหลายพื้นที่ ปัจจุบันนี้แหล่งของมะแขว่นใหญ่ๆ จะมาจาก จ.แม่ฮ่องสอน น่าน พะเยา และ เชียงราย แต่จากการที่เราอยู่ในอุตสาหกรรมนี้มานานจึงสามารถบอกได้ว่า ผลผลิตของมะแขว่นที่ดีที่สุดมาจาก อ.งาว จ.ลำปาง และ บ้านดอยฮาง อ.เมือง จ.เชียงราย แม้ว่าจะมีหลายๆแหล่งที่สามารถผลิตมะแขว่นได้ แต่ความเผ็ดและความหอมนั้นไม่สามารถสู้มะแขว่นแห้งที่มาจากทั้งสองแหล่งได้ แต่เป็นที่น่าเสียดายอย่างยิ่งว่า มะแขว่นดอยฮาง ในปัจจุบันนี้แทบไม่เหลือแล้ว เนื่องจาการบุกรุกแผ้วถางป่า "
    })

    const numProducts = (detail) => { 
        if(detail == "+"){
            setNum(num + 1)
        }else if(num > 1 && detail == "-"){
            setNum(num - 1)
        }
    }

    return (
        <div className="w-full h-full relative min-h-[90vh]">      
            <div className="relative flex flex-row z-20 pt-20">
                <div className="absolute z-50">
                    {/* <Sidebar/>   */}
                </div>
                <div className="bg-white border w-full md:w-[80%] mx-auto min-h-[100vh] h-fit">
                    <div className="w-full h-full">
                        <div className="w-full h-full relative">
                            <p className='rotate-180 text-3xl cursor-pointer float-start absolute top-0 left-2' onClick={() => navigate(-1)}>&#10145;</p>
                            <h1 className="text-center font-bold text-xl mt-5">{product.name}</h1>
                            <br />
                            
                            <div className="flex flex-wrap justify-center items-start h-full p-2">
                                <div className="w-[300px] h-[200px] sm:w-[500px] sm:h-[300px] mb-2 bg-white object-contain">  
                                    <img src="../../products/home//intro_food.jpg" className="object-cover w-full h-full"/>
                                </div>  

                                <div className="w-[500px] border min-h-[300px] p-5 mb-2">
                                    <h1 className="text-md font-bold">{product.introduce}</h1>
                                    <p className="my-2 overflow-hidden text-sm">{product.introDetail}</p>
                                    <p>ราคา <b className="text-2xl text-red-500">500</b> บาท</p>
                                    <ul className="flex items-center text-2xl text-orange-500">
                                        <li>&#10030;</li>
                                        <li>&#10030;</li>
                                        <li>&#10030;</li>
                                        <li>&#10030;</li>
                                        <li>&#10030;</li>
                                    </ul> 
                                    <p>สินค้าเหลือ <b className="text-red-500">50</b> ชิ้น / ขายแล้ว <b>10,000</b> ชิ้น</p>
                                    <div className="flex flex-wrap justify-between items-center">
                                        <div className="flex justify-center items-center gap-5 my-2">
                                            <p>จำนวนสินค้า</p>
                                            <p onClick={() => numProducts("-")} className="cursor-pointer">&#9866;</p>
                                            <p><b>{num}</b></p>
                                            <p onClick={() => numProducts("+")} className="cursor-pointer">&#10010;</p> 
                                        </div>
                                        <div className="flex justify-center items-center gap-5 my-2"> 
                                            <button className="border px-1 py-2 font-serif bg-slate-200 rounded-md hover:bg-slate-400">เพิ่มลงตะกร้า</button>
                                            <Link to="/products/cart"><button className="border px-1 py-2 font-serif bg-slate-200 rounded-md hover:bg-slate-400">ซื้อสินค้า</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link to="/products/profile"> 
                                <div className="w-[full] border h-[80px] p-5 my-2 flex justify-around items-center bg-orange-500 gap-1">
                                    <div className="flex justify-center items-center gap-5 text-white"> 
                                        <img
                                            className={` hover:text-orange-400 h-12 w-12 object-cover bg-white border-2 border-black rounded-full`}
                                            src="../../..//profile-icon.png"
                                            alt=""
                                        /> 
                                        <div className="flex flex-col">
                                            <h1 className="text-xs">Pichaya Chantrasriwong</h1> 
                                            <p className="text-xs">เข้าร่วมเมื่อ 18/4/2567</p> 
                                        </div>
                                    </div>
                                    <button className="text-xs bg-white hover:bg-slate-100 px-3 py-2 rounded-md">ดูร้านค้า</button>
                                </div>
                            </Link>

                            <div className="collapse bg-base-200 my-5 w-[80%] mx-auto">
                                <input type="checkbox" /> 
                                <div className="collapse-title text-lg font-medium">
                                    รายละเอียดเพิ่มเติม
                                </div>
                                <div className="collapse-content bg-white border shadow-lg"> 
                                    <p className="pt-5 pr-20 text-sm">{product.otherDetail}</p>
                                    <div className="w-[300px] h-[200px] sm:w-[500px] sm:h-[300px] mx-auto my-10 bg-white object-contain">  
                                        <img src="../../products/home//intro_food.jpg" className="object-cover w-full h-full"/>
                                    </div>
                                </div>
                            </div>

                            {/* catagory */}

                            <CatagoryRows/>
 
                            {/* product */}

                            <div className="w-[95%] h-full p-5 bg-gray-100 border my-2 mx-auto">
                                <h1 className="font-bold text-xl p-2">Others Products</h1>
                                <div className="w-full h-full flex flex-wrap gap-3"> 
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

export default ProductDetail