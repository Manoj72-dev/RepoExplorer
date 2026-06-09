import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function RecentProfileCard({user, onRemove}){
  const navigate = useNavigate()
    return(
          <div className="flex relative border border-zinc-700 gap-3 bg-zinc-800 p-3 rounded-2xl hover:border-zinc-400 transition duration-300 " 
            onClick={() => navigate(`/profile/${user.login}`, { state: { user } })}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-15 h-15 rounded-full"
            />
            <div className="flex flex-col mr-3">
              <h3 className="text-white mt-2 font-semibold text-lg leading-tight">
                {user.name || user.login}
              </h3>
              <p className="text-zinc-400 leading-tight">
                @{user.login}
              </p>
            </div>
            <button 
              className="absolute top-1 right-1 
              rounded-md text-white bg-zinc-800 
              p-1 
              hover:bg-zinc-700 transition duration-300"
              onClick={(e) =>{e.stopPropagation(); onRemove(user)}}
            >
              <IoClose />
            </button>
          </div>
    )
}
export default RecentProfileCard;