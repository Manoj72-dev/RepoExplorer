import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar"
import api from "../services/githubApi"
import HeroSection from '../components/HeroSection'

function Home() {

  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const handleSearch = async() => {
    if(!username.trim()){
      return;
    }
    try{
      const response = await api.get(`/user/${username}`);
      console.log(response.data)
      navigate(`/profile/${response.data.login}`,{
        state: response.data
      })
    }catch(error){
      console.error(error);
    }
  };
  
  return(
    <div className='flex flex-col bg-zinc-950 min-h-screen'>
      
      <Navbar/>
      
      <hr className="border-zinc-800" />

      <HeroSection/>

      <div className='flex justify-center p-2 gap-3 text-zinc-400'>
      
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter a GitHub usename... ' 
          className='border border-zinc-800 p-2 rounded w-full max-w-xl
          focus:outline-none
          focus:border-blue-500
          focus:scale-102 transition duration-300
          hover:scale-102 transition duration-300' 
          required
        />
        <button className='bg-zinc-800 px-3 py-1 rounded-md 
          hover:bg-zinc-800 transition duration-300 
          hover:scale-110 
          active:scale-95 '
          onClick={handleSearch}
          
        >
          Search
        </button>
      </div>
      <div className='flex bg-zinc-600'>
        
      </div>
    </div>
    
  )
}

export default Home
