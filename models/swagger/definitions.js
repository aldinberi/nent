/**
 * @swagger
 * definitions:
 *  Restaurant:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     example: Brännkyrkagatan
 *    address:
 *     type: string
 *     example: Repslagargatan 8, 118 46 Stockholm, Sweden
 *    location:
 *     type: object
 *     properties:
 *      lat:
 *       type: double
 *       example: 59.31781179999999
 *      long:
 *       type: double
 *       example: 18.0701277
 *    working_hours:
 *     type: array
 *     items:
 *      type: string
 *    phone_number:
 *       type: string
 *       example: 08-641 20 77
 *    rating:
 *       type: double
 *       example: 4.4
 *    price_level:
 *       type: number
 *       example: 2
 *    icon:
 *     type: string
 *     example: https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png
 *    google_maps_url:
 *     type: string
 *     example: https://maps.google.com/?cid=9369167126300605621
 *    website:
 *     type: string
 *     example: http://www.tamarindo.se/
 *    photo:
 *     type: string
 *     example: https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg
 *    required:
 *     - name
 *     - address
 *     - location
 *     - working_hours
 *     - phone_number
 *     - icon
 *     - google_maps_url
 *     - website
 *     - photo
 *     - price_level
 *     - rating
 *
 */
