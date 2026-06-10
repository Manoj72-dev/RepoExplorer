const axios = require('axios')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const SORT_MAP = {
    'updated'   : 'updated',
    'stars'     : 'updated',   
    'name'      : 'full_name',  
}
if (!GITHUB_TOKEN) console.warn('⚠️  GITHUB_TOKEN not set — unauthenticated rate limits apply');

const github =axios.create({
    baseURL: 'https://api.github.com',
    headers:{
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
    },
})

async function getUser(username){
    const response = await github.get(`/users/${username}`)
   
    return {
    login:        response.data.login,
    name:         response.data.name,
    bio:          response.data.bio,
    avatar_url:   response.data.avatar_url,
    followers:    response.data.followers,
    following:    response.data.following,
    public_repos: response.data.public_repos,
    location:     response.data.location,
    blog:         response.data.blog,
    hireable:     response.data.hireable,
    created_at:   response.data.created_at
  }
}
async function getRepos(username, page = 1, sort = 'updated'){
        const githubSort = SORT_MAP[sort] || 'updated'

    const response = await github.get(`/users/${username}/repos`,{
        params:{
            per_page: 30,
            page,
           sort: githubSort,
        }
    })

    const repos = response.data.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,

        language: repo.language,

        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        open_issues_count: repo.open_issues_count,

        updated_at: repo.updated_at,

        homepage: repo.homepage,
        topics: repo.topics,
        visibility: repo.visibility,
        default_branch: repo.default_branch
    }));

    const languages = (page === 1 || page === "1") ?repos.reduce((acc, repo)=>{
                                    if(repo.language){
                                        acc[repo.language] = (acc[repo.language] || 0)+1
                                    }
                                    return acc
                                 }, {})
                                : null
    console.log(typeof page)
    return {repos , languages}
}

async function getLanguages(username){
    let allRepos = []
    let page = 1

    while(true) {
        const response = await github.get(`/users/${username}/repos`,{
            params:{
                per_page:100, page
            }
        })
        allRepos = [...allRepos, ...response.data]
        if(response.data.length < 100)
            break;
        page++;
    }
    return allRepos.reduce((acc, repo) => {
        if(repo.language){
            acc[repo.language] = (acc[repo.language] || 0) +1
        }
        return acc
    }, {})
}

module.exports = { getUser, getRepos, getLanguages }