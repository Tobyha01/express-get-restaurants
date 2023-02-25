const express = require("express");
const app = express();
const seedRestaurant = require("./seedData")
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");
const port = 3000;

//TODO: Create your GET Request Route Below: 
app.use(express.json())

app.post("/restaurants", async function(request, response) {
    try{
        const restaurant = await Restaurant.create(seedRestaurant[2])
        response.status(200).send({restaurant})/*Returns the Restaurant object instance that was created*/
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

app.get("/restaurants/:id", async function(request, response){
    try{
        const restaurant = await Restaurant.findByPk(request.params.id);
        response.status(200).send({restaurant})/*Returns the requested Restaurant object instance from the Restaurant db*/
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

app.put("/restaurants/:id", async function(request, response){
    try{
        const restaurant = await Restaurant.update(request.body, {where: {id: request.params.id}})
        response.status(200).send(restaurant)/*Returns the number of updated instances*/
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

app.delete("/restaurants/:id", async function (request, response) {
    try{
        const restaurant = await Restaurant.destroy({where: {id: request.params.id}})
        response.status(200).send({restaurant}) /*Returns the number of deleted instances*/
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

app.listen(port, async function() {
    await sequelize.sync();
    console.log(`Your server is listening on port: http://localhost:${port}/restaurants`);
})