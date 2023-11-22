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
      selector += '[class="' + element.className.replace(/\s+/g, ' ') + '"]';
   }
   return selector;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   switch (message.name) {
      case 'get selector':
         document.addEventListener('click', function (event) {
            const selector = getSelector(event.target);
            const parentSelector = getSelector(event.target.parentElement);
            const grandParentSelector = getSelector(event.target.parentElement.parentElement);
            const mainSelector = grandParentSelector + ' ' + parentSelector + ' ' + selector;
            const mainData = document.querySelector(mainSelector).innerHTML;
            sendResponse({ name: 'element selector', value: mainSelector, data: mainData });
         }, { once: true });
         break;


      case 'show data':
         const inputFields = document.querySelectorAll('input');
         inputFields.forEach(field => {
            field.addEventListener('click', function (event) {
               field.value = message.data;
               const selector = getSelector(event.target);
               const parentSelector = getSelector(event.target.parentElement);
               const mainSelector = parentSelector + ' ' + selector;

               const msg = {
                  name: 'form selector',
                  value: mainSelector
               };
               sendResponse({ name: 'form selector', value: mainSelector });
            }, { once: true });
         })
         break;


      case 'request data':
         const requestedData = [];
         message.data.forEach(query => {
            const collectData = document.querySelector(query.path).innerHTML;
            query.content = collectData;
            requestedData.push(query);
         });
         sendResponse({ name: 'responce to request', value: requestedData });
         break;


      case 'form fill up':
         message.data.forEach(val => {
            document.querySelector(val.dest).value = val.content;
         })
         break;

   }
   return true; // Recommended to keep the message channel open for sendResponse
});



//the current code format was creating a problme bef0re. when collected data in transferred to a input filed of a form, other all data vanished from the options page. So, i separeated the two messages. But now, i am not noticing the problem. so, keeping this commented.
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//    if (message.name == 'show data') {
//       const inputFields = document.querySelectorAll('input');
//       inputFields.forEach(field => {
//          field.addEventListener('click', function (event) {
//             field.value = message.data;
//             const selector = getSelector(event.target);
//             const parentSelector = getSelector(event.target.parentElement);
//             const mainSelector = parentSelector + ' ' + selector;

//             const msg = {
//                name: 'form selector',
//                value: mainSelector
//             };
//             sendResponse({ name: 'form selector', value: mainSelector });
//          }, { once: true });
//       })
//    }
//    return true; // Recommended to keep the message channel open for sendResponse
// });
