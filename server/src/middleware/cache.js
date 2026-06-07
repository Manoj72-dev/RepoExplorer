//this will store all the request response 
const cache = new Map();

//time for which the response will be stored in cache
const CACHE_TTL = 60*1000;


function cacheMiddleware(req, res, next){
    //req url will be used to make key 
    const key = req.originalUrl

    const cachedItem = cache.get(key);

    if(cachedItem){
        if (Date.now() < cachedItem.expiry){
            console.log("Cache Hit");
            return res.json(cachedItem.data);
        }
        cache.delete(key)
    }
    
   
    res.sendCached = (data) => {
        cache.set(key, {
            data,
            expiry: Date.now() + CACHE_TTL,
        });

        console.log("Cache Miss");
        res.json(data);
    };
    next();
}
module.exports = cacheMiddleware;