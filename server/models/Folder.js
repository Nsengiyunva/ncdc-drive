// const mongoose=require('mongoose')

// const FolderSchema=new mongoose.Schema({
//     Folders:{
//         type:Array,
//         default:[]
//     },
//     Files:{
//         type:Array,
//         default:[]
//     },
//     Folderid:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     Name:{
//         type:String,
//         required:true
//     },
//     uid:{
//         type:String,
//         required:true
//     }
// })

// const FolderModel=new mongoose.model('Folders',FolderSchema)
// module.exports={FolderModel}

const mongoose = require( "mongoose" );
const { v4: uuidv4 } = require('uuid');

const FolderSchema  =  new mongoose.Schema( {
    Folderid: {
        type: String,
        unique: true,
        sparse: true, // important to allow multiple null values
        default: uuidv4, // auto-generate if not provided
    },
    name: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}  );

module.exports  = mongoose.model( "Folder", FolderSchema );