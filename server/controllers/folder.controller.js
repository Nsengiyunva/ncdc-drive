const Folder = require( "../models/Folder" );

exports.createFolder = async ( req, res ) => {
    const { name, parent } = req.body
    try  {
        const folder = new Folder( {
            name, 
            parent: parent || null
        } )

        await folder.save();
        res.status( 201 ).json( folder );

    } catch( err  )  {
        res.status( 500 ).json( { error: err.message } );
    }
}

exports.getFolders = async ( req, res ) => {
    try {
        const folders = await Folder.find( {
            parent:  req.params.parentId || null
        } );
        res.json( folders );
    } catch( err ) {
        res.status( 500  ).json( { error: err.message } );
    }
}