module.exports = (router, mongoose, config, express) => {
	let userModel = require('../../models/mongoose/user');
  let check_password = require('../../utils');

  const { body, validationResult } = require('express-validator');
    router.post("/register",
    body('email').isEmail().normalizeEmail(),
    body('first_name').isAlpha(),
    body('last_name').isAlpha(),
    body('email').custom(async (value) => {
      let user = await userModel.findOne({ email: value });
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    }),
    body('password').custom(value =>  {
        if(check_password(value)){
            return Promise.reject('Password has been breached');
        }
    }),
    (req, res) => {
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
          return res.status(422).json(validationErrors.array())
        }
        userModel
	});
};