const express=require('express')
require('dotenv').config()
const user=require('./routes/User')
const ffroute=require('./routes/FilesAndFolders')
const mongoose=require('mongoose')

const app=express()
app.use(require('cors')())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(()=>  {
    console.log("Connected to db");
}).catch(err=>{
    console.log(err);
})

app.get('/',(req,res)=>{
    res.send("hello")
})

app.use('/user',user)
app.use('/ff',ffroute)

app.listen(process.env.PORT || 8552,()=>{
    console.log('Server is running...');
})