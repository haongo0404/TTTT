const mongoose = require("mongoose");


const connectDatabase = () => {
    mongoose.set("strictQuery", false)
    mongoose.connect('mongodb+srv://ngohao:04042016@haongo.cpaeeaz.mongodb.net/?retryWrites=true&w=majority').then(() => {
        console.log('conn3ct mongo')
    }).catch((error) => {
        console.log(error)
    })
}

module.exports = connectDatabase