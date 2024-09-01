"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import gifPath1 from '../../../public/assets/gif_for_sundai.gif'; // Your first GIF
// import gifPath2 from '../../../public/assets/another_gif.gif';  // Your second GIF (replace with actual path)

const GifDisplay = ({ altText = 'GIF', width, height }) => {
  const [currentGif, setCurrentGif] = useState(gifPath1); // Default to the first GIF
  const [isToggled, setIsToggled] = useState(false); // Track the toggle state

  // const toggleGif = () => {
  //   setIsToggled(!isToggled);
  //   setCurrentGif(isToggled ? gifPath1 : gifPath2);
  // };

  return (
    <div className="flex flex-col justify-center items-center mb-[-3rem]">
      <Image
        src={currentGif}
        alt={altText}
        width={width}
        height={height}
        className="rounded-lg shadow-lg"
        quality={100} // Ensures the image quality is high
      />
      <div className="mt-6">
        {/* <div
          className={`w-16 h-6 bg-gray-400 rounded-full p-1 cursor-pointer ${isToggled ? 'bg-blue-500' : 'bg-gray-400'}`}
          onClick={toggleGif}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${isToggled ? 'translate-x-10' : 'translate-x-0'}`}
          ></div>
        </div> */}
      </div>
    </div>
  );
};

export default GifDisplay;
