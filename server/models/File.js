// const mongoose = require('mongoose')

// const FileSchema = new mongoose.Schema({
//     filename: {
//         type: String,
//         required: true
//     },
//     fileid: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     filetype: {
//         type: String,
//         required: true
//     },
//     storageLink: {
//         type: String,
//         required: true
//     },
//     uid: {
//         type: String
//     },
//     starred: {
//         type: Boolean,
//         default: false
//     },
//     trash: {
//         type: Boolean,
//         default: false
//     },
//     timstamp: {
//         type: Date,
//         default: Date.now()
//     },
//     parentFolder: {
//         type: String,
//         required: true
//     }
// })

// const FileModel = new mongoose.model('Files', FileSchema)

// module.exports = { FileModel }
const mongoose = require( "mongoose" );

const FileSchema = new mongoose.Schema( {
    name: { type: String, required: true },
    referenceID: { type: Number },
    userID: { type: Number },
    tag: { type: String },
    folder: {  type: String, ref: "folder", required: true },
    filePath:  { type: String, required: true },
    mimetype: { type: String },
    size: { type: Number },
    createdAt: { type: Date, default: Date.now },
    fileid: {
        type: String,
        unique: true,
        required: true
    },
} );

module.exports = new mongoose.model( "File", FileSchema );