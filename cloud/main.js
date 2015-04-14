var Image = require("parse-image");
var Buffer = require("buffer").Buffer;
Parse.Cloud.beforeSave("Image", function(request, response) {
  var PixelImage = Parse.Object.extend('PixelImage');
  var imgArray = [];
  var promises = [];
  var lastScaledData = '';
  for (var i = 0;i<request.object.get('numPixelImages');i++)
    {
      var p = new Parse.Promise();
      promises[i] = p;
    }
    var counter = 0;   
    for (var i = 0;i<promises.length;i++)
    {  
      var pixelImage = new PixelImage();
      pixelImage.set('image',request.object.get("image"));
      pixelImage.set('pixelation',i+1);
      imgArray[counter] = pixelImage;
      promises[counter].resolve();
      counter++;          
    }
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
        response.success();
      },function(error){
        console.log("promise fail");
        response.error();
      });
    
});

Parse.Cloud.beforeSave("PixelImage", function(request, response) {
  var counter = 0;
  Parse.Cloud.httpRequest({
      url: request.object.get('image').url()
      }).then(function(response) {
        var bufferImage = new Image();
        return bufferImage.setData(response.buffer);
      }).then(function(bufferImage)
      {
        var newWidth = (bufferImage.width()*(0.01))*Math.pow(2,request.object.get('pixelation'));
        var newHeight = (bufferImage.height()*(0.01))*Math.pow(2,request.object.get('pixelation'));
        return bufferImage.scale({width: newWidth, height: newHeight})
      }).then(function(scaledImage){
        return scaledImage.data();
      }).then(function(scaledData){
        var scaledBase64 = scaledData.toString("base64");
        var parseFile = new Parse.File(counter+request.object.get('image').name(), {base64: scaledBase64});
        return parseFile.save();
      }).then(function(savedFile){
        request.object.set('image',savedFile);
        response.success();
      });
});