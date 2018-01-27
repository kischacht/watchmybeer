//Test browser support
var SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;
var imageCapture;

console.log(SUPPORTS_MEDIA_DEVICES);
if (SUPPORTS_MEDIA_DEVICES) {
  //Get the environment camera (usually the second one)
  navigator.mediaDevices.enumerateDevices().then(function(devices){
  
    //get list of cameras
    const cameras = devices.filter(function(device){return device.kind === 'videoinput'} );
    
    //stop if no cameras
    if (cameras.length === 0) {
      throw 'No camera found on this device.';
    }

    //get next to last camera
    const camera = cameras[cameras.length - 1];
    console.log(camera);

    // Create stream and get video track
    navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: camera.deviceId,
        facingMode: ['user', 'environment'],
        height: {ideal: 1080},
        width: {ideal: 1920}
      }
    }).then(function(stream){
      console.log(stream);
      var track = stream.getVideoTracks()[0];

      //Create image capture object and get camera capabilities
      var imageCapture = new ImageCapture(track);
      console.log(imageCapture);
      var photoCapabilities = imageCapture.getPhotoCapabilities().then(function(){

        //todo: check if camera has a torch

        //let there be light!
        var btn = document.querySelector('.switch');
        btn.addEventListener('click', function(){
          track.applyConstraints({
            advanced: [{torch: true}]
          });
        });
      });

    });

  });
  
  //The light will be on as long the track exists
  
  
}
