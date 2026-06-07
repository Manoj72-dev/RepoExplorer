const axios = require('axios')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
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
  }
}
async function getRepos(username, page = 1){
    const response = await github.get(`/users/${username}/repos`,{
        params:{
            per_page: 30,
            page,
            sort: 'updated',
        }
    })

     return response.data.map(repo => ({
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
        visibility: repo.visibility
    }));
}

module.exports = { getUser, getRepos }