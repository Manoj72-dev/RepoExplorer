import { useGithubSearch } from "../hooks/useGithubSearch"
import { FaGithub } from "react-icons/fa"
import HeroSection from "../components/HeroSection"
import SearchBar from "../components/SearchBar"

function Home() {
  const { handleSearch, loading, error, recentSearches } = useGithubSearch()
  
  return(
  <div className='flex flex-col bg-zinc-950 min-h-screen'>
      <div className='flex justify-between items-center p-4 text-white' >
        <div className='flex items-center gap-5'  > 
          <FaGithub className='size-8'/>  
          <span className='text-xl font-bold'>
            Github Explorer
          </span>
        </div>
        <button className='px-3 py-1 rounded-lg font-semibold hover:bg-zinc-800 transition duration-300 hover:scale-110 active:scale-95'
          onClick={() => window.open("https://github.com/Manoj72-dev/RepoExplorer","_blank")}
        >
          GitHub
        </button>
      </div>
      
      <hr className="border-zinc-800" />

      <HeroSection/>

      <SearchBar onSearch={handleSearch}
                loading ={loading}
      />
      <div>
       
      </div>
    
  </div>
    
  )
}

export default Home
