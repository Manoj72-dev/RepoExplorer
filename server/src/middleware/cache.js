//this will store all the request response 
const cache = new Map()
//time for which the response will be stored in cache
const CACHE_TTL = 60*1000


function cacheMiddleware(req, res, next){
    //req url will be used to make key 
    const key = req.originalUrl

    //if the key is present we will send the saved response
    if(cache.has(key)){
        return res.json(cache.get(key))
    }
    
    //what this will do is it will store the response
    //Set it to be deleted after ttl expire
    //forward the response
    res.sendCached = (data) => {
        cache.set(key, data)

        setTimeout(()=>{
            cache.delete(key)
        }, CACHE_TTL)
        res.json(data)
    };
    next();
}
module.exports = cacheMiddleware;