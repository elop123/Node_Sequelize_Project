import express from "express";
import { Brand } from "../models/brand.js";

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

brandController.get("/brand/:id([0-9]*)", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
  
      let result = await Brand.findOne({
        where: { id: id },
      });
  
      if (!result) {
        return res
          .status(404)
          .json({ message: `Bran with id ${id} is not found` });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({
        message: `Error to fetch brand: ${error.message}`,
      });
    }
  });


