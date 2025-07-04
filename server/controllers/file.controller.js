const File = require( "../models/File"  );
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

exports.uploadFile = async( req, res )  => {
    const { folderId, referenceID, userID, tag } = req.body;
    if( !req.file )  return res.status( 400 ).json( {
        error: "File is required"
    } )

    try {
        const file = new File( {
            name: req.file.originalname,
            folder: folderId,
            filePath: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size,
            fileid:  uuidv4(),
            referenceID: referenceID,
            userID: userID,
            tag: tag
        } );

        await file.save();
        res.status( 201 ).json( file );
    } catch (err) {
        res.status( 500 ).json( { error: err.message } );
    }
}

exports.getFiles = async (  req, res )  => {
    try {
        const files = await File.find( { folder: req.params.folderId } );
        res.json( files );
    } catch (err) {
        res.status( 500 ).json( { error: err.message } )
    }
} 

exports.getFilesByUserId = async ( req, res )  => {
  try {
    const files = await File.find({ 
        folder: "685abbc21501e1b110c63e8c",
        userID: req.params.userID });
    res.json( files );
  } catch (err) {
     res.status( 500 ).json( { error: err.message } )
  }
}

exports.replaceFile = async ( req, res ) => {
    const newFile = req.file;
    const oldFilePath = req.body.oldfilepath; // Full path or relative

    if (!newFile) return res.status(400).send('No file uploaded');

    // Delete the old file
    if (oldFilePath && fs.existsSync(oldFilePath)) {
        fs.unlink(oldFilePath, (err) => {
        if (err) console.error('Failed to delete old file:', err);
        else console.log('Old file deleted');
        });
    }

    //insert new file in the db
    try {
        const file = new File( {
            name: req.file.originalname,
            folder: req.body.folderId,
            filePath: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size,
            fileid:  uuidv4(),
            referenceID: req.body.referenceID,
            userID: req.body.userID,
            tag: req.body.tag
        } );

        await file.save();
        return res.json({
            message: 'File replaced successfully',
            filePath: newFile.path,
        } );
    } catch (error) {
        res.status( 500 ).json( { error: err.message } );
    }
}