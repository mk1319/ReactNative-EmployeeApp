const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
require('./schema')


app.use(bodyparser.json())


const schema=mongoose.model("schema1")




const mongooseUrl="URL_"

mongoose.connect(mongooseUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("connected")
})
mongoose.connection.on("error",(err)=>{
    console.log("error",err)
})


app.get('/',(req,res)=>{
    schema.find({})
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })  
})





app.listen(3000,()=>{
   // console.log("asd  qwe")
})



app.post('/send',(req,res)=>{
   
    const member=new schema({
        // Name:String,
        // Email:String,
        // Phone:String,
        // Picture:String,
        // Position:String,
        // instaid:String
        Name:req.body.Name,
        Email:req.body.Email,
        Phone:req.body.Phone,
        Picture:req.body.Picture,
        Position:req.body.Position,
        instaid:req.body.instaid
    })
    member.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })      
})

app.post('/delete',(req,res)=>{

    schema.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        //res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })

})

app.post('/update',(req,res)=>{

    schema.findByIdAndUpdate(req.body.id,{  
        Name:req.body.Name,
        Email:req.body.Email,
        Phone:req.body.Phone,
        Picture:req.body.Picture,
        Position:req.body.Position,
        instaid:req.body.instaid
    })
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

