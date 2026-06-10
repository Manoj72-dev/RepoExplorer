import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  Briefcase,
  
} from "lucide-react";
import {formatNumber} from "../utils/formatNumber"

function ProfileCard({user}){
    return(
        <div className="flex flex-col gap-4 p-2 ">
            <div className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700">
                <div className="flex gap-4">
                            <img 
                                src={user.avatar_url} 
                                alt={user.login}
                                className="w-20 h-20 rounded-full"
                            />
                            <div>
                                <h1 className="text-3xl font-bold text-white leading-tight">
                                    {user.name || user.login}
                                </h1>

                                <p className="text-zinc-400 text-xl leading-tight">
                                    @{user.login}
                                </p>

                                {user.hireable && (
                                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-green-900/30 border border-green-600 px-3 py-1">
                                        <Briefcase size={14}/>
                                        <span className="text-green-400 text-sm">
                                            Available for hire
                                        </span>
                                    </div>
                                )}
                            </div>
                </div>
                <p className="mt-6 text-zinc-300 text-lg">
                            {user.bio || "No bio available"}
                </p>

                <div className="mt-6 flex flex-col  text-zinc-400">
                            {user.location && (
                                <div className="flex items-center gap-3 ">
                                    <MapPin size={18}/>
                                    <span>{user.location}</span>
                                </div>
                            )}
                            {user.blog &&(
                                <div className="flex item-center gap-3 ">
                                    <LinkIcon size={18}/>
                                    <a
                                        href={user.blog}
                                        target="_blank"
                                        className="hover:text-white"
                                    >
                                        {user.blog}
                                    </a>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <Calendar size={18}/>
                                <span>
                                    Joined {new Date(user.created_at).toLocaleDateString()}
                                </span>
                            </div>

                </div>

            </div >
            <div className="grid grid-cols-3 bg-zinc-800 justify-center text-zinc-400 rounded-2xl p-2 ">
                        <div className="flex flex-col justify-center items-center overflow-hidden ">
                            <span className="text-3xl font-bold leading-none">
                                {formatNumber(user.followers)}
                            </span>
                            <span className="text-lg font-semibold leading-none">
                                Followers
                            </span>
                        </div>
                        <div className="flex flex-col p-4 items-center border-l border-zinc-700">
                            <span className="text-3xl font-bold leading-none">
                                {formatNumber(user.following)}
                            </span>
                            <span className="text-lg font-semibold leading-none">
                                Following
                            </span>
                        </div>
                        <div className="flex flex-col p-4 items-center border-l  border-zinc-700">
                            <span className="text-3xl font-bold leading-none">
                                {formatNumber(user.public_repos)}
                            </span>
                            <span className="text-lg font-semibold leading-none">
                                Repos
                            </span>
                        </div>
            </div>
        </div>
    )
}
export default ProfileCard;