// This code uses the `chrome.tabs.captureVisibleTab` Chrome extension API method to capture a screenshot of the currently visible tab. `{ format: 'png' }` specifies that the screenshot should be captured in PNG format. The callback function `(screenshot) => { ... }` is executed once the screenshot is captured. It receives the screenshot data as a `screenshot`.

document.getElementById('captureScreenshot').addEventListener('click', () => {
   chrome.tabs.captureVisibleTab({ format: 'jpeg' }, (screenshot) => {
      const image = new Image();
      image.src = screenshot;
      const downloadBtn = document.createElement('button');
      downloadBtn.innerText = 'Download this image';
      document.getElementById('imgs').appendChild(image);
      document.getElementById('imgs').appendChild(downloadBtn);

      document.querySelector('#imgs button').addEventListener('click', function () {
         const downloadOptions = {
            url: screenshot,
            filename: 'image.jpeg',
            saveAs: true,
         };
         chrome.downloads.download(downloadOptions);
      })
   });
})

const libField = document.querySelector('.html2canvas #imgs')
const conversionScript = document.createElement('script');
conversionScript.src = chrome.runtime.getURL('html2canvas.js');
document.head.appendChild(conversionScript);
document.getElementById('captureSS').addEventListener('click', () => {
   html2canvas(document.body).then(canvas => {
      var imageElement = document.createElement("img");
      imageElement.src = canvas.toDataURL("image/png");
      imageElement.classList.add('libSS');
      libField.appendChild(imageElement);

      var libBtn = document.createElement('button'); libBtn.innerText = "Download Image";
      libBtn.addEventListener('click', () => {
         var downloadLink = document.createElement('a');
         downloadLink.download = 'screenshot.png';
         downloadLink.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
         downloadLink.click();
      });
      libField.appendChild(libBtn);
   });
});

document.getElementById('captureScreen').addEventListener('click', () => {
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'Hello' });
   });
});
