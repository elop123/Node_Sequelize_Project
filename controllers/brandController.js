import express from "express";
import { Brand } from "../models/brandModel.js";

export const brandController = express.Router();

// Route to get all brands
brandController.get("/brand", async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.status(200).json(brands);
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get a single brand by ID
brandController.get("/brand/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findOne({ where: { id } });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to create a new brand
brandController.post("/brand", async (req, res) => {
  const { name, logo } = req.body;

  if (!name || !logo ) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const newBrand = await Brand.create({ name, logo});
    res.status(201).json({ message: "Brand created successfully", brand: newBrand });
  } catch (error) {
    console.error("Error creating brand:", error);
    res.status(500).json({ error: error.message });
  }
});

//Route to update
brandController.put('/brand', async(req, res)=>{
    //console.log('Ready to update');
    const { name, logo, id } = req.body;
   
    if(!id || !name || !logo) {
        return res.status(400).json({ message: 'Missing required data' });
    }
    try {
        const result = await Brand.update({
            name, logo
        }, {where:{id}})
        if (result === 0) {
            return res.status(404).json({ message: 'Brand not found or no changes made' });
        }
        return res.status(200).json({ message: 'Brand updated successfully' });
      } catch (error) {
          return res.json({ message: `Could not update brand: ${error.message}`})
      }
   })
  
//Route til delete
 brandController.delete('/brand/:id([0-9]*)', async(req, res)=>{
  const { id } = req.params;
  if (id) {
    try {
      await Brand.destroy({
        where: { id }
      });
      res.status(200).send({
        message: `Item is deleted`
      });
    } catch (error) {
      res.status(500).send({
        message: `Could not delete: ${error.message}`
      });
    }
  } else {
    res.status(400).send({
      message: "Id is not valid"
    });
  }
});
 


