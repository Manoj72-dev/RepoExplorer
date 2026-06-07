const express = require("express")
const cors = require("cors")
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const githubRoutes = require('./routes/github');
app.use('/api', githubRoutes);

const PORT = process.env.PORT ;

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
});
