import React from 'react'
import { motion } from "framer-motion"
import { useAuth } from "../../context/AuthContext";
import { Loader2 } from "../../components/UI/Loader"
import useLogout from "../../hooks/useLogout";

import Card from "../../components/feedComponents/Card"
import Button from "../../components/feedComponents/Button"
import AddPost from "../../components/feedComponents/AddPost"
import Sidebar from '../../components/feedComponents/Sidebar';
import LogoutNTheme from '../../components/feedComponents/LogoutNTheme';

const Feed = () => {
  const { auth } = useAuth();
  const { loading } = useLogout()


  return loading ? <Loader2 /> :
    (
      <motion.div className='flex   min-h-screen w-screen gap-2 px-2 pt-4' >

        {/***********  
     * @section_1
  *  *********** / */}

        <div className="secton1 flex flex-col p-2 bg-[var(--bg)]  w-[20%] h-92vh  rounded-sm">


          {/***********  
     * @Avatar
  *  *********** / */}


          <div className="flex flex-col items-center w-full p-2">
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7j9IDpZsbq4HghrNPneZustxYupRgrt0oQ&s'
              className="rounded-full bg-amber-200 h-20 w-20 md:h-20 md:w-20"
            />

            <h2 className='font-semibold'>{auth?.profile?.name}</h2>
          </div>


          {/***********  
      * @Sidebar
   *  *********** / */}

          <div className=' pt-2 h-full'>
            <aside className='w-full h-full mr-2 p-2 text-[var(--font)] bg-[var(--bg)] ' >
              <Sidebar />
            </aside>
          </div>
        </div>




        {/***********  
     * @Section_2
  *  *********** / */}

        <div className="section2 relative flex flex-col gap-2 bg-[var(--bg)]  w-[56%] rounded-sm p-2 ">

          <span className='font-[Futura-Bold] px-1'>Feeds</span>

          {/***********  
               * @Scroll_Card_Container
            *  *********** / */}


          <div className="flex  flex-col mt-5 items-center gap-2 max-h-[80vh] overflow-y-auto custom-scrollbar-hide">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <AddPost />
        </div>


        {/***********  
      * @Section_3
   *  *********** / */}


        <div className="section3 flex bg-[var(--bg)]  w-[25%] h-20vh p-2 rounded-sm">
          <span className='font-[Futura-Bold] p-2'>Stories</span>

          <LogoutNTheme />

        </div>

      </motion.div>
    )
}

export default Feed
