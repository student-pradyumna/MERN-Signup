const mongoose=require('mongoose');

const mongo_url=process.env.MONGODB_CONN;

mongoose.connect(mongo_url)


const db=mongoose.connection;

db.on('connected',()=>{
  console.log('connected to mongodb server')
});
db.on('error',()=>{
  console.log('db connection error')
});
db.on('disconnected',()=>{
  console.log('disconnected to mongodb server')
});