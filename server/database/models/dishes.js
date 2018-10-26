const mongoose = require('mongoose');

// var ObjectId = mongoose.Schema.Types.ObjectId;

let dishSchema = new mongoose.Schema({
    dishID: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: [true, "dishNameRequired"]
    },
    category: String,
    img: {
        type: String,
        default: "../image/rest/rest_placeholder.svg"
    },
    description: String,
    composition: String,
    grams: String,
    count: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: [true, "dishPriceRequired"]
    },
    portions: {
        status: {
            type: Boolean,
            default: false
        },
        portionsPrice4: {
            type: Number,
            default: 0
        },
        portionsPrice8: {
            type: Number,
            default: 0
        }
    }
})


module.exports = mongoose.model('dishes', dishSchema, 'dishes')
    // module.exports = mongoose.model('rests', restsSchema, 'rests');