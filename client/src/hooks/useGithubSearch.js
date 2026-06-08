import api from "../services/githubApi"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const MAX_RECENT = 5

export function useGithubSearch(){
    const navigate = useNavigate() 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recentSearches, setRecentSearches] = useState([])

    const saveRecent = (username) => {
        const recent = JSON.parse(localStorage.getItem("recentSearches") || "[]");
        const filtered = recent.filter(u => u !== username)
        const updated = [username, ...filtered].slice(0, MAX_RECENT)
        localStorage.setItem("recentSeraches", JSON.stringify(updated))
        setRecentSearches(updated)
    }

    const handleSearch= async (username) => {
        setLoading(true);
        setError(null)

        try{
            const { data } = await api.get(`/user/${username}`);
            saveRecent(username)
            console.log(data)
            navigate(`/profile/${username}`, {state: {user: data} });

        }catch(err){
            if(err.response?.status === 404)
                setError("User not found")
            else if(err.response?.status === 403)
                setError("Rate Limit exceeded")
            else setError("Somthing went wrong")
        }
        finally{
        setLoading(false);
        }
    }
    return {handleSearch, loading, error, recentSearches}


}