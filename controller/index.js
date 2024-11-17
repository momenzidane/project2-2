const employee = require('./employee');
const auth = require('./auth');
module.exports = {
    employeeController : employee.getEmployee,
    pageCountEmp : employee.getPagesCou,
    getEmpByIdc : employee.getEmpById,
    
    authController: auth
}