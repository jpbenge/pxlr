Parse.Cloud.beforeSave("Image", function(request, response) {
	for (var i = 0; i<request.object.get('pixelation');i++)
	{
		var PixelImage = Parse.Object.extend('PixelImage');
		var pixelImage = new PixelImage();
		pixelImage.set('image',request.object.get('image'));
		
		pixelImage.save().then(
  		function(savedPixelImage) {
    		request.object.add('pixelImages',{"__type":"Pointer","className":"PixelImage","objectId":savedPixelImage.id});
             console.log('Successfully created pixelImage.');
             if (i = i<request.object.get('pixelation')-1)
             {
             	console.log("Before Save: " + request.object.get('image'));
				response.success();
             }
  		},
  		function(error) {
    		console.log("Could not save a pixelImage " + error.code + ' : ' +error.message);
  		});

	}
  	
  
});