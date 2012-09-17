env = {};

function showLoginButton() {
  $('#login-button').removeClass('hidden');
}

window.fbAsyncInit = function() {
  console.log('initting facebook')
  FB.init({
    appId      : '299524266733638', // App ID
    channelURL : 'http://ocwesome.abrady0.c9.io/facebook/channel.html',
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });
  // whenever the user logs in, we tell our login service
  FB.Event.subscribe('auth.login', function() {
     console.log('auth.login'); // never gets called?
  });
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      // the user is logged in and has authenticated your
      // app, and response.authResponse supplies
      // the user's ID, a valid access token, a signed
      // request, and the time the access token 
      // and signed request each expire
      env.uid = response.authResponse.userID;
      env.accessToken = response.authResponse.accessToken;
      console.log('logged in user '+env.uid+' accessToken '+env.accessToken); 
      showLoginButton();
    } else if (response.status === 'not_authorized') {
      // the user is logged in to Facebook, 
      // but has not authenticated your app
      console.log('login status: not authorized');
      showLoginButton();
    } else {
      // the user isn't logged in to Facebook.
      console.log('user not logged in to facebook');
    }
  });

};
// Load the SDK Asynchronously
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
 }(document));