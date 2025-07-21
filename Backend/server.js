const express=require('express');
  const app=express();
  const bodyparser=require('body-parser')
  const cors=require('cors')
  require('dotenv').config();
  const db=require('./Models/db')
  const AuthRouter=require('./Routes/AuthRouter')
  const productRouter=require('./Routes/productsRoute')

  const PORT=process.env.PORT || 8000

 app.get('/ping',(req,res)=>{
  res.send('pong')
 })

 // use bodyparser and cors 
app.use(bodyparser.json());
app.use(cors())

app.use('/auth',AuthRouter)
app.use('/products',productRouter)




  app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
  })
