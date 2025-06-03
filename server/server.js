// const express=require('express')
// require('dotenv').config()
// const user=require('./routes/User')
// const ffroute=require('./routes/FilesAndFolders')
// const mongoose=require('mongoose')
// const cors = require( "cors" );

// const app=express()
// app.use(cors())
// app.use(express.json())

// mongoose.connect(  process.env.MONGO_URL  ).then(()=>  {
//     console.log("Connected to db");
// }).catch(err=>{
//     console.log(err);
// })

// app.get('/',(req,res)=>{
//     res.send("hello")
// })

// app.use('/user',user)
// app.use('/ff',ffroute)

// app.listen( process.env.PORT || 8552,()=>{
//     console.log('Server is running...');
// })

const express = require( "express" );
const mongoose = require( "mongoose" );
const dotenv = require( "dotenv" );
const path = require( "path" );

dotenv.config();
const app = express();

app.use( express.json() );
app.use( "/uploads", express.static(path.join(__dirname, 'uploads')) );

mongoose.connect(  process.env.MONGO_URL  ).then(()=>  {
    console.log("Connected to the db...");

    app.use('/api/folders', require('./routes/folder.routes'));
    app.use('/api/files', require('./routes/file.routes'));

    const PORT = 8552;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}).catch(err=>{
    console.log(err);
})
