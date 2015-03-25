var pxlr = pxlr || {};

(function($) {

  pxlr.CreatePostView = Parse.View.extend({
    template: Handlebars.compile($('#create-post-tmpl').html()),
    events: {
      'change #post-type-radio-time' : 'selectTypeTime',
      'change #post-type-radio-tags' : 'selectTypeTags',
      'change #post-type-radio-user' : 'selectTypeUser',
      'click #submit-post' : 'createPost',
      'click #cancel-post' : 'cancelPost'
    },
    initialize: function() {
             
    },
    selectTypeTime: function() {
      $.each($(".create-post-radio-div"), function()
      {
        if (this.children[0].id == 'post-type-radio-time')
        {
          $(this).addClass("create-post-radio-active");
        }
        else
        {
          $(this).removeClass("create-post-radio-active");
        }
      })
      $.each($(".post-type-div"), function()
      {
        if (this.id == 'create-post-time-div')
        {
          this.style.display = 'block';
        }
        else
        {
          this.style.display = 'none';
        }
      })
    },
    selectTypeTags: function() {
      $.each($(".create-post-radio-div"), function()
      {
        if (this.children[0].id == 'post-type-radio-tags')
        {
          $(this).addClass("create-post-radio-active");
        }
        else
        {
          $(this).removeClass("create-post-radio-active");
        }
      })

      $.each($(".post-type-div"), function()
      {
        if (this.id == 'create-post-tags-div')
        {
          this.style.display = 'block';
        }
        else
        {
          this.style.display = 'none';
        }
      })
    },
    selectTypeUser: function() {
      $.each($(".create-post-radio-div"), function()
      {
        if (this.children[0].id == 'post-type-radio-user')
        {
          $(this).addClass("create-post-radio-active");
        }
        else
        {
          $(this).removeClass("create-post-radio-active");
        }
      })

      $.each($(".post-type-div"), function()
      {
        if (this.id == 'create-post-user-div')
        {
          this.style.display = 'block';
        }
        else
        {
          this.style.display = 'none';
        }
      })
    },
    createPost: function() {
      console.log("create post");
    },

    cancelPost: function() {
      pxlr.Router.navigate('feed', {trigger: true});
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

})(jQuery);
