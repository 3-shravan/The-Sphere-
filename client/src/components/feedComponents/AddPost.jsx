import React from 'react'

const AddPost = () => {
  return (
    <div className='absolute px-3 py-1.5 font-[Gilroy-Medium] w-[97.7%] bottom-1 flex flex-col bg-[#1c1c1c] text-white font-bold rounded-sm min-h-18'>
      <div className='relative'>
        <input
          type="text"
          placeholder='Share Something !'
          className='bg-[#eae3d6] font-[Gilroy-Medium] rounded-full pl-11 w-[90%] py-1 placeholder:text-xs  placeholder:text-black/80 outline-none focus:text-black focus:text-sm'
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7j9IDpZsbq4HghrNPneZustxYupRgrt0oQ&s"
          className='h-8 w-8 rounded-full absolute top-0'
          alt=""
        />

        {/* <span className='px-4 text-xs h-8 flex items-center justify-center bg-white text-black rounded-full'>Send</span> */}
      </div>
    </div>
  )
}

export default AddPost
