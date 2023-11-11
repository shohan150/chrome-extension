async function capture() {
   const stream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true
   });

   const vid = document.createElement('video');
   vid.addEventListener('loadedmetadata', function () {
      const canvas = document.createElement('canvas');
      ctx = canvas.getContext("2d");
      ctx.canvas.width = vid.videoWidth;
      ctx.canvas.height = vid.videoHeight;
      ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);

      stream.getVideoTracks()[0].stop();

      let imgLink = document.createElement('a');
      imgLink.download = "screen.png";
      imgLink.href = canvas.toDataURL('image/png');
      imgLink.click();
   });
   vid.srcObject = stream;
   vid.play();
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   if (request.message === 'Hello') {
      capture();
   }
});
