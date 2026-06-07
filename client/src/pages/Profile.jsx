import {useEffect, useState } from "react";
import { FaGithub, FaSearch} from "react-icons/fa"
import {useLocation} from "react-router-dom";
import { BiBriefcase } from "react-icons/bi";
import {sortRepos} from "../utils/sortRepos"

import api from "../services/githubApi"
import RepoCard from "../components/RepoCard";
import ProfileCard from "../components/ProfileCard";
import SearchBar from "../components/searchBar";
import Loading from "../components/Loading";
import "../index.css"

function Profile(){
    const location = useLocation();
    const [user, setUser] = useState(location.state);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState("updated")

    useEffect(()=>{
        const fetchRepos = async () => {
            try {
                const response = await api.get(
                    `/user/${user.login}/repos`
                );
                console.log("Repois called")
                console.log(response.data);
                setRepos(response.data);
                
            } catch (error) {
                console.error(error);
            } finally{
                setLoading(false);
            }
        };

        fetchRepos();
    },[])
    if(loading){
        return(
            <div className="text-white p-8">
                Loading repositories...
            </div>
        )
    }
    const sortedRepos = sortRepos(repos, sortBy);
    return (
        <div className="bg-zinc-950 min-h-screen hide-scrollbar">
            <div className="flex justify-between text-white p-2">
                <div className='flex items-center gap-5'  > 
                    <FaGithub className='size-8'/>  
                    <span className='text-xl font-bold'>
                        Github Explorer
                    </span>
                </div>
                <div className='flex justify-center p-2 text-zinc-400'>
                    <button className=" p-2 rounded-sm hover:bg-zinc-800 hover:scale-110 transition duration-300"><FaSearch className="size-5"/></button>
                </div>
            </div>
            <SearchBar/>
            <Loading/>
            <div className="grid grid-cols-1 min-[1000px]:grid-cols-[35%_65%] gap-3 p-3 ">
                <div>
                    {loading ? (<div>
                        </div>): (<ProfileCard user={user}/>)}
                </div>
                
                <div className="p-1">
                    <div className=" bg-zinc-950 p-1 ">
                        <div className="flex justify-between  max-[540px]:flex-col">
                            <h2 className="flex items-center p-3 text-2xl font-bold text-white">
                                Repositories ({repos.length})
                            </h2>
                            <div className="flex justify-between max-[540px]:justify-end text-zinc-400 p-3">
                                <button className="bg-zinc-700 px-3 py-1 rounded-lg hover:scale-105 ml-3 transition duration-300">
                                    Updated
                                </button >
                                <button className="bg-zinc-700 px-3 py-1 rounded-lg hover:scale-105 ml-3 transition duration-300">
                                    Stars
                                </button>
                                <button className="bg-zinc-700 px-3 py-1 rounded-lg hover:scale-105 ml-3 transition duration-300">
                                    Name
                                </button>
                            </div>
                        </div>
                        

                        <div className="p-1 hide-scrollbar">

                            <div className="flex flex-col gap-4">
                                {loading ? (
                                    <div className="text-zinc-400">
                                        Loading repositories...
                                    </div>
                                ) : repos.length === 0 ? (
                                    <div className="text-zinc-400">
                                        No repositories found
                                    </div>
                                ) : (
                                    repos.map((repo) => (
                                        <RepoCard
                                            key={repo.id}
                                            repo={repo}
                                        />
                                    ))
                                )}
                            </div>
                            
                        </div>
                        <button className="text-zinc-700">Load more</button>
                    </div>
                </div>

            </div>
            

        </div>
    )
}

export default Profile;

