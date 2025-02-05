import express from 'express'
import dotenv from 'dotenv'
import sequelize from './sequelizeConfig.js';
import { dbController } from './controllers/dbController.js';
import { carController } from './Controllers/carController.js';


dotenv.config()

const app = express()
const port = 4000
//const port= process.env.SERVERPORT || 4242


//Route til root
app.get("/", (req, res) =>{
    console.log('Welcome to Williams Car Site');
    res.send('Welcome to Williams Car Site')
})

// app.get("/cars", (req, res) =>{
//     console.log('Cars for sale');
    
//    res.send('Cars for sale')
   
// })
// app.get("/about", (req, res) =>{
//    res.send('Who are we?')
// })
// app.get("/map", (req, res) =>{
//    res.send('Location')
// })
// app.get("/contact", (req, res) =>{
//    res.send('Find us')
// })
// app.get("/test",async  (req, res) =>{
//    try{
//      await sequelize.authenticate();
//      res.send('It is connection to the database')
//    }
//    catch (error) {
//     console.error('Error!. Can not connects with database: ${error}')
//    }
// })

app.use(dbController, carController);

//Route til 404
app.get('*', (req, res)=>{
   res.send('Error :404. Could not find file')
})


// app.get('/sync', async (req, res) => {
//    try {
//      const resp = await sequelize.sync({ force: true });
//      res.send('Data successfully synchronized');
//    }
//    catch(err) {
//      res.send(err);
//    }
//  });

app.listen(port,  ()=>{
    console.log(`Server is running on  http://localhost:${port}`);
    
})