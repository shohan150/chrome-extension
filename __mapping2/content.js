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


function getSelector(element) {
   if (!element) return;

   var selector = element.tagName.toLowerCase();
   if (element.id) {
      selector += '[id="' + element.id + '"]';
   } else if (element.className) {
      selector += '[class="' + element.className.replace(/\s+/g, ',') + '"]';
   }
   return selector;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   if (message.name == 'get selector') {
      document.addEventListener('click', function (event) {
         var selector = getSelector(event.target);
         var parentSelector = getSelector(event.target.parentElement);
         var mainSelector = parentSelector + ' ' + selector;
         var mainData = document.querySelector(mainSelector).innerText;

         sendResponse({ name: 'element selector', value: mainSelector, data: mainData });

      }, { once: true });
   }
   return true; // Recommended to keep the message channel open for sendResponse
});


