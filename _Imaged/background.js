chrome.action.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
   let msg = {
      text: "hello"
   }
   chrome.tabs.sendMessage(tab.id, msg);

}

// background.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   // Send the message to the popup script
   var port = chrome.extension.connect({ name: "content-script" });
   port.postMessage({ message });
});
