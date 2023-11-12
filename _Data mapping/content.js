chrome.storage.local.get(['productName'], function (result) {
   const value1 = result.productName.firstPath;
   const value2 = result.productName.secondPath;
   var nameQuery = value1 + ' ' + value2;
   const productName = document.querySelector(nameQuery).innerText;


   //establish connection between the content_script and popup.js
   chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      // console.log('Message received in content script:', message.message);
      chrome.runtime.sendMessage({ type: "name", data: productName });
      chrome.runtime.sendMessage({ type: "price", data: productPrice });
   });
});


//storage theke data nibo. seta diye query kore. resultant data ta popup e show korbe. 







