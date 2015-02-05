var pxlr = pxlr || {};

(function($) {

  pxlr.LoginView = Parse.View.extend({
    template: Handlebars.compile($('#login-tmpl').html()),
    events: {
      'click .login' : 'logIn'
    },

    logIn: function() {
      var username = $('#username').val();
      var password = $('#password').val();

      var user = new Parse.User();

      user.set('username', username);
      user.set('password', password);

      user.logIn().then(function() {
        console.log('success!');
      }).fail(function() {
        console.log('failed.');
      });
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

})(jQuery);


