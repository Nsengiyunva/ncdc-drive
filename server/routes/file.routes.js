const express = require( "express" );
const multer = require( "multer" );
const path = require( "path" );
const fs = require('fs');
const router = express.Router();


const file_controller = require( "../controllers/file.controller"  );

const storage = multer.diskStorage( {
    destination: "uploads/",
    filename:  ( req, file, cb )  => {
        cb( null, `${Date.now()}-${file.originalname}`)
    }
} );

const upload = multer( { storage } );

router.post('/upload', upload.single('file'), file_controller.uploadFile );
router.get( "/folder/:folderId", file_controller.getFiles );

router.get( "/documents/:userID", file_controller.getFilesByUserId );

router.get('/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.sendFile(filePath);
});

router.post('/replace-file', upload.single('file'), file_controller.replaceFile );

router.delete('/files/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ error: 'File not found in database' });
    }

    // Delete file from filesystem
    const fullPath = path.join(__dirname, '..', file.filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    // Delete record from MongoDB
    await file.deleteOne();

    res.json({ message: 'File deleted from both server and database' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;



