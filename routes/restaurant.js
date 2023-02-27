const express = require("express");
const router = express.Router()
const seedRestaurant = require("../seedData")
const {Restaurant} = require("../models/index")
const {check, validationResult} = require("express-validator")
const {sequelize} = require("../db");

//TODO: Create your GET Request Route Below: 
router.use(express.json())

router.post("/", [check("name").trim().not().isEmpty(), check("name").isLength({min: 10, max:30}).withMessage("Character Length must be a min length of 10, and a max of 30"), check("location").trim().not().isEmpty(), check("cuisine").trim().not().isEmpty()], async function(request, response) {
    try{
        const errors = validationResult(request)
        if(!errors.isEmpty()){
            response.status(400).send(errors/* .array() */)
        }
        else{
            await Restaurant.create(request.body)
            response.status(200).send(await Restaurant.findAll())/*Returns the Restaurant object instance that was created*/
        }
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