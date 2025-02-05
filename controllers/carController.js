import express from 'express'
import { carModel } from '../Models/carModel.js'

export const carController = express.Router()

//Route to list
carController.get('/cars', async(req,res)=>{
   console.log('Get list of cars');
   res.send('Get list of cars')
})

//Route to details
carController.get('/cars/:id([0-9]*)', async(req,res)=>{
    res.send(`Get details for record #{id}`);
 })