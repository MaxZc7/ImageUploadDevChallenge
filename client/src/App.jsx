import { useState } from 'react';
import axios from 'axios';
import './index.css';
import dragDropImg from './assets/dragDrop.svg';

function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePageUrl, setImagePageUrl] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [imageName, setImageName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    const h4Img = document.querySelector('.h4Img');
    const buttonImg = document.querySelector('.buttonImg');
    const UploadOther = document.querySelector('.UploadOther')

    if (!image) {
      h4Img.innerHTML = '! Please enter a file !';
      h4Img.style.color = 'white';
      h4Img.style.background = '#10609289';
      buttonImg.style.display = 'block';
      UploadOther.style.display = 'none';
    } else {
      h4Img.style.display = 'none';
      buttonImg.style.display = 'none';
      UploadOther.style.display = 'block';
      setShowLoading(true);

    }

    try {
      
      const config = {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      };

      const response = await axios.post('/upload', formData, config);
      const { imageUrl, imagePageUrl } = response.data;

      setImageUrl(imageUrl);
      setImagePageUrl(imagePageUrl);
      console.log(imagePageUrl);

      setShowLoading(false);
      setShowImage(true);
      setUploadProgress(0);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleDragDrop = async (imagen) => {
    const formData = new FormData();
    formData.append('image', imagen);
    const buttonImg = document.querySelector('.buttonImg');
    const UploadOther = document.querySelector('.UploadOther')
    if (!imagen) {
      buttonImg.style.display = 'block';
      UploadOther.style.display = 'none';
    } else {
      buttonImg.style.display = 'none';
      UploadOther.style.display = 'block';
    }

    try {
      setShowLoading(true);

      const config = {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      };

      const response = await axios.post('/upload', formData, config);
      const { imageUrl, imagePageUrl } = response.data;

      const h4Img = document.querySelector('.h4Img');
      h4Img.style.display = 'none';
      setShowImage(true);

      setImageUrl(imageUrl);
      setImagePageUrl(imagePageUrl);
      console.log(imagePageUrl);

      setShowLoading(false);
      setShowImage(true);
      setUploadProgress(0);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleDragDrop(file);
  };

  const fileUploadNameHandle = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file ? file.name : '');
  };

  return (
    <>
      <div className="h-[95vh] w-full flex flex-col justify-center items-center bg-slate-200">
        <h1 className="font-light text-4xl m-2">Drag & drop </h1>
        <h2 className="font-light text-3xl">Or</h2>
        <label className="text-xl my-3 font-light rounded-2xl px-8 py-[5px]  bg-cyan-600 shadow-2xl hover:bg-white hover:text-cyan-600 duration-300 text-white hover:cursor-pointer tracking-wide">
          <input
            type="file"
            className="my-3 hidden"
            onChange={fileUploadNameHandle}
          />
          Select File
        </label>
        <p>{imageName}</p>
        <div
          className={
            showImage
              ? 'hidden'
              : showLoading
              ? 'hidden'
              : 'bg-slate-300 w-[400px] h-[255px] rounded-xl m-3 flex justify-center items-center'
          }
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {' '}
          <div className="flex flex-col">
            <img src={dragDropImg}></img>
            <p className=" text-gray-500">Drag & drop your image here</p>
          </div>
        </div>
        {showImage && (
          <img
            className="max-w-[600px] max-h-[500px] m-3"
            src={imageUrl}
            alt="Uploaded"
          />
        )}
        {showLoading && (
          <div className="loading  flex-col w-[350px] h-[125px] flex items-center justify-center bg-white m-3 rounded-2xl shadow-xl text-2xl font-light ">
            <h4 className="my-3"> Loading...</h4>
            {showLoading && (
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        )}

        <button
          className="bg-cyan-600 shadow-2xl hover:bg-white hover:text-cyan-600 duration-300 text-white rounded-2xl px-12 py-[6px] buttonImg"
          onClick={handleImageUpload}
        >
          Upload
        </button>
        <h4 className="h4Img p-1 px-8 font-semibold rounded-lg my-4 "></h4>
         <a className='UploadOther hidden bg-cyan-600 shadow-2xl hover:bg-white hover:text-cyan-600 duration-300 text-white rounded-2xl px-12 py-[6px]' href='/'>Upload Other</a>     
        {imageUrl && (
          <div className="text-xl font-light text-center">
            <p className="my-2">Image uploaded successfully!</p>

            <p className="my-2">
              View image{' '}
              <a
                href={imagePageUrl}
                className="text-blue-900 font-semibold "
                target="__BLANK"
              >
                here
              </a>
            </p>
          </div>
        )}
       
      </div>
      <footer className='h-[5vh] bg-slate-200 flex justify-center items-center  text-xl font-light'>
        <h2>Build By <a href='https://maximozaragoza.netlify.app/' className='c2e4ff'>MaxZ</a></h2>
      </footer>
    </>
  );
}

export default App;
