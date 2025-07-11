const express=require("express");
const router=express.Router();
const User=require("../models/user");
const passport = require("passport");
const {saveRedirectURL}=require("../middleware");
const userController=require("../controllers/user");

//combining signUp GET & POST
router.route("/signup").get(userController.signupForm).post(userController.signup);

//Sign Up
// router.get("/signup",userController.signupForm);

// router.post("/signup",userController.signup);


//Combining Login GET & POST
router.route("/login").get(userController.loginForm).post(saveRedirectURL,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.logIn);


//Log in-GET
// router.get("/login",userController.loginForm);
//Log in-POST
// router.post("/login",saveRedirectURL,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.logIn);


//LogOut
router.get("/logout",userController.logOut);



module.exports=router;