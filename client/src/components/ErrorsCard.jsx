import { CiCircleAlert } from "react-icons/ci";
import { LuUserRoundX } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";

function ErrorCard({error, setError}){
    if(!error) return null;
    if(error == "404")
        return (
            <div className="flex flex-col items-center p-4 gap-4">
              <p className="flex items-center gap-2 text-red-400/70 font-semibold">
                <CiCircleAlert size={20}/>
                No Github user found with that username 
              </p>

              <div className="relative flex bg-red-400/30 border border-red-400/50 gap-4 p-5 rounded-xl max-w-lg">
                  <button className="
                    absolute top-2 right-5 rounded-full p-0 
                    hover:bg-red-400/30 text-red-400/70 
                    hover:scale-110 transition duration-300 
                    active:scale-90"
                    onClick={() => setError(null)} > 
                    <IoCloseCircleOutline size={25} />
                  </button>
                  <div className="flex h-10 w-10 justify-center items-center rounded-full border border-red-400 text-red-400/70 shrink-0 ">
                    <LuUserRoundX size={22}/>
                  </div>
                  <div>
                    <h2 className="text-red-400/70 font-bold text-lg">
                      User not found
                    </h2>
                    <p className="text-red-300/70 font-semibold mt-1">
                      
                      doesn't exist on GitHub. Double-check the spelling
                    </p>
                  </div>
                  
              </div>
            </div>
        )
    
}
export default ErrorCard;