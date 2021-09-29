const express = require('express')
const User = require('../model/user')
const router = new express.Router()


// router.get('/test',(req,res) => {
//     res.send('From a new file')
// })



router.post('/user',async (req, res) => {
    //console.log(req.body)
    //res.send('Testing!')
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)

    }catch(e){
        res.status(400).send(e)
    }

   

    // user.save().then(() => {
    //       res.send(user)
    // }).catch((e) => {
    //       res.status(400)
    //       res.send(e)
    // })
})



router.get('/user',async(req, res) => {
    try{
        const user = await User.find({})
        res.status(201).send(user)
    }catch(e){
        res.status(500).send(e)
    }
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})


router.get('/user/:id',async (req, res) => {
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }

    // User.findById(_id).then((user) => {
    //     if(!user){
    //         return res.status(404).send()
    //     }

    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.patch('/user/:id',async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if(!isValidOperation){
            return res.status(400).send({error: 'Invalid Updates'})
        }
        try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators:true})
         if(!user){
             return res.status(404).send()
         }
         res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/user/:id',async(req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)


        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})
module.exports = router


