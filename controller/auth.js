const User = require('../models');
const createError = require('http-errors');

const signup = (req,res,next)=>{
    const userData = req.body;
    //validation 
    const validation = User.validate(userData);
    if (validation.error){
        next(createError(400,validation.error.message))
    }
    //is Exist
    const user = new User(userData);
    user.isExist()
      .then((result) => {
        if (result.catch) {
            next(createError(409,result.message))
        }
    }).catch((err) => {
            next(createError(500,err.message))
    });

    //insert data
     user.save((result)=>{
        if (result.status) {
            res.status(201).json({
                status: true,
                message: "user has been created sucss"
            })
        }else{
            next(createError(500,result.message))
        }
     })
}

module.exports = signup;