const Listing=require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const MAP_TOKEN=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: MAP_TOKEN });

module.exports.index=async(req,res)=>{
    let allListings=await Listing.find();

    res.render("listings/index.ejs",{allListings});
 }

 module.exports.newform=(req,res)=>{
    //console.log(req.user);
   
     res.render("listings/newForm");
   }

   module.exports.newListing=async(req,res,next)=>{
    // if(req.file.size>6291456){
    //   req.flash("error","File size is more than 6 mb");
    //   req.session.filesize=req.file.size;
    //    return res.redirect("/listings/new");
    // }
    //console.log(req.file);
      
   let response=await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1
    }).send();
      
     let url=req.file.path;
     let filename=req.file.filename;

    let newListing=req.body.listing;

   newListing.owner=req.user._id;

   newListing.image={url,filename};

   newListing.geometry=response.body.features[0].geometry;
   // console.log(listing);
    let createdListing=await Listing.insertOne(newListing);
    //console.log(createdListing);
    req.flash("success","New Listing created");
    res.redirect("/listings");
 }

 module.exports.editListing=async(req,res)=>{
    let{id}=req.params;
    let currListing=await Listing.findById(id);
    if(!currListing){
     req.flash("error","Listing you requested for does not exist");
      return res.redirect("/listings");
 
    }
    let originalImageUrl=currListing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/editForm.ejs",{currListing, originalImageUrl});
  }

  module.exports.updateListing=async(req,res,next)=>{
    let {id}=req.params;
    let updatedListing=req.body.listing;
    
   let listing= await Listing.findByIdAndUpdate(id,updatedListing);
   if(req.file){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    listing.save();
   }

   let response=await geocodingClient.forwardGeocode({
        query:req.body.listing.location,
        limit: 1
      }).send();

      listing.geometry=response.body.features[0].geometry;
      await listing.save();
  
  
  
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
  }

  module.exports.deleteListing=async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted");
    res.redirect("/listings");
  }

  module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
   
    if(!listing){
     req.flash("error","Listing you requested for does not exist");
      return res.redirect("/listings");

    }
   
  res.render("listings/show.ejs",{listing});
  }