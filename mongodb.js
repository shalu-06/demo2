//CRUD cread read update delete operations

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectId = mongodb.ObjectId


const {MongoClient,ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'myDatabase'

const id = new ObjectID()
console.log(id.id.length)
console.log(id.toHexString().length)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {useNewUrlParser : true}, (error, client)=>{

    if(error){
        console.log('Unable to connect to database')
    }

   // console.log('Connected ...')

   const db = client.db(databaseName)
   
//    db.collection('Users').insertOne({
//        _id : id,        //mongodb generated id for each document
//        name : 'Roman',
//        age : 24
//    },(error, result) => {
//         if(error){
//             return console.log('unable to connet user')
//         }

//         console.log(result.ops)

//    })

    // db.collection('Employees').insertMany([
    //    {
    //         name : 'John',
    //         age : 23
    //    },{
    //     name : "moly",
    //     age :24
    //    }

    // ], (error, result) => {

    //     if(error){
    //         return console.log('unable to connect document')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('Users').insertMany([
    //     {
    //         name : 'Johny',
    //         age : 30
    //     },{
    //         name : 'Rohit',
    //         age :20
    //     },{
    //         name : 'jenny',
    //         age : 34
    //     }
    // ], (error, result)=> {
    //     if(error){
    //         return true
    //     }

    //     console.log('Successfully added')
    // })



    // db.collection('Users').findOne({name : 'Allen Bee'}, (error,user) => {
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(user)
    // })

    // db.collection('Users').findOne({_id : new ObjectID("6152cd88b6357ded99e9d577")}, (error,user) => {
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(user)
    // })
    

    db.collection('Users').find({age : 23}).toArray((error, users)=> {
        console.log(users)
    })
    


})

