const express           = require('express')
const router            = express.Router()
const githubService     = require('../services/GithubService')
const cacheMiddleware   = require('../middleware/cache')

router.get('/user/:username', cacheMiddleware, async (req, res) => {
    try{
        const {username} = req.params
        const user = await githubService.getUser(username)
        console.log("called")
        res.sendCached(user)
    } catch (error){
        return res
    }
})

router.get('/user/:username/repos', async(req,res) => {
    try{
        const {username} = req.params
        const user = await githubService.getRepos(username)

        console.log(user)
        
    }catch(error){
        return res
    }
})

module.exports = router