var pxlr = pxlr || {};

(function($) {

  pxlr.SignUpView = Parse.View.extend({
    template: Handlebars.compile($('#signup-tmpl').html()),
    events: {
      'click .signup' : 'signUp'
    },

    signUp: function() {
      var username = $('#username').val();
      var password = $('#password').val();
      var email = $('#email').val();

      var user = new Parse.User();
      user.set('username', username);
      user.set('password', password);
      user.set('email', email)

      user.signUp().then(function() {
        pxlr.Router.navigate('login', {trigger: true});
      }).fail(function() {
        console.log('failed!');
      });
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

})(jQuery);

