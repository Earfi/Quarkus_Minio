import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import * as pdfjs from 'pdfjs-dist';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';

const ITEM_TYPE = 'FILE';

const FileItem = ({ fileDataWithColor, index, handleMoveFile, handleRemoveFile, previewPages }) => { 
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { type: ITEM_TYPE, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (item) => {
      if (item.index !== index) {
        handleMoveFile(item.index, index);
        item.index = index;
      }
    },
  });

  const handleRemove = () => {
    handleRemoveFile(index);
  };

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className='relative border p-2 shadow-xl rounded-sm overflow-hidden h-[230px]' style={{ backgroundColor: fileDataWithColor.color }}>
        {/* <img src="../../../public/Rc213V-93-44.jpg" alt={`Preview of Page 1 of ${fileDataWithColor.file.name}`} className='w-full' /> */}
        <iframe src={URL.createObjectURL(fileDataWithColor.file)} className='w-full max-h-[200px] overflow-y-hidden object-contain'/>
        {/* <img src={`https://via.placeholder.com/300x400?text=Preview+of+${fileDataWithColor.file.name}`} alt={`Preview of ${fileDataWithColor.file.name}`} className='w-full h-full object-cover' /> */}
        <p className='text-xs md:text-sm mt-2 h-14 text-black font-bold drop-shadow-2xl bg-white p-2 overflow-hidden'>{index+1}. {fileDataWithColor.file.name}</p>
        <button 
          onClick={handleRemove} 
          className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
        >
          &times;
        </button>
      </div>
    </div>
  );
};

const MergeFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mergedFileUrl, setMergedFileUrl] = useState(null);
  const [previewPages, setPreviewPages] = useState([]);
  const [mergedFilName, setMergedFileName] = useState(null);
  const [modeOption, setModeOption] = useState("merge");

  useEffect(() => {
    if (selectedFiles.length > 0) {
      loadPreviewPages();
    }
  }, [selectedFiles]);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (!files || files.length === 0) {
      return;
    }
  
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
  
    const newFiles = files.map((file) => ({
      file: file,
      color: getRandomColor(),
    }));
  
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
  
      newFiles.forEach(newFile => {
        const existingIndex = updatedFiles.findIndex(f => f.file.name === newFile.file.name);
  
        if (existingIndex !== -1) {
          updatedFiles[existingIndex] = newFile;
        } else {
          updatedFiles.push(newFile);
        }
      });

      // console.log(updatedFiles);
  
      return updatedFiles;
    });
  };  

  const loadPreviewPages = async () => {
    const previewBlobs = await generatePreview(selectedFiles.map(f => f.file));
    const pages = previewBlobs.map(blob => URL.createObjectURL(blob));
    setPreviewPages(pages);
  };

  const handleClearFiles = () => {
    setSelectedFiles([]);
  };

  const handleMergeFiles = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((data) => {
      formData.append('file', data.file);
    });

    try {
      const response = await fetch('http://localhost:8080/pdf/merge', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setMergedFileUrl(url);
      } else {
        console.error('Failed to merge PDF files:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to merge PDF files:', error.message);
    }
  };

  const handleMoveFile = (dragIndex, hoverIndex) => {
    const draggedFile = selectedFiles[dragIndex];
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(dragIndex, 1);
    updatedFiles.splice(hoverIndex, 0, draggedFile);
    setSelectedFiles(updatedFiles);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const generatePreview = async (fileList) => {
    const previewPromises = fileList.map(async (file) => {
      const pdfUrl = URL.createObjectURL(file);
      const pdf = await pdfjs.getDocument(pdfUrl).promise;
      const page = await pdf.getPage(1);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        });
      });
    });

    return Promise.all(previewPromises);
  };

  const handleMergedFileNameChange = (e) => {
    setMergedFileName(e.target.value);
  };

  const downloadMergedFile = () => {
    if (mergedFileUrl) {
      const a = document.createElement('a');
      a.href = mergedFileUrl;
      a.download = mergedFilName + '.pdf';
      a.click();
    }
  };

  const handleChangeMode = (e) => {
    setModeOption(e.target.value);
    console.log(e.target.value);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="fixed z-50">
          <Sidebar/>  
      </div>
      <div className='min-h-screen bg-gray-100 flex flex-col md:flex-row'>
        <div className={`w-full bg-white ${selectedFiles.length > 0 ? 'md:w-[70%]' : 'w-full'}`}>
          <div className='p-8'>
            <h1 className='text-center font-bold text-4xl text-gray-800 mb-8'>Merge PDF Files</h1>
            <div className='flex items-center justify-center gap-2 w-full h-20'>
              <select
                value={modeOption}
                onChange={handleChangeMode}
                className='select select-bordered w-full max-w-xs h-10'
              >
                <option value='merge'>Merge File</option>
                <option value='split'>Split File</option>
                <option value='convert'>Convert PDF to JPG</option>
              </select>
              <input
                type='file'
                accept='application/pdf'
                multiple
                onChange={handleFileSelect}
                className='hidden'
                id='fileInput'
              />
              <label
                htmlFor='fileInput'
                className='btn'
              >
                Add More Files
              </label>
            </div>
            <p className={`text-red-500 ${modeOption == "merge" ? 'display' : 'hidden'}`}><b>You can click and hold the file and drop it in the file location as desired. And you can see the file order in the right box.</b></p>
            {selectedFiles.length > 0 && (
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                {selectedFiles.map((data, index) => (
                  <div key={index} className='p-2'>
                    <FileItem
                      fileDataWithColor={data}
                      index={index}
                      handleMoveFile={handleMoveFile}
                      handleRemoveFile={handleRemoveFile}
                      previewPages={previewPages}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {selectedFiles.length > 0 && (
          <div className='bg-gray-100 w-full md:w-[30%] border border-black'>
            <div className='p-8'>
              <h2 className='text-xl font-bold mb-2'>Selected Files:</h2>
              <ul className='list-disc list-inside border-2 border-black'>
                {selectedFiles.map((data, index) => (
                  <li key={index} className='text-lg text-gray-700 flex justify-between items-center bg-white p-2 hover:bg-gray-200 rounded-md'>
                    <div className='flex'>
                      <span><b>{index + 1}. &nbsp;</b></span>
                      <span>{data.file.name}</span>
                    </div>
                    <button onClick={() => handleRemoveFile(index)} className='text-red-500 hover:text-red-700'>
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleClearFiles}
                className='mt-4 bg-gray-500 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded-md font-bold cursor-pointer w-full'
              >
                CLEAR FILES
              </button>
              <button
                onClick={handleMergeFiles}
                className='mt-4 bg-black hover:bg-gray-700 text-white text-sm py-2 px-4 rounded-md font-bold cursor-pointer w-full'
              >
                MERGE
              </button>
              <div className='flex items-center justify-start w-full h-full'>
                <label htmlFor='fileName' className='text-sm text-gray-600 mr-2 h-full font-bold'>
                  File name:
                </label>
                <input
                  id='fileName'
                  type='text' 
                  onChange={handleMergedFileNameChange}
                  className='p-2 rounded-lg border text-sm w-[300px] outline-none focus:ring-2 focus:ring-blue-500 mt-5'
                  placeholder='Input file merge name...'
                />
              </div>
              <p className='text-red-500 font-bold text-sm my-5'>** If the file has been edited, press merge again. **</p>
              {mergedFileUrl && (
                <div className='mt-4'>
                  <h2 className='text-xl font-bold mb-2'>Merged PDF:</h2>
                  <div className='flex flex-col gap-2'>
                    <a href={mergedFileUrl} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>
                      Preview Merged PDF
                    </a>
                    <h1 onClick={downloadMergedFile} className='text-blue-500 underline cursor-pointer'>
                      Download Merged PDF
                    </h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
      <Footer/>
    </DndProvider>
  );
};

export default MergeFiles;
