var pxlr = pxlr || {};

(function($) {

  pxlr.FeedView = Parse.View.extend({
    template: Handlebars.compile($('#feed-tmpl').html()),
    events: {
   		'click .new-post' : 'newPost',
      'change #new-post-hidden-image-upload' : 'imageSelected'
    },
    newPost: function() {
      $("#new-post-hidden-image-upload").click();
    },

    imageSelected: function() {
      var fileUploadControl = $("#new-post-hidden-image-upload")[0];
      if (fileUploadControl.files.length > 0) {
        var postImage = fileUploadControl.files[0];
        console.log(postImage);
        var imagePreview = new FileReader();
        pxlr.Router.navigate('createPost', {trigger: true});
        var imgTag = $("#create-post-image-preview").get(0);
        imagePreview.addEventListener("load", function (evt) {
                imgTag.src = evt.target.result;
                this.removeEventListener("load");
            }, false);

        imagePreview.readAsDataURL(postImage);
      }
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

})(jQuery);
