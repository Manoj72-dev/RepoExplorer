import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { FaGithub, FaSearch } from "react-icons/fa"
import { useGithubSearch } from "../hooks/useGithubSearch";
import { sortRepos } from "../utils/sortRepos"
import api from "../services/githubApi"
import ProfileCard from "../components/ProfileCard"
import RepoCard from "../components/RepoCard"
import LanguageCard from "../components/LanguageCard";
import "../index.css"
function Profile() {
    const { username } = useParams()
    const location = useLocation()

    const [user, setUser] = useState(location.state?.user || null)
    const [repos, setRepos] = useState([])
    const [languages, setLanguages] = useState(null)
    const [sort, setSort] = useState("updated")
    const [isLocalSort, setIsLocalSort] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [profileLoading, setProfileLoading] = useState(true)
    const [profileError, setProfileError] = useState(null)   // ← fixed setter name

    const { handleSearch, loading: searchLoading, error: searchError, recentSearches } = useGithubSearch()

    useEffect(() => {
        if (isLocalSort) return   
        const fetchAll = async () => {
            try {
                setProfileLoading(true)
                setPage(1)

                let userData = user
                if (!user) {
                    const userRes = await api.get(`/user/${username}`)
                    userData = userRes.data
                    setUser(userData)
                }

                if (userData.public_repos <= 30) {
                    const reposRes = await api.get(`/user/${username}/repos?page=1&sort=${sort}`)
                    setRepos(reposRes.data.repos)
                    setLanguages(reposRes.data.languages)
                    setHasMore(false)
                    setIsLocalSort(true)   

                } else {
                    const [reposRes, langRes] = await Promise.all([
                        api.get(`/user/${username}/repos?page=1&sort=${sort}`),
                        api.get(`/user/${username}/languages`)
                    ])
                    setRepos(reposRes.data.repos)
                    setLanguages(langRes.data)
                    setHasMore(reposRes.data.repos.length === 30)
                    setIsLocalSort(false)  // ← backend handles sort
                }

            } catch (err) {
                setProfileError("Something went wrong")
            } finally {
                setProfileLoading(false)
            }
        }
        fetchAll()
    }, [username, sort])

    const handleLoadMore = async () => {
        try {
            setLoadingMore(true)
            const nextPage = page + 1
            const reposRes = await api.get(`/user/${username}/repos?page=${nextPage}&sort=${sort}`)
            setRepos(prev => [...prev, ...reposRes.data.repos])
            setPage(nextPage)
            setHasMore(reposRes.data.repos.length === 30)
        } catch (err) {
            setProfileError("Something went wrong")
        } finally {
            setLoadingMore(false)
        }
    }

    const sortButtons = [
        { label: "Updated", value: "updated" },
        { label: "Stars",   value: "stars" },
        { label: "Name",    value: "name" },
    ]


    const displayRepos = sort === "stars"
    ? sortRepos(repos, "stars")      
    : isLocalSort
        ? sortRepos(repos, sort)   
        : repos 

    return (
        <div className="bg-zinc-950 min-h-screen overflow-hidden">
            <div className="flex justify-between text-white p-2">
                <div className='flex items-center gap-5'>
                    <Link to="/">
                        <FaGithub className='size-8' /> 
                    </Link>
                    
                    <span className='text-xl font-bold'>Github Explorer</span>
                </div>
                <div className='flex justify-center p-2 text-zinc-400'>
                    <button className="p-2 rounded-sm hover:bg-zinc-800 hover:scale-110 transition duration-300">
                        <FaSearch className="size-5" />
                    </button>
                </div>
            </div>
            <hr className="text-zinc-700"/>
            {profileError && (
                <div className="text-red-500 text-center mt-4">{profileError}</div>
            )}

            <div className="grid grid-cols-1 min-[1000px]:grid-cols-[35%_65%] gap-3 p-3">
                {/* Left side */}
                <div className="min-[1000px]:sticky min-[1000px]:top-3 min-[1000px]:self-start gap-3">
                    {user && <ProfileCard user={user} />}
                    {languages && <LanguageCard languages={languages}/>}
                </div>
                {!profileLoading &&
                <div className="p-2">
                    <div className="bg-zinc-950 p-1">
                        <div className="flex justify-between max-[540px]:flex-col">
                            <h2 className="flex items-center p-3 text-2xl font-bold text-white">
                                Repositories ({repos.length})
                            </h2>
                            <div className="flex justify-between max-[540px]:justify-end text-zinc-400 p-3">
                                {sortButtons.map(btn => (
                                    <button
                                        key={btn.value}
                                        onClick={() => setSort(btn.value)}
                                        className={`px-3 py-1 rounded-lg hover:scale-105 ml-3 transition duration-300
                                            ${sort === btn.value
                                                ? "bg-zinc-500 text-white"
                                                : "bg-zinc-700"
                                            }`}
                                    >
                                        {btn.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="min-[1000px]:overflow-y-auto min-[1000px]:max-h-screen hide-scrollbar">
                            <div className="flex flex-col gap-4">
                                {profileLoading ? (
                                    <div className="text-zinc-400">Loading repositories...</div>
                                ) : displayRepos.length === 0 ? (
                                    <div className="text-zinc-400">No repositories found</div>
                                ) : (
                                    displayRepos.map((repo) => (
                                        <RepoCard key={repo.id} repo={repo} />
                                    ))
                                )}
                            </div>
                        </div>

                        {hasMore && (
                            <button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="text-zinc-400 hover:text-white transition duration-300 p-3"
                            >
                                {loadingMore ? "Loading..." : "Load more"}
                            </button>
                        )}
                    </div>
                </div>
}
            </div>
        </div>
    )
}

export default Profile;