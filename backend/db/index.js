const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pranav073:Lvt87UBGQaKvuwFg@cluster0.ry6yrgj.mongodb.net/paytm-clone');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName:{
        type:String,
        required: true,
        maxLength: 50,
        trim:true
    },
    lastName:{
        type:String,
        type:String,
        required: true,
        maxLength: 50,
        trim:true
    },
    password: {
        type: String,
        required:true,
        minLength:6
    }
})


const User = mongoose.model('User', userSchema);

module.exports = {
    User
}