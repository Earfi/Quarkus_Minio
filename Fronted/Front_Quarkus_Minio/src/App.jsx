import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './components/Sidebar';
 

function Introduce() {
  return (
    <div className="w-full overflow-hidden">
      <div className="mx-auto w-11/12 lg:w-4/5 shadow-sm my-5 flex flex-col lg:flex-row items-center justify-center p-10 gap-10 backdrop-blur-3xl bg-gradient-to-br from-purple-500 to-red-500">
        <div className="text-center lg:text-left">
          <h1 className="text-white text-2xl md:text-5xl font-bold lg:w-[500px]">Quarkus Minio Jasper Kafka React !!</h1>
          <p className="text-white">------------------</p>
          <p className="text-white text-lg sm:text-xl">Pichaya Chantrasriwong</p>
          <Link to="/bucket">
            <button className="text-red-500 text-xl font-medium border py-2 px-3 bg-white rounded-xl shadow-sm cursor-pointer hover:bg-gray-100 mt-5">Get Start</button>
          </Link>
        </div>
        <div className="block">
          <img src="../..//map.png" width={700} alt="" className="rounded-2xl shadow-2xl border w-80" />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowToken(true);
    }, 500);
  }, []);

  return (
    <div className="flex h-screen">
      <div className='hidden sm:block'>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full"> 
          <h1 className="text-gray-700 text-sm sm:text-3xl font-bold text-center h-20 shadow-md p-2">React Quarkus Minio Jasper Project</h1>
        <div className="flex-grow overflow-y-auto p-5">
          <Introduce/>
          <p className="mb-8">
            This is a project that explores the integration of React, Quarkus, Minio, and Jasper for building
            full-stack web applications. We aim to demonstrate how these technologies can work together seamlessly to
            create powerful and scalable applications.
          </p>
          <p className="mb-8">
            Our application allows users to manage files stored in Minio, generate reports using Jasper, and interact
            with the backend powered by Quarkus. With the combination of these technologies, we provide a robust
            solution for various business needs.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
          <ul className="list-disc ml-6 mb-8">
            <li>File management with Minio</li>
            <li>Report generation with Jasper</li>
            <li>Backend services with Quarkus</li>
            <li>User authentication and authorization</li>
            <li>Responsive and user-friendly interface</li>
          </ul>
          <p>
            We hope that this project serves as a valuable resource for developers looking to leverage these
            technologies in their own projects. Feel free to explore the various components and functionalities of our
            application!
          </p>
        </div>
        <footer className="bg-gray-800 text-white py-4 text-center">
          <div className="container mx-auto">
            <p>&copy; 2024 React Quarkus Minio Jasper Project</p>
            <div className="text-sm mt-2">
              <p className="mb-1">For more information, please visit:</p>
              <ul className="inline-block">
                <li className="mr-4 inline">
                  <a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-400">React Documentation</a>
                </li>
                <li className="mr-4 inline">
                  <a href="https://quarkus.io/guides/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-400">Quarkus Guides</a>
                </li>
                <li className="mr-4 inline">
                  <a href="https://docs.min.io/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-400">Minio Documentation</a>
                </li>
                <li className="mr-4 inline">
                  <a href="https://community.jaspersoft.com/documentation/jasperreports-server-install-guide/v630" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-400">JasperReports Server Install Guide</a>
                </li>
                <li className="mr-4 inline">
                  <a href="https://reactrouter.com/web/guides/quick-start" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-400">React Router Documentation</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
 
      </div>


      {showToken && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-2 md:mb-0">
            This website uses cookies to enhance user experience and analyze performance. By continuing to use this site,
            you agree to our use of cookies. You can manage your cookie preferences in our Privacy Policy.
          </p>
          <div className="flex flex-row justify-center items-center gap-5">
            <button
              onClick={() => setShowToken(false)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-xs"
            >
              Accept
            </button>
            <button
              onClick={() => setShowToken(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-xs"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
