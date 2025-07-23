const mongoose = require( "mongoose" );
const { v4: uuidv4 } = require('uuid');

const FolderSchema  =  new mongoose.Schema( {
    Folderid: {
        type: String,
        unique: true,
        sparse: true, // important to allow multiple null values
        default: uuidv4, // auto-generate if not provided
    },
    department: { type: String, required: true },
    unit: { type: String, required: true },
    organisation: { type: String, required: true },
    created_by: { type: Number, required: true },
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