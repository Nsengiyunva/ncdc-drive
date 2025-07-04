const express = require( "express" );
const mongoose = require( "mongoose" );
const dotenv = require( "dotenv" );
const path = require( "path" );
const cors = require( "cors" );

dotenv.config();
const app = express();


app.use( cors() );
app.use( express.json() );
app.use( "/uploads", express.static(path.join(__dirname, 'uploads')) );

mongoose.connect(  process.env.MONGO_URL  ).then(()=>  {
    console.log("Connected to the Mongo DB...");
}).catch(err=>{
    console.log(err);
});

app.use('/api/folders', require('./routes/folder.routes'));
app.use('/api/files', require('./routes/file.routes'));

const PORT = 8552;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
