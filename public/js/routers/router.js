var pxlr = pxlr || {};

(function($) {

  PxlrRouter = Parse.Router.extend({
    routes: {
      'login' : 'logIn',
      'signup': 'signUp',
      'feed' : 'userFeed',
      'upload':'upload',
      'createPost' : 'createPost'
    },
    createPostView: null,

    initialize: function () {
      this.on('router:relayImage', this.relayImage);
    },
    logIn: function() {
      var view = new pxlr.LoginView();
      $('#main-content').html(view.render().el);
    },
    signUp: function() {
      var view = new pxlr.SignUpView();
      $('#main-content').html(view.render().el);
    },
    userFeed: function() {
      var header = new pxlr.HeaderView();
      $('#header').html(header.render().el);
      var view = new pxlr.FeedView();
      $('#main-content').html(view.render().el);
      //view.pixelateScreen();
    },
    createPost: function() {
      var header = new pxlr.HeaderView();
      $('#header').html(header.render().el);
      createPostView = new pxlr.CreatePostView();
      $('#main-content').html(createPostView.render().el);
      createPostView.updateClarityGraph();
    },
    relayImage: function(image) {
      createPostView.relayImage(image);
    },
    upload: function() {
      var view = new pxlr.UploadView();
      $('#main-content').html(view.render().el); 
    }
  });

  pxlr.Router = new PxlrRouter();
  Parse.history.start();

})(jQuery);

