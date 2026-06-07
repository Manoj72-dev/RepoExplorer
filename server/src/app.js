const express = require("express")
const cors = require("cors")
require("dotenv").config();

const errorHandler = require("./middleware/errorHandler");
const githubLimiter = require("./middleware/rateLimiter");
const githubRoutes = require('./routes/github');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api',githubLimiter, githubRoutes);
app.use(errorHandler);


const PORT = process.env.PORT || 3000 ;

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
});
