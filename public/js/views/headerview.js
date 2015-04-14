var pxlr = pxlr || {};

(function($) {

  pxlr.HeaderView = Parse.View.extend({
    template: Handlebars.compile($('#header-tmpl').html()),
    events: {
      'click .logout' : 'logOut'
    },

    logOut: function() {
      Parse.User.logOut();
      pxlr.Router.navigate('login', {trigger: true});
    },

    render: function() {
      var user = Parse.User.current();
      if (user)
      {
        var userInfo = user.toJSON();
        this.$el.html(this.template(userInfo));
        return this;
      }
      this.$el.html(this.template());
      return this;
    }
  });

})(jQuery);


