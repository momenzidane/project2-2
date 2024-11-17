const {Router} = require('express')
// const { authCountrolar } = require('../controller')
// const router = Router();

// router.post('/signup',authCountrolar.signup)

// module.exports = router;

const { signup } = require('../controller/auth');  // Import signup directly

const router = Router();

router.post('/signup', signup);  // Use signup function directly

module.exports = router;