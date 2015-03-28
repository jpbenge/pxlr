var pxlr = pxlr || {};

(function($) {

  pxlr.CreatePostView = Parse.View.extend({
    template: Handlebars.compile($('#create-post-tmpl').html()),
    events: {
      'change #post-type-radio-time' : 'selectTypeTime',
      'change #post-type-radio-tags' : 'selectTypeTags',
      'change #post-type-radio-user' : 'selectTypeUser',
      'click #submit-post' : 'createPost',
      'click #cancel-post' : 'cancelPost',
      'change #clarity-levels-selector' : 'updateClarityGraph',
      'change #clarity-time-days' : 'updateGraphNumbers',
      'change #clarity-time-hours' : 'updateGraphNumbers' 
    },
    postImage: null,
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
    relayImage: function(image)
    {
      postImage = image;
      console.log(postImage);
    },
    createPost: function() {
      console.log("create post");
    },

    cancelPost: function() {
      pxlr.Router.navigate('feed', {trigger: true});
    },

    updateClarityGraph: function() {
    	var numClarityLevels = $('#clarity-levels-selector').val();
    	var clarityTime = parseInt($('#clarity-time-days').val())* 24 + parseInt($('#clarity-time-hours').val());
    	var canvas = $("#clarity-graph").get(0);
		var context = canvas.getContext("2d");
		context.clearRect(149,69,602,22);
		context.lineWidth = 1;
		context.strokeStyle = '#000000';
		context.beginPath();
			context.strokeRect(149,69,602,22);
		context.closePath();

		for (j=0;j<numClarityLevels-1;j++)
		{	//define current section
			var sectionRectX = 150+((600/numClarityLevels)*(j));
			var sectionRectY = 70;
			var sectionRectWidth = (600/numClarityLevels);
			var sectionRectHeight = 20;
			var blockXY = 20/(Math.pow(2,(j+1)));
			//subdivide section into blocks
			for(y = 0;y<sectionRectHeight;y+=blockXY)
			{
				for(x = 0;x<sectionRectWidth;x+=blockXY)
				{
					var randomRG = Math.floor(Math.random() * 136) + 90;
					var blue = 255;
					var hexString = randomRG.toString(16)+randomRG.toString(16)+blue.toString(16);
					context.fillStyle='#'+hexString;
					context.beginPath();
						context.fillRect(sectionRectX+x,sectionRectY+y,blockXY,blockXY);
					context.closePath();
				}
			}
		}
		//fill in last section
		context.fillStyle='#8888ff';
		context.beginPath();
			context.fillRect(150+((600/numClarityLevels)*(numClarityLevels-1)),70,(600/numClarityLevels),20);
		context.closePath();
		//drawLines
		context.fillStyle='#000000';
		for (i=1;i<numClarityLevels;i++)
		{
			var curX = 150+((600/numClarityLevels)*(i));
			context.beginPath();
				context.moveTo(curX,70);
				context.lineTo(curX,90);
				context.stroke();
			context.closePath();
			
		}
		this.updateGraphNumbers();
    },

    updateGraphNumbers: function() {
    	var numClarityLevels = $('#clarity-levels-selector').val();
    	var clarityTime = parseInt($('#clarity-time-days').val())* 24 + parseInt($('#clarity-time-hours').val());
    	var canvas = $("#clarity-graph").get(0);
		var context = canvas.getContext("2d");
    	context.clearRect(0,0,900,68);
    	context.fillStyle='#000000';
    	for (k=1;k<=numClarityLevels;k++)
		{
			var curX = 150+((600/numClarityLevels)*(k));
			var curTime = 0 + (k*(clarityTime / numClarityLevels))
			
			context.beginPath();
				context.fillText((eval(curTime).toFixed(2).replace(/\.?0+$/,"")).toString()+" hours",curX-24,60);
			context.closePath();
		}
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

})(jQuery);
