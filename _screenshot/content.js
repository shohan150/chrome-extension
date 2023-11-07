const script = document.createElement('script');
script.src = chrome.runtime.getURL('html2canvas.js');
document.head.appendChild(script);
script.onload = function () {
   function capture() {
      html2canvas(document.body).then(canvas => {
         var aa = document.createElement("a");
         aa.download = "canvas screenshot.png";
         aa.href = canvas.toDataURL("image / png");
         aa.click();
      })
   };
   capture();
};

// const script2 = document.createElement('script');
// script2.src = chrome.runtime.getURL('example.js');
// document.head.appendChild(script2);
// script2.onload = function () {
//    test('check 2');
//    function capture() {
//       // html2canvas(document.body).then(canvas => {
//       //    var aa = document.createElement("a");
//       //    aa.download = "canvas screenshot.png";
//       //    aa.href = canvas.toDataURL("image / png");
//       //    aa.click();
//       // })
//    };
//    capture();
// };



async function capture() {
   const stream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true
   });

   const vid = document.createElement('video');
   vid.addEventListener('loadedmetadata', function () {
      const canvas = document.createElement('canvas'),
         ctx = canvas.getContext("2d");
      ctx.canvas.width = vid.videoWidth;
      ctx.canvas.height = vid.videoHeight;
      ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);

      stream.getVideoTracks()[0].stop();

      let ii = document.createElement('a');
      ii.download = "screen.png";
      ii.href = canvas.toDataURL('image/png');
      ii.click();
   });
   vid.srcObject = stream;
   vid.play();
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   if (request.message === 'Hello') {
      capture();
   }
});
