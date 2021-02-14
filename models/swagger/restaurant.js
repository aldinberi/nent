/**
 * @swagger
 * /restaurant:
 *   post:
 *     tags:
 *       - restaurants
 *     name: addRestaurant
 *     summary: Add a new restaurant to the system
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Restaurant object
 *         required: true
 *         schema:
 *             $ref: "#/definitions/Restaurant"
 *     responses:
 *       200:
 *         description: Successfully inserted and returned a new restaurant.
 *       400:
 *           description: Invalid user request.
 *       401:
 *           description: Unauthorized access.
 *       500:
 *         description: Something is wrong with the service. Please contact the system administrator.
 */

/**
 * @swagger
 * /restaurant:
 *   get:
 *     tags:
 *       - restaurants
 *     name: getListOfRestaurant
 *     summary: Get a list of restaurants from the system
 *     parameters:
 *       - name: offset
 *         in: query
 *         description: The offset of the restaurant list.
 *         type: integer
 *       - name: limit
 *         in: query
 *         description: The limit of the restaurant list.
 *         type: integer
 *       - name: name
 *         in: query
 *         description: The name of a restaurant.
 *         type: string
 *       - name: address
 *         in: query
 *         description: The address of a restaurant.
 *         type: string
 *       - name: rating
 *         in: query
 *         description: The rating of a restaurant.
 *         type: double
 *       - name: price_level
 *         in: query
 *         description: The price level of a restaurant.
 *         type: number
 *       - name: day
 *         in: query
 *         description: Work hours of based on a day.
 *         type: string
 *       - name: startTime
 *         in: query
 *         description: Work hours of based on start time.
 *         type: string
 *       - name: endTime
 *         in: query
 *         description: Work hours of based on end time.
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *           description: Successfully returned a list of restaurants
 *       400:
 *           description: Invalid user request.
 *       401:
 *           description: Unauthorized access.
 *       500:
 *           description: Something is wrong with service please contact the system administrator
 */

/**
 * @swagger
 * /restaurant/{id}:
 *   get:
 *     tags:
 *       - restaurants
 *     name: getRestaurantById
 *     summary: Get a restaurant based by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the restaurant
 *         required: true
 *         type: string
 *         default: '5c8264790ba555001448f471'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *           description: Successfully returned a restaurant based on id
 *       400:
 *           description: Invalid user request.
 *       401:
 *           description: Unauthorized access.
 *       500:
 *           description: Something is wrong with service please contact the system administrator
 */

/**
 * @swagger
 * /restaurant/{id}:
 *   delete:
 *     tags:
 *       - restaurants
 *     name: deleteRestaurantById
 *     summary: Delete a restaurant based by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the restaurant
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *           description: Successfully deleted a restaurant based on id
 *       400:
 *           description: Invalid user request.
 *       401:
 *           description: Unauthorized access.
 *       500:
 *           description: Something is wrong with service please contact the system administrator
 */
