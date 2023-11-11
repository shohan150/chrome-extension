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



//----------------------
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   if (message.action === 'captureScrolling') {
      captureScrollingScreenshot();
   }
});

function captureScrollingScreenshot() {
   const totalHeight = document.body.scrollHeight;
   const viewportHeight = window.innerHeight;

   const numScreenshots = Math.ceil(totalHeight / viewportHeight);
   let currentScroll = 0;

   const captureScreenshots = async () => {
      for (let i = 0; i < numScreenshots; i++) {
         const scrollPosition = i * viewportHeight;
         window.scrollTo(0, scrollPosition);

         await new Promise((resolve) => setTimeout(resolve, 500));

         const imageData = await captureVisibleTab();
         chrome.runtime.sendMessage({ action: 'showScreenshot', imageData });
      }
   };

   captureScreenshots();
}

function captureVisibleTab() {
   return new Promise((resolve) => {
      chrome.tabs.captureVisibleTab(function (screenshotUrl) {
         resolve(screenshotUrl);
      });
   });
}

