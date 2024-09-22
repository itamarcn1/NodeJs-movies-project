const mongoose = require('mongoose')


const connectToMongo = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/demo_4').then(() => {
        console.log("DB connection established");
    })
}

module.exports = connectToMongo