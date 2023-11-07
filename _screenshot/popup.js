// This code uses the `chrome.tabs.captureVisibleTab` Chrome extension API method to capture a screenshot of the currently visible tab. `{ format: 'png' }` specifies that the screenshot should be captured in PNG format. The callback function `(screenshot) => { ... }` is executed once the screenshot is captured. It receives the screenshot data as a `screenshot`.

document.getElementById('captureScreenshot').addEventListener('click', () => {
   chrome.tabs.captureVisibleTab({ format: 'jpeg' }, (screenshot) => {
      const image = new Image();
      image.src = screenshot;
      document.getElementById('imgs').appendChild(image);

      const downloadBtn = document.createElement('button');
      downloadBtn.innerText = 'Download this image';
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
