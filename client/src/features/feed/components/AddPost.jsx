import React from 'react'
import { MdPhotoAlbum } from "react-icons/md";
import { MdPhotoCamera } from "react-icons/md";
import { SiFiles } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";



const AddPost = () => {
  return (
    <div className='absolute px-3 py-1.5 font-[Gilroy-Medium] w-[97.7%] bottom-1  flex flex-col justify-center bg-[#efedd2] text-white font-bold rounded-sm min-h-20'>
      <div className='relative flex items-center gap-1'>
        <input
          type="text"
          placeholder='Share Something !'
          className='bg-[#fff] h-8 font-[Gilroy-Medium] rounded-full pl-11 border-zinc-300 border-1 pr-3 w-[80%] py-1 placeholder:text-xs placeholder:text-black/80 outline-none focus:text-black/90 focus:text-sm'
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7j9IDpZsbq4HghrNPneZustxYupRgrt0oQ&s"
          className='h-8 w-8 rounded-full absolute top-0'
          alt=""
        />
        <button className='w-[20%] text-xs h-8 py-1 flex items-center justify-center bg-[#131313] text-white rounded-full cursor-pointer'>Send</button>
      </div>

      {/***********  
           * @Line_2
        *  *********** / */}

      <div className='flex pt-2 px-2 items-center gap-5 font-[Gilroy-Medium] text-black text-xs cursor-pointer'>
        <span className='flex items-center gap-1'><SiFiles /> <span>Files</span></span>
        <span className='flex items-center gap-1'><MdPhotoAlbum /> <span>Photo</span></span>
        <span className='flex items-center gap-1'><MdPhotoCamera /> <span>Camera</span></span>
        <span className='flex items-center gap-1'><FaLocationDot /> <span>Location</span></span>
      </div>

    </div>
  )
}

export default AddPost
