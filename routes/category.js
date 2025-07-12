const express=require("express");
const router=express.Router();
const Listing=require("../models/listing");

router.get("/trending",async(req,res)=>{
    
     let allListings=await Listing.find({category:"Trending"});
  

    res.render("listings/index.ejs",{allListings});
});

router.get("/rooms",async(req,res)=>{
    
  let allListings=await Listing.find({category:"Rooms"});
  res.render("listings/index.ejs",{allListings});

   
});


router.get("/iconic_cities",async(req,res)=>{
  
  let allListings=await Listing.find({category:"Iconic Cities"});
  
  res.render("listings/index.ejs",{allListings});
   
});


router.get("/mountains",async(req,res)=>{
 
  let allListings=await Listing.find({category:"Mountains"});
  res.render("listings/index.ejs",{allListings});

   
});


router.get("/castles",async(req,res)=>{
  
  let allListings=await Listing.find({category:"Castles"});
  res.render("listings/index.ejs",{allListings});
});

router.get("/amazing_pool",async(req,res)=>{
   
  let allListings=await Listing.find({category:"Amazing pool"});
  res.render("listings/index.ejs",{allListings});
});


router.get("/camping",async(req,res)=>{
   
  let allListings=await Listing.find({category:"Camping"});
  res.render("listings/index.ejs",{allListings});
});

router.get("/farm",async(req,res)=>{
   
  let allListings=await Listing.find({category:"Farm"});
  res.render("listings/index.ejs",{allListings});
});


router.get("/arctic",async(req,res)=>{
    
  let allListings=await Listing.find({category:"Arctic"});
  res.render("listings/index.ejs",{allListings});
});

router.get("/dome",async(req,res)=>{
   
  let allListings=await Listing.find({category:"Dome"});
  res.render("listings/index.ejs",{allListings});

    
});



module.exports=router;