const axios = require('axios')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

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

    return response
}

module.exports = { getUser, getRepos }