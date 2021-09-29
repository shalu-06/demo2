const express = require('express')
require('./mongoose.js')
const User = require('../model/user.js')
const Task = require('../model/task')
const userRouter = require('../router/user')
const taskRouter = require('../router/task')
const app = express()

const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// const router = new express.Router()
// router.get('/test',(req,res) => {
//     res.send('This is from my other router')
// })
// app.use(router)

// app.post('/user',async (req, res) => {
//     //console.log(req.body)
//     //res.send('Testing!')
//     const user = new User(req.body)

//     try{
//         await user.save()
//         res.status(201).send(user)

//     }catch(e){
//         res.status(400).send(e)
//     }

   

//     // user.save().then(() => {
//     //       res.send(user)
//     // }).catch((e) => {
//     //       res.status(400)
//     //       res.send(e)
//     // })
// })



// app.get('/user',async(req, res) => {
//     try{
//         const user = await User.find({})
//         res.status(201).send(user)
//     }catch(e){
//         res.status(500).send(e)
//     }
//     // User.find({}).then((users) => {
//     //     res.send(users)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })


// app.get('/user/:id',async (req, res) => {
//     const _id = req.params.id
//     try{
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }

//     // User.findById(_id).then((user) => {
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }

//     //     res.send(user)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })

// app.patch('/user/:id',async(req,res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name','email','password','age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//         if(!isValidOperation){
//             return res.status(400).send({error: 'Invalid Updates'})
//         }
//         try{
//         const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators:true})
//          if(!user){
//              return res.status(404).send()
//          }
//          res.send(user)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

// app.delete('/user/:id',async(req,res) => {
//     try{
//         const user = await User.findByIdAndDelete(req.params.id)


//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })
// app.post('/tasks',async(req,res) => {
//     const task = new Task(req.body)
//     try{
//         await task.save()
//         res.status(201).send(task)
//     }catch(e){
//         res.status(400).send(e)
//     }

//     // task.save().then(() => {
//     //     res.status(201).send(task)
//     // }).catch((e) => {
//     //     res.status(404).send(e)
//     // })
    
// })

// app.get('/tasks',async (req,res) => {
//     try{
//         const tasks = await Task.find({})
//         res.status(201).send(tasks)
//     }catch(e){
//         res.status(500).send(e)
//     }
//     // Task.find({}).then((tasks) => {
//     //     res.send(tasks)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })

// app.get('/tasks/:id',async (req, res) => {
//     const _id = req.params.id

//     try{
//         const task = await Task.findById(_id)
//         if(!task){
//             return res.status(404).send()
//         }
//         res.status(201).send(task)
        
//     }catch(e){
//         res.status(500).send(e)
//     }

//     // Task.findById(_id).then((task) => {
//     //     if(!task){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(task)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })

// app.patch('/tasks/:id',async(req,res) => {

//     const updates= Object.keys(req.body)
//     const allowedUpdates = ['description','completed']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     if(!isValidOperation){
//         return res.status(400).send({error: 'Invalid updates'})
//     }
//     try{
//         const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators: true})
//         if(!task){
//             return res.status(404).send()
//         }
//         res.status(201).send(task)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

// app.delete('/tasks/:id',async(req,res) => {
//     try{
//         const task = await Task.findByIdAndDelete(req.params.id)
//     if(!task){
//         return res.status(404).send()
//     }
//     res.send(task)
//     }catch(e){
//         res.status(500).send(e)
//     }
    
// })



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})