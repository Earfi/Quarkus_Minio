import './App.css'

import Navbar from './components/Navbar' 
import Sidebar from './components/Sidebar';
import Introduce from './components/Introduce';
 

function App() { 
  
  return (
    <div className="w-full overflow-hidden"> 
        <Navbar/>
        <div className="flex flex-row pt-20">
            <div className="fixed z-50">
                <Sidebar/>  
            </div>
            <div className="ml-[80px] flex flex-col w-[100%]">
                <div className='w-full'>
                  <Introduce/>
                  <div className='bg-black w-full h-fit flex flex-col md:flex-row items-center justify-between px-5'>
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
