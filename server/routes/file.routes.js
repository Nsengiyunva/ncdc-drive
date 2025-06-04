const express = require( "express" );
const multer = require( "multer" );
const path = require( "path" );
const router = express.Router();


const file_controller = require( "../controllers/file.controller"  );

// const storage = multer.diskStorage( {
//     destination: "uploads/",
//     filename:  ( req, file, cb )  => {
//         cb( null, `${Date.now()}-${file.originalname}`)
//     }
// } );

// const upload = multer( { storage } );
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), file_controller.uploadFile );
router.get( "/folder/:folderId", file_controller.getFiles );

module.exports = router;



