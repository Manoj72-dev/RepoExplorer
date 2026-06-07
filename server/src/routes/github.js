const express           = require('express')
const router            = express.Router()
const githubService     = require('../services/GithubService')
const cacheMiddleware   = require('../middleware/cache')

router.get(
        '/user/:username', 
        cacheMiddleware, 
        async (req, res, next) => {
            try{
                const user = await githubService.getUser(
                    req.params.username
                );
                res.sendCached(user)
            } catch (error){
                next(error);
            }
        })

router.get(
        '/user/:username/repos',
        cacheMiddleware, 
        async(req,res,next) => {
            try{
                const repos = await githubService.getRepos(
                    req.params.username,
                    req.query.page || 1 
                );                
                res.sendCached(repos);
            }catch(error){
                next(error);
            }
        })

module.exports = router