let mongoose = require('mongoose');

let restaurantSchema = new mongoose.Schema({
    opening_hours: {
        type: [String],
        required: true,
    } ,
    address: {
        type: String,
        required: true,
    },
    phone_number:{
        type: String,
        required: true,
    },
    location:{
        lat: {
            type: Number, 
            required: true
             
          },
        lng: {
            type: Number,
            required: true,
        }
    },
    icon:{
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
        unique: true,
    },

    price_level: {
        type: Number,
        required: true,
    },

    rating: {
        type: Number,
        required: true,
    },

    google_maps_url:{
        type: String,
        required: true,
        unique: true,
    },
    
    website: {
        type: String,
        required: true,
    },

    photo: {
        type: String,
        required: true,
    },

    id:{
        type: Number,
        required: true,
    }

})

module.exports = mongoose.model('restaurants', restaurantSchema);