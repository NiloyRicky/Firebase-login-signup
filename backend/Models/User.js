const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },

   // profilePhoto: {
        //type: String, // Store as a URL or a filename
        
      //},
      //coverPhoto: {
       // type: String, // Optional, can be stored as a URL or filename
      //},
      phone: {
        type: String,
        required: true,
        trim: true
      },
      gender: {
        type: String,
        enum: ['male', 'female', 'other'], // Limit the gender values
        required: true
      },

qrCode:{type:String},



    

});
const UserModel=mongoose.model('users',UserSchema);
module.exports=UserModel;
