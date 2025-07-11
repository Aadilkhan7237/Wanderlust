const mongoose=require("mongoose");
const Listing=require("../models/listing");
const initdata=require("./data");

main().then(()=>{console.log("Connection successful")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust1');

  
}



const initDB=async()=>{
   await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:'686a5d7b4b02a67fae1572e6'}));
    await Listing.insertMany(initdata.data);
    console.log("DB is initialized");

}

initDB();


