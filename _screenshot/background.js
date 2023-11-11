chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   if (request.action === 'captureVisibleTab') {
      captureVisibleTab(sendResponse);
      return true;  // Indicates that the response will be sent asynchronously
   }
});

function captureVisibleTab(callback) {
   chrome.tabs.captureVisibleTab(function (screenshotUrl) {
      callback(screenshotUrl);
   });
}
