/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - users
 *     name: loginUser
 *     summary: Authenticate the user and return a jwt token
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User login object
 *         required: true
 *         schema:
 *             $ref: "#/definitions/UserLogin"
 *     responses:
 *       200:
 *         description: Successfully logged in and returned a JWT token.
 *       400:
 *           description: Invalid user request.
 *       401:
 *           description: Unauthorized access.
 *       422:
 *           description: Invalid data sent.
 *       500:
 *         description: Something is wrong with the service. Please contact the system administrator.
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - users
 *     name: registerUser
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User register object
 *         required: true
 *         schema:
 *             $ref: "#/definitions/UserRegister"
 *     responses:
 *       200:
 *         description: Successfully inserted new user.
 *       400:
 *           description: Invalid user request.
 *       401:
 *           description: Unauthorized access.
 *       422:
 *           description: Invalid data sent.
 *       500:
 *         description: Something is wrong with the service. Please contact the system administrator.
 */
