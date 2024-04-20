import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow,Pagination,Navigation } from 'swiper/modules';

function Introduce() {
    return (
        <div className="w-full overflow-hidden">  
            <div className="mx-auto w-[90%] lg:h-[400px] shadow-2xl my-20 flex flex-col lg:flex-row items-center justify-center p-10 gap-10 backdrop-blur-3xl bg-white/30 ">
                <div className="">
                    <h1 className="text-white text-5xl font-bold w-full lg:w-[500px]">Quarkus Minio Jasper Kafka React !!</h1>  
                    <p className="text-white">------------------</p>
                    
                  <p>{import.meta.env.API_URL}</p>
                    <p className="text-white text-xl">Pichaya Chantrasriwong</p>
                    <Link to="/bucket"><button className="text-white text-xl font-medium border py-2 px-3 bg-red-500 rounded-xl shadow-sm cursor-pointer hover:bg-red-800 mt-5">Get Start</button></Link>
                </div>
                {/* <div> 
                  <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={
                      {
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier:2.5,
                      }
                    }
                    pagination={{el:'.swiper-pagination',clickable:true}}
                    navigation={{
                      nextEl:'.swiper-button-next',
                      prevEl:'.swiper-button-prev',
                      clickable:true,
                    }}
                    modules={[EffectCoverflow,Pagination,Navigation]}
                    className='swiper-controler'
                    >
                    <SwiperSlide>
                      <img className="rounded-2xl shadow-2xl border object-cover overflow-hidden h-40" src="../..//map.png" alt="slide_image"/>
                    </SwiperSlide> 
                    <SwiperSlide>
                      <img className="rounded-2xl shadow-2xl border object-cover overflow-hidden h-40" src="../..//map.png" alt="slide_image"/>
                    </SwiperSlide> 
                    <SwiperSlide>
                      <img className="rounded-2xl shadow-2xl border object-cover overflow-hidden h-40" src="../..//map.png" alt="slide_image"/> 
                    </SwiperSlide> 
                    <SwiperSlide>
                      <img className="rounded-2xl shadow-2xl border object-cover overflow-hidden h-40" src="../..//map.png" alt="slide_image"/> 
                    </SwiperSlide> 
                    
                    <div className="slider-controler">
                      <div className="swiper-button-prev slider-arrow">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                      </div>
                      <div className="swiper-button-next slider-arrow">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                      </div>
                      <div className="swiper-pagination"></div> 
                    </div>
                  </Swiper>
                </div> */}
                <div className="">
                    <img src="../..//map.png" width={700} alt="" className="rounded-2xl shadow-2xl border w-80"/>
                </div>
            </div>
        </div>
    )
}

export default Introduce;