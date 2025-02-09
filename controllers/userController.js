import express from 'express'
import {userModel} from '../models/userModel.js'

export const userController = express.Router()

userController.get("/users", async (req, res) => {
    try {
      const data = await userModel.findAll({
        attributes:['id', 'firstname', 'lastname']
      });
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No data found" });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(`Could not get user list: ${error}`);
      res.status(500).json({  error: error.message });
    }
  });

  userController.get('/users/:id([0-9]*)', async(req,res)=>{
     try {
        const { id } = req.params
        const data = await userModel.findOne({ where: { id: id },
        })
        if (!data) {
            return res.status(404).json({ message: `User with id #${id} not found` });
        }
        return res.json(data);
    } catch (error) {
        console.error(`Could not get user details: ${error}`)        
    }
  })
  
  // Route to create (CREATE)
  userController.post('/users', async (req, res) => {
     const {  firstname, lastname, email, password, is_active, refresh_token} = req.body;
     
     if(!firstname || !lastname || !email || !password || !is_active || !refresh_token ) {
         return res.json({ message: 'Missing required data' })
     }
     try {
         const result = await userModel.create({
            firstname, lastname, email, password, is_active, refresh_token
         })
         res.status(201).json(result)
     } catch (error) {
         return res.json({ message: `Could not create user: ${error.message}`})
     }
  })
  
  //Route til update
  userController.put('/users', async(req, res)=>{
      //console.log('Ready to update');
      const { id, firstname, lastname, email, password, is_active, refresh_token} = req.body;
     
      if(!id || !firstname || !lastname || !email || !password || !is_active || !refresh_token )  {
          return res.status(400).json({ message: 'Missing required data' });
      }
      try {
          const result = await userModel.update({
             id, firstname, lastname, email, password, is_active, refresh_token
          }, {where:{id}})
          if (result[0] === 0) {
              return res.status(404).json({ message: 'User not found' });
          }
          return res.status(200).json({ message: 'User updated successfully' });
      } catch (error) {
          return res.json({ message: `Could not update user: ${error.message}`})
      }
   })
  
   //Route til delete
   userController.delete('/users/:id([0-9]*)', async(req, res)=>{
      // Henter ID fra URL-parametrene
    const { id } = req.params;
    // Tjekker om et ID er angivet
    if (id) {
      try {
        // Forsøger at slette bilen fra databasen baseret på ID
        await userModel.destroy({
          where: { id }
        });
        // Returnerer succesbesked
        res.status(200).send({
          message: `Item is deleted`
        });
      } catch (error) {
        // Send en HTTP-statuskode 500 hvis der opstår en fejl
        res.status(500).send({
          message: `Could not delete: ${error.message}`
        });
      }
    } else {
      // Sender 400 Bad Request-fejl hvis ID er ugyldigt 
      res.status(400).send({
        message: "Id is not valid"
      });
    }
  });
   
      
  
  