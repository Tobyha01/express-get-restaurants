const express = require("express");
const router = express.Router()
const seedRestaurant = require("../seedData")
const {Restaurant} = require("../models/index")
const {sequelize} = require("../db");

//TODO: Create your GET Request Route Below: 
router.use(express.json())

router.post("/", async function(request, response) {
    try{
        const restaurant = await Restaurant.create(seedRestaurant[1])
        response.status(200).send({restaurant})/*Returns the Restaurant object instance that was created*/
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

router.get("/:id", async function(request, response){
    try{
        const restaurant = await Restaurant.findByPk(request.params.id);
        response.status(200).send(restaurant)/*Returns the requested Restaurant object instance from the Restaurant db*/
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

router.put("/:id", async function(request, response){
    try{
        const restaurant = await Restaurant.update(request.body, {where: {id: request.params.id}})
        response.status(200).send(restaurant)/*Returns the number of updated instances*/
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

router.delete("/:id", async function (request, response) {
    try{
        const restaurant = await Restaurant.destroy({where: {id: request.params.id}})
        response.status(200).send({restaurant}) /*Returns the number of deleted instances*/
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

module.exports = router