function errorHandler(err, req, res, next){
    console.error(`[${req.method}] ${req.originalUrl} →`,err);
    if(err.response?.status === 404){
        return res.status(404).json({
            success: false,
            message: "GitHub user not found"
        });
    }

    if( err.response?.status === 403 && err.response?.headers["x-ratelimit-remaining"] === "0"){
        return res.status(403).json({
            success: false,
            message:"GitHub API rate limit exceeded. Please try again later."
        });
    }

    if(err.response?.status === 401) {
        return res.status(401).json({
            success: false,
            message: "GitHub token is invalid or missing."
        });
    }

    if(err.code === "ECONNABORTED" || !err.response){
    return res.status(503).json({
        success:false,
        message:"Unable to reach GitHub API"
    });
}

    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}

module.exports = errorHandler;