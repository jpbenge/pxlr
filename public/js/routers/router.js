var pxlr = pxlr || {};

(function($) {

  PxlrRouter = Parse.Router.extend({
    routes: {
      'login' : 'logIn',
      'signup': 'signUp',
      'feed' : 'userFeed'
    },
    logIn: function() {
      var view = new pxlr.LoginView();
      $('#main-content').html(view.render().el);
    },
    signUp: function() {
      var view = new pxlr.SignUpView();
      $('#main-content').html(view.render().el);
    },
    userFeed : function() {
      $('#main-content').empty();
      console.log('my feed');
    }
  });

  pxlr.Router = new PxlrRouter();
  Parse.history.start();

})(jQuery);

