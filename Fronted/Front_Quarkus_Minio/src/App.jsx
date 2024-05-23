import './App.css' 
import Sidebar from './components/Sidebar';
import Introduce from './components/Introduce';
import { useEffect, useState } from 'react';

function App() { 
  const [showToken , setShowToken] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowToken(true)
    }, 500);
  },[])
  
  return (
    <div className="w-full max-h-screen overflow-hidden bg-gradient-to-tl from-blue-800 to-red-800"> 
        {/* <div className='z-40'>
          <Navbar/>
        </div> */}
        <div className="flex flex-row overflow-hidden z-20">
            </div>
            <div className="fixed z-30">
                <Sidebar/>  
            </div>
            <div className="flex flex-col w-[100%] z-0 h-[120vh]">
                <div className='w-full bg-gradient-to-tr from-blue-600 to-red-500 h-fit overflow-hidden'>
                  <Introduce/>
                  <div className='bg-black w-full h-fit flex flex-col md:flex-row items-center justify-between px-5 '>
                    <h1 className="text-white">EARF &#9996;</h1> 
                    <h1 className="text-white">Pichaya Chantrasriwong</h1>
                    <h1 className="text-white">Connect Quarkus with React JS</h1>
                  </div>
                </div>
            </div>

            {/* {showToken == true && ( */}
              <div className={`${showToken == true ? 'bottom-10' : 'bottom-[-100%]'} transition-all w-full  z-50 flex justify-center fixed `}>
                <div className='mx-auto w-[300px] sm:w-[600px] md:w-[700px] xl:w-[1000px] absolute bottom-0 border-4 border-black bg-white backdrop-blur-3xl shadow-xl'>
                  <div className='w-full h-full flex flex-col md:flex-row justify-center items-center gap-16 p-3'>
                    <p className='text-sm font-medium text-black p-2 xl:h-20'>เราใช้คุกกี้เพื่อพัฒนาประสิทธิภาพ และประสบการณ์ที่ดีในการใช้เว็บไซต์ของคุณ คุณสามารถศึกษารายละเอียดได้ที่ นโยบายความเป็นส่วนตัว และสามารถจัดการความเป็นส่วนตัวเองได้ของคุณได้เองโดยคลิกที่ ตั้งค่า</p>
                    <div className='flex justify-center items-center gap-5 w-full p-2 lg:h-28'>
                      <button onClick={() => setShowToken(false)} className='border rounded-md bg-green-500 text-white cursor-pointer p-2 w-28 hover:bg-green-700'>อนุญาต</button>
                      <button onClick={() => setShowToken(false)} className='border rounded-md bg-red-500 text-white cursor-pointer p-2 w-28 hover:bg-red-700'>ไม่อนุญาต</button>
                    </div>
                  </div>
                </div>
              </div>
            {/* )} */}
            
        </div>
  )
}

export default App
