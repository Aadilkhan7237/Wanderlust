const express=require("express");
const router=express.Router();
const Listing=require("../models/listing");
const wrapAsync=require("../utils/wrapAsync");
const {isloggedIn, isOwner,validateListing}=require("../middleware");
const listingController=require("../controllers/listing");
const multer  = require('multer')
const {storage}=require("../cloudconfig");
const upload = multer({ storage });

//combining Index and Create route
router.route("/")
.get(wrapAsync(listingController.index))
 .post(isloggedIn,validateListing,upload.single("listing[image]"),wrapAsync(listingController.newListing));


//Index Route
// router.get("/",wrapAsync(listingController.index));

 //New Route
 router.get("/new",isloggedIn,listingController.newform);
 
 //Create Route
//router.post("/",isloggedIn,validateListing,validateSize,wrapAsync(listingController.newListing));


 //Edit Route
 router.get("/:id/edit",isloggedIn,isOwner, wrapAsync(listingController.editListing));
 

//combining Update,Delete and Show Route
router.route("/:id")
.put(isloggedIn,isOwner,validateListing,upload.single("listing[image]"), wrapAsync(listingController.updateListing))
.delete(isloggedIn,isOwner,wrapAsync(listingController.deleteListing))
.get(wrapAsync(listingController.showListing));

 

 //Update Route
//  router.put("/:id",isloggedIn,isOwner,validateListing, wrapAsync(listingController.updateListing));
 
 //Delete Route
//  router.delete("/:id",isloggedIn,isOwner,wrapAsync(listingController.deleteListing));
 

   //Show route
  //  router.get("/:id",wrapAsync(listingController.showListing));
 


 module.exports=router;