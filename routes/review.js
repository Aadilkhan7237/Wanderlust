const express=require("express");
const router=express.Router({mergeParams:true});
const Review=require("../models/review");
const wrapAsync=require("../utils/wrapAsync");
const MyExpressError=require("../utils/ExpressError");
const Listing=require("../models/listing");
const {validateReview, isloggedIn, isReviewAuthor}=require("../middleware");
const reviewController=require("../controllers/review");









  //POST  review Route
  router.post("/",isloggedIn,validateReview, wrapAsync(reviewController.postReview));
  
  
  //Delete Review Route
  router.delete("/:reviewId",isloggedIn,isReviewAuthor,wrapAsync(reviewController.detroyReview));

module.exports=router;