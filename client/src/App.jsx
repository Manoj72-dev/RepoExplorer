import { useState } from 'react'
import { FaGithub, FaSearch} from "react-icons/fa"
function App() {
  return(
    <div className='flex flex-col bg-zinc-950 min-h-screen'>

      <div className='flex justify-between items-center p-4 text-white' >
        <div className='flex items-center gap-5'  > 
          <FaGithub className='size-8'/>  
          <span className='text-xl font-bold'>
            Github Explorer
          </span>
        </div>

        <button className='px-3 py-1 rounded-lg font-semibold hover:bg-zinc-800 transition duration-300 hover:scale-110 active:scale-95'>
            GitHub
        </button>

      </div>
      <hr className="border-zinc-800" />
      <div className='flex flex-col items-center text-white pt-32 '>
        <span className='text-4xl font-semibold'>
          Explore any GitHub
        </span>

        <span className='text-4xl font-semibold'>
          profile, instantly
        </span>

        <p className='max-w-xl text-center text-zinc-400 text-lg pt-2'>
          Search a username to see their profile, repositories, 
          languages, and activity — all in one place.
        </p>
      </div>
      <div className='flex justify-center p-2 gap-3 text-zinc-400'>
       
        <input 
          type="text" 
          placeholder='Enter a GitHub usename... ' 
          className='border border-zinc-800 p-2 rounded w-full max-w-xl
          focus:outline-none
          focus:border-blue-500
          focus:scale-102 transition duration-300
          hover:scale-102 transition duration-300' 
        />
        <button className='bg-zinc-800 px-3 py-1 rounded-md 
          hover:bg-zinc-800 transition duration-300 
          hover:scale-110 
          active:scale-95 '
        >
          Search
        </button>
      </div>
      <div className='flex bg-zinc-600'>
        
      </div>
    </div>
    
  )
}

export default App
