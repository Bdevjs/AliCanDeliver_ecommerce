const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

//Database import file from database file 
const connectDatabase = require("./config/database")


// Handiling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandle Uncaught Exception`);
    process.exit(1);
    
})



//config
dotenv.config({path:"backend/config/config.env"});


//connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})




//Unhandled Promise Rejection
process.on("unhandledRejection",err => {
    console.log(`Error: ${err.massage}`);
    console.log(`Shutting down the server due to unhandle promise rejection`);

    server.close(()=>{
        process.exit(1);
    })

});