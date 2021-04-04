var express = require('express');
var router = express.Router();
var passport = require('passport');
const user = require('../models/user');


router.get('/login') 
    .get(function(req,res,next){
    res.render('login', { title: 'Login your acc' });
  })
   // .post(passport.authenticate('local',{
   //     failureRedirect:'/login'
   // }),function(req,res){
   //     res.redirect('/');
   // });
   .post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));

  
router.route('/register')  
.get(function(req, res, next) 
{
    console.log('in get request of register');
    res.render('register', { title: 'Register your acc' }); 
})

.post(function(req, res, next){
    console.log('in post request of register');

    req.checkBody('name','Empty Name').notEmpty();
    req.checkBody('email','Invalid Email').isEmail();
    req.checkBody('password','Empty Password').notEmpty();
    req.checkBody('password',' Password do not match').equals(req.body.confirmPassword).notEmpty();
    
    var errors = req.validationErrors();

    if(errors){
        res.render('register',{
            name: req.body.name,
            email: req.body.email,
            errorMessages: errors
        });
    }
    else{
        var user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        user.save(function(err){
            if(err){
                res.render('register',{errorMessages:err});
            }
            else{
                res.redirect('/login');
            }
        })
    }
});

router.get('/logout',function(req,res){
  req.logout();
  res.redirect('/');
});

router.get('/auth/facebook',passport.authenticate('facebook',{scope: 'email'}));

router.get('/auth/facebook/callback',passport.authenticate('facebook',{
  successRedirect:'/',
  failureRedirect:'/'
}));



module.exports = router;