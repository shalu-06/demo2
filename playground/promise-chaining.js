require('../src/db/mongoose')
const User = require('../src/model/user')


//6152d272b10d65499f58ddc7

// User.findByIdAndUpdate('615406583815e62b4afda8af',{age:1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age:0})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async(id,age) => {
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return count
}


updateAgeAndCount('6152e4e072b4b54e315cf1ce',2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})