const File = require( "../models/File"  );
const { v4: uuidv4 } = require('uuid');

exports.uploadFile = async( req, res )  => {
    const { folderId } = req.body;
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
            fileid:  uuidv4()
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