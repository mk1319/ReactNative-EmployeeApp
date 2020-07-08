const mongoose=require('mongoose')

const schema1 =new mongoose.Schema({

    Name:String,
    Email:String,
    Phone:String,
    Picture:String,
    Position:String,
    instaid:String
})


mongoose.model("schema1",schema1)