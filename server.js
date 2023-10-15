const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require("./routes/user_routes")
const employeeRouter = require("./routes/employee_routes")

const SERVER_PORT = 8082; // port I used

const DB_URL = "mongodb+srv://skulmiye:QmHzzlabm8a9dlzD@cluster0.crgngtc.mongodb.net/f2023_comp3123_assignment1?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});

// Import user and employee routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/emp', employeeRouter);

app.get('/', (req, res) => {
    res.send("<h1>Welcome to User and Employee Management Application</h1>");
});

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});