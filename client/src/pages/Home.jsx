import { useGithubSearch } from "../hooks/useGithubSearch"
import { FaGithub } from "react-icons/fa"
import HeroSection from "../components/HeroSection"
import SearchBar from "../components/SearchBar"
import PageTransition from "../components/PageTransition"
import ErrorCard from "../components/ErrorsCard"
import RecentProfileCard from "../components/RecentProfileCard"

import {AnimatePresence,LayoutGroup, motion} from "framer-motion"
import { useEffect, useState } from "react"
function Home() {

  const [Searches, setSearches] = useState([]);

  const { handleSearch, setError, loading, error } = useGithubSearch()

  useEffect(() => {
    const recent = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );

    console.log("Loaded:", recent);
    setSearches(recent);
  }, []);

  const clearSearch = (user) => {
    const updated = Searches.filter(
      (u) => u.login !== user.login
    );

    setSearches(updated);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updated) 
    );
  };

  return(
    <PageTransition>
      <div className='flex flex-col bg-zinc-950 min-h-screen'>
          <div className='flex justify-between items-center p-4 text-white bg-zinc-950' >
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
          
          <hr className="border-zinc-700" />

          <HeroSection/>
          <SearchBar onSearch={handleSearch}
                    loading ={loading}
          />
          <LayoutGroup>
          <motion.div layout>

            <motion.div
              layout
              className="flex flex-col items-center overflow-hidden min-h-16"
            >
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ErrorCard
                      error={error}
                      setError={setError}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {Searches.length > 0 && (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex flex-col bg-zinc-950 rounded-2xl m-4 gap-4 p-6">
                    <h1 className="text-zinc-400 font-bold">
                      RECENT SEARCHES
                    </h1>

                    <div className="flex overflow-x-auto md:flex-wrap hide-scrollbar gap-4">
                      {Searches.map((user) => (
                        <motion.div
                          key={user.login}
                          layout
                          className="flex-none"
                        >
                          <RecentProfileCard
                            user={user}
                            onRemove={clearSearch}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </LayoutGroup>
      </div>
    </PageTransition>
  )
}

export default Home
