const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const carsRoutes = require("./routes/cars");
const usersRoutes = require("./routes/users");

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.use("/cars", carsRoutes);
server.use("/users", usersRoutes);

server.listen(8000, () => console.log("Server for cars is started..."));
