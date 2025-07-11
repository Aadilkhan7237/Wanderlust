const Review=require("../models/review")
const Listing=require("../models/listing");

module.exports.postReview=async(req,res,next)=>{
    // console.log(req.params.id);
        let listing=await Listing.findById(req.params.id);
        let newReview=new Review(req.body.review);
         newReview.author=req.user._id;
   
        await newReview.save();
        
        listing.reviews.push(newReview);
   
        
        await listing.save();
        req.flash("success","New Review created");
   
       // console.log(newReview);
        res.redirect(`/listings/${req.params.id}`);
   }

   module.exports.detroyReview=async(req,res,next)=>{
    let{id,reviewId}=req.params;
    
    
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
   
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`);
   }