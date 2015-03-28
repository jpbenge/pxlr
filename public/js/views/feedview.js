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
        //console.log(postImage);
        var imagePreview = new FileReader();
        pxlr.Router.navigate('createPost', {trigger: true});

        var imgTag = $("#create-post-image-preview").get(0);
        imagePreview.addEventListener("load", function (evt) {
                imgTag.src = evt.target.result;
                //console.log(postImage);
       			pxlr.Router.trigger ('router:relayImage',postImage);
                this.removeEventListener("load");
            }, false);

        imagePreview.readAsDataURL(postImage);
      }
    },
    pixelateScreen: function() {
      var pixelCanvas = $('<canvas/>',{'id':'pixelate-screen-canvas'})
      .width($(window).width())
      .height($(window).height());
      $('body').append(pixelCanvas);
      for (i = 0; i<5;i++)
      {
          var xy = 80/(Math.pow(2,(i)));
          this.drawPixelation(xy,i);
      }
    },
    drawPixelation: function(blockXY, itteration) {
          setTimeout(function() {
          var canvas = $("#pixelate-screen-canvas").get(0);
          var context = canvas.getContext("2d");
          var w = $(window).width();
          var h = $(window).height();
          context.clearRect(0,0,w,h);
          for(y = 0;y<h;y+=blockXY)
          {
            for(x = 0;x<w;x+=blockXY)
            {
            var randomA = Math.random() / 2.5;
            var rGB = 60;
            //var hexString = rGB.toString(16)+rGB.toString(16)+rGB.toString(16)+randomA;
            var fillString = 'rgba('+rGB+','+rGB+','+rGB+','+randomA+')';
            context.fillStyle = fillString;
            context.beginPath();
              context.fillRect(x,y,blockXY,blockXY);
            context.closePath();
            }
         }
         console.log(blockXY);
         if (itteration >= 4)
          {
            canvas.remove();
          }
        }, 70*i+1);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

})(jQuery);
