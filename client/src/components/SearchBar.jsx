import { useState } from "react";

function SearchBar({onSearch, loading}){
    const [username, setUsername] = useState("");
    
    const handleSubmit = () => {
        if(!username.trim() || loading){
            return;
        }

        onSearch(username)
        
    };

    return(
        <div className='flex justify-center p-2 gap-3 text-zinc-400' >
      
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
            <button 
                onClick={handleSubmit}
                className={` bg-zinc-800 px-3 py-1 rounded-md 
                    hover:bg-zinc-800 transition duration-300 
                    hover:scale-110 
                    active:scale-95
                    min-w-27
                    ${loading ? "animate-pulse cursor-not-allowed" : ""}
                `}
            >
                {loading ? "Searching..." : "Search"}
            </button>
        </div>
   ) 
}
export default SearchBar;
