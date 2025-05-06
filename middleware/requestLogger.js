const requestLogger = (req, res, next)=>{
    console.log(`Request method: ${req.method} , Request URL is ${req.url}, ${req.body?(`req body is ${Object.entries(req.body)}`):false}`);
    next();
}


module.exports = requestLogger