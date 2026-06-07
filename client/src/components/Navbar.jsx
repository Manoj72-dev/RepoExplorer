import { FaGithub} from "react-icons/fa"

function Navbar(){
    return(
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
    )
}
export default Navbar