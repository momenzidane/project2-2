const employeeRouter = require('./employee');
const authRouter = require('./auth')
module.exports = (app)=>{
    app.get('/',(req,res,next)=>{
        res.json({
            status:true,
            message:"the link have been some think data"
        })
    })
 
    app.use('/employees',employeeRouter)

    app.use('/auth',authRouter)
}