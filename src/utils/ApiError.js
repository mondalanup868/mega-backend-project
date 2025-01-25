class ApiError extends Error {
    constructor(
        statusCode,
        messege = "Something Went Wrong",
        errors =[],
        stack = ""
        
    ){
        super(messege),
        this.statusCode = statusCode,
        this.data = null
        this.errors = errors,
        this.message = messege,
        this.success = false 


        if (stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError};  // export the class