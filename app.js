require("dotenv").config();
require('express-async-errors');

const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors')
const app = express();
const mainRouter = require("./routes/user");
const dummyCertificates = require('./dummyData/dummyCertificate');
const dummyUserData = require('./dummyData/dummyUserData.js');
const CertificateModel = require("./models/Cid");
const UserModel = require('./models/User');

app.use(express.json());

app.use(cors())
app.use("/api/v1", mainRouter);
// app.use('/api/users', userRoutes);

const port = process.env.PORT || 3000;

//Seeding data from json file to the database.
const seedDB = async() => {
    // await UserModel.deleteMany({});     //It will delete already existing data in the database.
    // await CertificateModel.deleteMany({});
    // await CertificateModel.insertMany(dummyCertificates);
    // await UserModel.insertMany(dummyUserData);
}
// seedDB().then(() => {
//     console.log("Database seeded successfully");
// })

const start = async () => {
    try {     
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })
        seedDB().then(() => { //If the seeding of the data is successful.
            console.log("Database seeded successfully");
        })

    } catch (error) {
       console.log(error); 
    }
}

start();