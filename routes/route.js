var express=require('express');
var router=express.Router();

var csrf=require('csurf');
var passport =require('passport');
const request=require('request');
var Comment=require('../models/comment');

router.get('/c',isLoggedIn,function(req,res){
Comment.find({},function(err,data){
  if (err) throw err;
  res.render('cques',{data:data});
});
});

router.post('/c',isLoggedIn,function(req,res){
var add=new Comment();
add.nme=req.body.nme;
add.cmnt=req.body.cmnt;
add.save(function(err,data){
  if (err) return err;
  res.json(data);
  //res.redirect('/c');
});
});

router.get('/ds',isLoggedIn,function(req,res){
Comment.find({},function(err,data){
  if (err) throw err;
  res.render('dsques',{data:data});
});
});

router.post('/ds',isLoggedIn,function(req,res){
var add=new Comment();
add.nme=req.body.nme;
add.cmnt=req.body.cmnt;
add.save(function(err,data){
  if (err) return err;
  res.json(data);
});
});



var csrfProtection=csrf();
router.use(csrfProtection);

//var router = express.Router();
router.get('/',function(req, res,next){
  res.render('index.hbs');
});
router.get('/home',function(req, res,next){
  res.render('index.hbs');
});

router.get('/faq',function(req, res,next){
  res.render('faq.hbs');
});
router.get('/about',function(req, res,next){
  res.render('about.hbs');
});
router.get('/advertising',function(req, res,next){
  res.render('index.hbs');
});


router.get('/facebook',function(req, res,next){
  res.redirect('https://www.facebook.com/Codezoneadmin/');
});
router.get('/linkedin',function(req, res,next){
  res.redirect('https://www.linkedin.com/in/harsh-jain-85668b148/');
});
router.get('/github',function(req, res,next){
  res.redirect('https://github.com/hjain0726');
});



router.get('/user/signup',notLoggedIn,function(req, res,next){
  var messages=req.flash('error');
  res.render('user/signup.hbs',{csrfToken:req.csrfToken(), messages:messages, hasErrors:messages.length>0});
});
router.post('/user/signup',notLoggedIn,captchaVerification,passport.authenticate('local.signup',{
  successRedirect:'/user/profile',
  failureRedirect:'/user/signup',
  failureFlash:true
}));
router.get('/user/signin',notLoggedIn,function(req, res,next){
  var messages=req.flash('error');
  res.render('user/signin.hbs',{csrfToken:req.csrfToken(), messages:messages, hasErrors:messages.length>0});
});
router.post('/user/signin',notLoggedIn,passport.authenticate('local.signin',{
  successRedirect:'/user/profile',
  failureRedirect:'/user/signin',
  failureFlash:true
}));


router.get('/user/profile',isLoggedIn,function(req, res,next){
  res.render('profilev.hbs');
});
router.get('/logout',isLoggedIn,function(req, res,next){
  req.logout();
  res.redirect('/');
});
/*router.get('/c',isLoggedIn,function(req, res,next){
  res.render('cques.hbs');
});

router.get('/ds',isLoggedIn,function(req, res,next){
  res.render('dsques.hbs');
});*/


module.exports=router;
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
function notLoggedIn(req,res,next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
function captchaVerification(req, res, next) {
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
  {
    req.flash('error','Please select captcha first');
    //return res.json({"responseError" : "Please select captcha first"});

          return  res.redirect('/user/signup');

  }
  const secretKey = "6LcHO08UAAAAACDlqLi4yvvE6P-LHFGwTDwpLLe2";

  const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

  request(verificationURL,function(error,response,body) {
    body = JSON.parse(body);

    if(body.success !== undefined && !body.success) {
      req.flash('error','Failed captcha verification');
      //return res.json({"responseError" : "Failed captcha verification"});
        return res.redirect('/user/signup');

    }
    else {
        return next();
    }
  });
}
