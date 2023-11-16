chrome.storage.local.get(['fieldsData'], function (result) {
   result.fieldsData.forEach(val => {
      const value1 = val.data;
      const value2 = val.path;

      const targetedData = document.querySelector(value2).innerText;

      //establish connection between the content_script and popup.js
      chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
         if (message.name == 'send data of already set path') {
            chrome.runtime.sendMessage({ name: 'send website data to popup', title: value1, data: targetedData });
         }
      });
   });
});


function getElementSelector(element) {
   if (!element) return;

   var selector = element.tagName.toLowerCase();
   if (element.id) {
      selector += '#' + element.id;
   } else if (element.className) {
      selector += '.' + element.className.replace(/\s+/g, ',');
   }

   return selector;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   // if (message.name == 'take element path') {
   //    document.addEventListener('click', function (event) {
   //       var selector = getElementSelector(event.target);
   //       console.log('Element selector:', selector);

   //       //send element selector to popup
   //       chrome.runtime.sendMessage({ name: 'element selector', selector: selector });
   //    });
   // }
   if (message.name === 'take element path') {
      document.addEventListener('click', function (event) {
         var clickedElement = event.target;
         var elementInfo = {
            id: clickedElement.id,
            className: clickedElement.className,
         };
         console.log(elementInfo);
         sendResponse(elementInfo);
      }, { once: true });
   }
   return true; // Required to keep the message channel open for sendResponse
});


