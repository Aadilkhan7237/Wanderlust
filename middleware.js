const Listing=require("./models/listing");
const MyExpressError=require("./utils/ExpressError");
const {listingSchema,reviewSchema}=require("./schema");
const Review=require("./models/review");



module.exports.isloggedIn=(req,res,next)=>{
    
   
    if(!req.isAuthenticated()){
       // console.log("1.pehle ho URL save ho gyi session mein");
        req.session.redirectURL=req.originalUrl;

        let customURL=`/listings/${req.params.id}/reviews`
        if(req.baseUrl===customURL){
          req.session.redirectURL=`/listings/${req.params.id}`;
        }
       
        req.flash("error","You must be logged in to make changes");
         return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectURL=(req,res,next)=>{
    if(req.session.redirectURL){
        //console.log("2.Ab transfer krdi local variable mein");
        res.locals.redirectURL=req.session.redirectURL;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
   if(!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
   }
   next();
}

module.exports.validateListing=(req,res,next)=>{
    let{error}=listingSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new MyExpressError(400,errMsg);
    }
    else{
     
      next();
    }
  }

  module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new MyExpressError(400,errMsg);
    }
    else{
      next();
    }
  }

  module.exports.isReviewAuthor=async(req,res,next)=>{
    let{id,reviewId}=req.params;
    let currReview=await Review.findById(reviewId);
    if(!currReview.author._id.equals(req.user._id)){
      req.flash("error","You are not the owner of this review");
    return res.redirect(`/listings/${id}`);
    }
    next();
  }

 