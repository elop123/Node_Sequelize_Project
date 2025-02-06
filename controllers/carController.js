import express from 'express'
import { carModel } from '../models/carModel.js'

export const carController = express.Router()

//Route to list(Read)
carController.get('/cars', async(req,res)=>{
//console.log('Get list of cars');
//res.send('get list')
   try {
       const data = await carModel.findAll({
           attributes: ['brand', 'color']
       })

       if(!data || data.length === 0) {
          return res.json({ message: 'No data found'})
      }
      res.json(data)
  } catch (error) {
      console.error(`Could not get car list: ${error}`)
 }
})

//Route to details (Read)
carController.get('/cars/:id([0-9]*)', async(req,res)=>{
   try {
      const { id } = req.params
      const data = await carModel.findOne({ where: { id: id },
          attributes: ['brand', 'color']
      })

      if(!data) {
          return res.json({ message: `Could not find car on id #${id}` })
      }

      return res.json(data);
  
  } catch (error) {
      console.error(`Could not get car details: ${error}`)        
  }
})

// Route to create (CREATE)
carController.post('/cars', async (req, res) => {
   const { brand, model, year, price, color , fueltype} = req.body;
   
   if(!brand || !model || !year || !price || !color || !fueltype ) {
       return res.json({ message: 'Missing required data' })
   }

   try {
       const result = await carModel.create({
           brand, model, year, price, color, fueltype
       })

       res.status(201).json(result)
   } catch (error) {
       return res.json({ message: `Could not create car: ${error.message}`})
   }
})

//

carController.put('/cars', async(req, res)=>{
    //console.log('Ready to update');
    const { id, brand, model, year, price, color , fueltype} = req.body;
   
    if(!brand || !model || !year || !price || !color || !fueltype ||!id ) {
        return res.status(400).json({ message: 'Missing required data' });
    }
    try {
        const result = await carModel.update({
            brand, model, year, price, color, fueltype
        }, {where:{id}})
        if (result === 0) {
            return res.status(404).json({ message: 'Car not found or no changes made' });
        }
        return res.status(200).json({ message: 'Car updated successfully' });
    } catch (error) {
        return res.json({ message: `Could not update car: ${error.message}`})
    }
 })

    
