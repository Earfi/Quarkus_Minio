import './App.css'

import Navbar from './components/Navbar' 
import Sidebar from './components/Sidebar';
import Introduce from './components/Introduce';
 

function App() { 
  
  return (
    <div className="w-full overflow-hidden "> 
        <div className='z-40'>
          <Navbar/>
        </div>
        <div className="flex flex-row mt-20 overflow-hidden z-20">
            <div className="fixed z-10">
                <Sidebar/>  
            </div>
            <div className="flex flex-col w-[100%] z-0">
                <div className='w-full bg-gradient-to-tr from-blue-600 to-red-500 h-fit overflow-hidden'>
                  <Introduce/>
                  <div className='bg-black w-full h-fit flex flex-col md:flex-row items-center justify-between px-5 '>
                    <h1 className="text-white">EARF &#9996;</h1> 
                    <h1 className="text-white">Pichaya Chantrasriwong</h1>
                    <h1 className="text-white">Connect Quarkus with React JS</h1>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default App
