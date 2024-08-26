const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const username = encodeURIComponent("nityam");
const password = encodeURIComponent("nityam@tripathi");


const connectDB = async() => {
  await mongoose.connect(`mongodb+srv://${username}:${password}@atlascluster.zg3myjt.mongodb.net/mydb`);
  console.log("Connected");
}

connectDB();

const Campaign = require('./models/Campaign');

app.get('/', async(req,res)=>{
  const cmp = new Campaign({
    image:"none",
    projectTitle: "Car",
    description:"Audi",
    targetFund:"100",
    funsReceived:"20",
    startDate:"2024-08-26",
    endDate:"2024-08-27",
  })
  const data = await cmp.save();
  res.send(data);
})

app.listen(port, ()=>{
  console.log(`Listening on Port ${port}`);
})