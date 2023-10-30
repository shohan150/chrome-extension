// popup.js
chrome.extension.onConnect.addListener(function (port) {
   if (port.name === "content-script") {
      port.onMessage.addListener(function (msg) {
         console.log("Message received in popup:", msg.message);
      });
   }
});
