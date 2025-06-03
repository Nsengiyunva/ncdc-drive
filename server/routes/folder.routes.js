const express  = require( "express" );
const router = express.Router();

const folder_controller = require( "../controllers/folder.controller" );

router.post( "/", folder_controller.createFolder );
router.get( "/:parentId?", folder_controller.getFolders );

module.exports = router