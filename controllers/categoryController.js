import express from "express";
import { Category } from "../models/category.js"; 

export const categoryController = express.Router();

// Route to get all categories
categoryController.get("/category", async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a category by ID
categoryController.get("/category/:id", async (req, res) => {
    try {
        const categoryId = await Category.findByPk(req.params.id);
        if (!categoryId) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(categoryId);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
