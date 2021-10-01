const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
       type:String,
       reguired:true,
       minlength: 7,
       trim:true,
       validate(value){
           if(value.toLowerCase().includes('password')){
               throw new Error('password cannot contain "password"')
           }
       }
    },
    age: {
        type:Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token:{
            type:String,
            required:true
        }
    }]
}, {
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.token

    return userObject
}

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'thisismynewcourse')
    
    user.tokens = user.tokens.concat({token})
    await user.save()
    
    return token

}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch= await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}


//Hash the plain text before saving
userSchema.pre('save',async function (next) {
    const user = this

    //console.log('just before saving')

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()

})

userSchema.pre('remove',async function (next) {
    const user = this 
    await Task.deleteMany({owner: user._id})
    next()
})

 const User = mongoose.model('User',userSchema
//{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         toLowerCase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password:{
//        type:String,
//        reguired:true,
//        minlength: 7,
//        trim:true,
//        validate(value){
//            if(value.toLowerCase().includes('password')){
//                throw new Error('password cannot contain "password"')
//            }
//        }
//     },
//     age: {
//         type:Number,
//         default: 0,
//         validate(value){
//             if(value < 0){
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     }
// }
)


// const me = new User({
//    name: 'Jen',
//    email: 'JJen@2.com',
//    password:'phone098!'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error ',error)
//  })


 module.exports = User