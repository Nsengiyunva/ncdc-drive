const { v4: uuidv4 } = require('uuid');
const Folder = require( "../models/Folder" );


exports.createFolder = async ( req, res ) => {
    const { name, parent, department, unit, organisation, created_by } = req.body
    try  {
        const folder = new Folder( {
            Folderid: uuidv4(), 
            name, 
            parent: parent || null,
            department,
            unit,
            organisation,
            created_by
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