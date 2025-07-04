const File = require( "../models/File"  );
const path = require( "path" );
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
    // const newFile = req.file;
    // const oldFilePath = req.body.oldfilepath; // Full path or relative

    // if (!newFile) return res.status(400).send('No file uploaded');

    // // Delete the old file
    // if (oldFilePath && fs.existsSync(oldFilePath)) {
    //     fs.unlink(oldFilePath, (err) => {
    //     if (err) console.error('Failed to delete old file:', err);
    //     else console.log('Old file deleted');
    //     });
    // }

    // //insert new file in the db
    // try {
    //     const file = new File( {
    //         name: req.file.originalname,
    //         folder: req.body.folderId,
    //         filePath: req.file.path,
    //         mimetype: req.file.mimetype,
    //         size: req.file.size,
    //         fileid:  uuidv4(),
    //         referenceID: req.body.referenceID,
    //         userID: req.body.userID,
    //         tag: req.body.tag
    //     } );

    //     await file.save();
    //     return res.json({
    //         message: 'File replaced successfully',
    //         filePath: newFile.path,
    //     } );
    // } catch (error) {
    //     res.status( 500 ).json( { error: err.message } );
    // }

    try {
    // 1. Find the file in MongoDB
    const file = await File.findById(req.body.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found in database.' });
    }

    // 2. Delete the file from the server filesystem
    const fullPath = path.join(__dirname, file.filePath);
    fs.unlink(fullPath, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to delete file from server.' });
      }

      // 3. Delete the document from MongoDB
      await File.findByIdAndDelete(req.body.id);
    //   res.json({ message: 'File deleted successfully.' });
    
    // //upload a new file
    //     const file = new File( {
    //         name: req.file.originalname,
    //         folder: req.body.folderId,
    //         filePath: req.file.path,
    //         mimetype: req.file.mimetype,
    //         size: req.file.size,
    //         fileid:  uuidv4(),
    //         referenceID: req.body.referenceID,
    //         userID: req.body.userID,
    //         tag: req.body.tag
    //     } );

    //     await file.save();
        res.json({
            message: 'File replaced successfully',
            filePath: newFile.path,
        } );
    });
  } catch (error) {
        // console.error('Error deleting file:', error);
        res.status(500).json( error );
  }
}

exports.deleteFile = async ( req, res ) => {
    try {
    const record = await File.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ error: 'File not found in database' });
    }

    // Delete file from filesystem
    const fullPath = path.join(__dirname, '..', record.filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    // // Delete record from MongoDB
    await record.deleteOne();

    res.json( {
        record,
        path: fullPath
    } );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error });
  }
}