chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   console.log('working1?');
   if (message.todo == "showPageAction") {
      console.log('working?');
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
         chrome.pageAction.show(tabs[0].id);
      })
   }
})
