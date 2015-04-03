var Image = require("parse-image");
var Buffer = require("buffer").Buffer;
Parse.Cloud.beforeSave("Image", function(request, response) {
  var PixelImage = Parse.Object.extend('PixelImage');
  var imgArray = [];
  var promises = [];
  var lastScaledData = '';
  for (var i = 0;i<request.object.get('pixelation');i++)
    {
      var p = new Parse.Promise();
      promises[i] = p;
    }
    var counter = 0;
    var counter = 0;
    Parse.Cloud.httpRequest({
      url: request.object.get('image').url()
    }).then(function(response) {
      // Create image object
      var bufferImage = new Image();
      //console.log('BUFFER LENGTH :: ' + response.buffer.length);
      return bufferImage.setData(response.buffer);
    }).then(function(bufferImage)
    {
      for (var i = 0;i<promises.length;i++)
      {
        var newWidth = (bufferImage.width()*(0.01))*Math.pow(2,i);
        var newHeight = (bufferImage.height()*(0.01))*Math.pow(2,i);
        console.log('IMAGE :: ' + JSON.stringify(bufferImage));
        bufferImage.scale({width: newWidth, height: newHeight})
        .then(function(scaledImage)
        {
        	console.log(scaledImage.width());
          return scaledImage.data();
      	}).then(function(scaledData)
        {
        	if (scaledData.toString("base64") == lastScaledData)
        	{
        		console.log('THEY ARE THE SAME, I HATE ASYNC CODEING');
        	}
        	lastScaledData = scaledData.toString("base64");
        	//console.log('SCALED ++ ' + JSON.stringify(scaledData));
          console.log(scaledData.toString("base64"));
          var scaledBase64 = scaledData.toString("base64");
          //pixelImage.set('image',bufferImage);

          var parseFile = new Parse.File(counter+request.object.get('image').name(), {base64: scaledBase64});
          return parseFile.save();
        }).then (function(savedFile) {
          var pixelImage = new PixelImage();
          pixelImage.set('image',savedFile);
          imgArray[counter] = pixelImage;
          promises[counter].resolve();
          counter++;
        }, function(error) {
            console.log("Could not save a parse file " + error.code + ' : ' +error.message);
        });
      }
    });
  Parse.Promise.when(promises).then(function(promises) {
    console.log('when');
    Parse.Object.saveAll(imgArray).then(
        function(savedPixelImageArray) {
      console.log('Successfully created pixelImages.');
          for (var j = 0;j<savedPixelImageArray.length;j++)
          {
            request.object.add('pixelImages',{"__type":"Pointer","className":"PixelImage","objectId":savedPixelImageArray[j].id});
          }
        },
        function(error) {
          console.log("Could not save a pixelImage " + error.code + ' : ' +error.message);
        }).then(function(p){
      console.log("promise success");
        response.error();
      },function(error){
        console.log("promise fail");
        response.error();
      });
    
    });
    console.log('END');
});