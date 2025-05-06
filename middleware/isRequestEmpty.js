const isRequestEmpty = (err='Request body is empty')=>{
    
    return (req,res,next)=>{
        // console.log("hello");
        console.log(req.body);
        if (!req.body || Object.keys(req).length === 0) {
            return res.status(400).json({ 
                message: err,
                error: 'No Data Provided in request Body'
            }).end();
        }
        next();
    }
}

module.exports = isRequestEmpty