import express from 'express'
import dotenv from 'dotenv'
import sequelize from './sequelizeConfig.js';

dotenv.config()
console.log(process.env.PORT);


const app = express()
const port = 21001

app.get("/", (req, res) =>{
    console.log('Welcome to Williams Car Site');
    res.send('Welcome to Williams Car Site')
})
app.get("/cars", (req, res) =>{
    console.log('Cars for sale');
    
   res.send('Cars for sale')
   
})
app.get("/about", (req, res) =>{
   res.send('Who are vi?')
})
app.get("/map", (req, res) =>{
   res.send('Find us')
})
app.get("/contact", (req, res) =>{
   res.send('Find us')
})
app.get("/test",async  (req, res) =>{
   try{
     await sequelize.authenticate();
     res.send('It is connection to the database')
   }
   catch (error) {
    console.error('Error!. Can not connects with database: ${error}')
   }
})

app.listen(port,  ()=>{
    console.log(`Server is running on  http://localhost:${port}`);
    
})