import { Promise } from "mongoose";

const asyncHandeler = (requestHandeler)=>{
    (req,res,next) =>{
        Promise.resolve(requestHandeler(req,res,next)) 
        .catch((err)=> next(err))
    }
}


 

export default asyncHandeler;
/*
// using Try Catch block
// use "fn" function in another function ........
const asyncHandeler = (fn) => async(req,res,next) => {
    try {
        await fn(req,res,next)
        
    } catch (error) {
        res.send(err.code || 500).json({
            success:false,
            message: error.message
        });
    }
}
*/