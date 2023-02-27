const express = require("express");
const app = express();
const restaurantRouter = require("./routes/restaurant")
const {sequelize} = require("./db");
const port = 3000;

//TODO: Create your GET Request Route Below: 
app.use("/restaurants", restaurantRouter)

app.listen(port, async function() {
    await sequelize.sync()
    console.log(`Your server is listening on port: http://localhost:${port}/restaurants`);
})