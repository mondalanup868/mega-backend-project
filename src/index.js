// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path: './.env',
})


const port = process.env.PORT || 3000;

connectDB()
.then(()=>{
    app.listen(port, () => {
        console.log(`App listening on port : ${port}`);
    });
})
.catch((err)=>{
    console.log("Mongodb Connection Failed :",err);
})
