const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/user_controller');
const resetPasswordController = require('../controllers/reset_password_controller');

router.get('/sign-up',userController.signup);
router.post('/create-account',userController.createAccount);
router.get('/sign-in',userController.signin);
router.get('/sign-out',userController.signOut);
router.get('/profile',passport.checkAuthentication, userController.profile);
router.post('/logIn',passport.authenticate(
    'jwt',
    {failureRedirect:'/users/sign-in'}
),userController.logIn);


router.get('/forgot-password',resetPasswordController.forgotPassword);
router.post('/reset-window',resetPasswordController.settleResetUser);
router.get('/reset-password',resetPasswordController.resetPasswordTemplate);
router.post('/reset-credentials',resetPasswordController.resetCredentials);


router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.logIn);

router.get('/auth/facebook',passport.authenticate('facebook',{scope:'email'}));
router.get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect:'/users/sign-in'}),userController.logIn);

router.get('/auth/github',passport.authenticate('github',{scope:['user:email']}));
router.get('/auth/github/callback',passport.authenticate('github',{failureRedirect:'/users/sign-in'}),userController.logIn);



module.exports = router;