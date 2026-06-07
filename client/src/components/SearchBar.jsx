import { useState } from "react";
import {useUser} from "../context/UserContext" 

function SearchBar(){
    const {user, setUser} = useUser();
    const [userName, setUserName] = useState("")

    return(
        <div className='flex justify-center p-2 gap-3 text-zinc-400'>
      
            <input 
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
            >
                Search
            </button>
        </div>
   ) 
}
export default SearchBar;
