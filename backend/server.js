const app = require("./app");
const dotenv = require("dotenv");

//Database import file from database file 

const connectDatabase = require("./config/database")

//config

dotenv.config({path:"backend/config/config.env"});


//connecting to database
connectDatabase()

app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})

