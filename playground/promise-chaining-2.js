require('../src/db/mongoose.js')
const Task = require('../src/model/task')

// Task.findByIdAndDelete('6152caf9c6196f45be40df4a').then(() => {
//     return Task.countDocuments({completed:false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const deleteTaskAndCount = async(id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteTaskAndCount('6152e61e3bedfb4ede714c6d').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
