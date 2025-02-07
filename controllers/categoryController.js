import express from "express";
import { categoryModel } from "../models/categoryModel.js"; 

export const categoryController = express.Router();

// Route to get all categories
categoryController.get("/category", async (req, res) => {
    try {
        const categories = await categoryModel.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a single category by ID
categoryController.get("/category/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const category = await categoryModel.findOne({ where: { id } });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ error: error.message });
    }
});

// Route to create a new category
categoryController.post("/category", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const newcategory = await categoryModel.create({ name });
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: error.message });
  }
});

//Route to update
categoryController.put('/category', async(req, res)=>{
    //console.log('Ready to update');
    const { name, id } = req.body;
   
    if(!id || !name ) {
        return res.status(400).json({ message: 'Missing required data' });
    }
    try {
        const result = await categoryModel.update({
            name
        }, {where:{id}})
        if (result === 0) {
            return res.status(404).json({ message: 'Category not found or no changes made' });
        }
        return res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        return res.json({ message: `Could not update category: ${error.message}`})
    }
 })


//Route til delete
 categoryController.delete('/category/:id([0-9]*)', async(req, res)=>{
  const { id } = req.params;
  if (id) {
    try {
      await categoryModel.destroy({
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
 