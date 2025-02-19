import express from 'express'
import { carModel } from '../models/carModel.js'
import { brandModel } from '../models/brandModel.js'
import { categoryModel} from '../models/categoryModel.js'

export const carController = express.Router()

// Relations beteween carModel & brandModel
carModel.belongsTo(brandModel, {
  foreignKey: {
      allowNull: false
  }
})
brandModel.hasMany(carModel)

carModel.belongsTo(categoryModel, {
  foreignKey: {
      allowNull: false
  }
})

categoryModel.hasMany(carModel);

//Route to list(Read)
carController.get('/cars', async(req,res)=>{
//res.send('get list')
   try {
       const data = await carModel.findAll({
        include: [
          {
              model: brandModel,
              //attributes: ['name', 'logo', 'id']
          },
          {
              model: categoryModel,
              attributes: ['name', 'id']
          }
      ]
   });

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
        include: [
          {
              model: brandModel,
              attributes: ['name', 'logo', 'id']
          },
          {
              model: categoryModel,
              attributes: ['name', 'id']
          }
      ]
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
   const { brandId, categoryId, model, year, price, color , fueltype} = req.body;
   
   if(!brandId || !categoryId || !model || !year || !price || !color || !fueltype ) {
       return res.json({ message: 'Missing required data' })
   }

   try {
       const result = await carModel.create({
          brandId, model, year, price, color, fueltype, categoryId
       })

       res.status(201).json(result)
   } catch (error) {
       return res.json({ message: `Could not create car: ${error.message}`})
   }
})

//Route til update
carController.put('/cars', async(req, res)=>{
    //console.log('Ready to update');
    const { id, model, year, price, color , fueltype, brandId, categoryId} = req.body;
   
    if( !brandId || !categoryId || !model || !year || !price || !color || !fueltype ||!id ) {
        return res.status(400).json({ message: 'Missing required data' });
    }
    try {
        const result = await carModel.update({
           model, year, price, color, fueltype, brandId, categoryId
        }, {where:{id}})
        if (result[0] === 0) {
            return res.status(404).json({ message: 'Car not found or no changes made' });
        }
        return res.status(200).json({ message: 'Car updated successfully' });
    } catch (error) {
        return res.json({ message: `Could not update car: ${error.message}`})
    }
 })

 //Route til delete
 carController.delete('/cars/:id([0-9]*)', async(req, res)=>{
    // Henter ID fra URL-parametrene
  const { id } = req.params;
  // Tjekker om et ID er angivet
  if (id) {
    try {
      // Forsøger at slette bilen fra databasen baseret på ID
      await carModel.destroy({
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
 
    
