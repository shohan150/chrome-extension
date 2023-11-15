chrome.storage.local.get(['fieldsData'], function (result) {
   result.fieldsData.forEach(val => {
      const value1 = val.data;
      const value2 = val.path;

      const targetedData = document.querySelector(value2).innerText;

      //establish connection between the content_script and popup.js
      chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
         chrome.runtime.sendMessage({ title: value1, data: targetedData });
      });
   });
});


// gives the whole path to that element
// document.addEventListener('click', function (event) {
//    var selector = getSelector(event.target);
//    console.log('Element selector:', selector);
// });

// function getSelector(element) {
//    if (!element) return;

//    var path = [];
//    while (element.parentNode) {
//       var index = [].indexOf.call(element.parentNode.children, element) + 1;
//       var tagName = element.tagName.toLowerCase();
//       var identifier = tagName;
//       if (element.id) {
//          identifier += '#' + element.id;
//       } else if (element.className) {
//          identifier += '.' + element.className.trim().replace(/\s+/g, '.');
//       }
//       path.unshift(identifier + ':nth-child(' + index + ')');
//       element = element.parentNode;
//    }

//    return path.join(' > ');
// }


function getSelector(element) {
   if (!element) return;

   var selector = element.tagName.toLowerCase();
   if (element.id) {
      selector += '#' + element.id;
   } else if (element.className) {
      selector += '.' + element.className.replace(/\s+/g, '.');
   }

   return selector;
}
document.addEventListener('click', function (event) {
   var selector = getSelector(event.target);
   console.log('Element selector:', selector);
});


//identify all messages
//from content.js to popup.js
//popup.js to popup.html
//adjust according to query selector
//add show data button









