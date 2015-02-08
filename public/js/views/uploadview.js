var pxlr = pxlr || {};

(function($) {

  pxlr.UploadView = Parse.View.extend({
    template: Handlebars.compile($('#upload-tmpl').html()),
    events: {
      'click .upload-pic' : 'uploadPic'
    },

    uploadPic: function() {

      var fileUploadControl = $("#picFileUpload")[0];
      if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = "photo.jpg";
        var parseFile = new Parse.File(name, file);

        parseFile.save(function() {
          if(Parse.User.current()) {
            var image = new pxlr.Image();
            image.set('image',parseFile);
            image.set('user', Parse.User.current());
            image.save({success: function() {
              alert('Successfully uploaded picture.')
            }});
          }   
        }, function(error) {
          console.log(error);
        });
      }
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

})(jQuery);
