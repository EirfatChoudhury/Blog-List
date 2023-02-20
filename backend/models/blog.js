const logger = require("../utils/logger")
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const config = require("../utils/config")

logger.info(`Connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        logger.info("Connected to MongoDB")
    })
    .catch((error) => {
        logger.info(`Error connecting to MongoDB: ${error.message}`)
    })

const blogSchema = new mongoose.Schema({
        title: String,
        author: String,
        url: String,
        likes: Number
})
blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Blog", blogSchema)