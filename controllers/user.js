const User=require("../models/user");

module.exports.signupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async(req,res,next)=>{
    try{
          let{username,email,pass}=req.body;
    let newUser=new User({
          username:username,
          email:email,
    });

    let registereduser=await User.register(newUser,pass);
  //  console.log(registereduser);
    req.logIn(registereduser,(err)=>{
          if(err){
                next(err);
          }
          req.flash("success","Welcome to Wanderlust");
          res.redirect("/listings");
    });
    
    }
    catch(e){
          req.flash("error",e.message);
          res.redirect("/signup");
    }
   }

module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.logIn=async(req,res)=>{
    req.flash("success",`Welcome back ${req.user.username} on Wanderlust !`);
   
   //console.log("3. Ab uss URL pe hogye redirect");
   let redirectURL=res.locals.redirectURL||"/listings"
  
 
     res.redirect(redirectURL);
}

module.exports.logOut=(req,res,next)=>{
    req.logOut((err)=>{
          if(err){
                next(err);
          }
          req.flash("success","You are logged out !");
          return res.redirect("/listings");
    })
}