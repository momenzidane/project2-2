const {Router}=require('express');
const {employeeController,pageCountEmp,getEmpByIdc}= require('../controller');

const router = Router();

router.get('/',employeeController).
get('/pages',pageCountEmp).
get('/:id',getEmpByIdc)

module.exports = router;