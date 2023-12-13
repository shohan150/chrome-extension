// chrome.storage.local.get(['fieldsData'], function (result) {
//    result.fieldsData.forEach(val => {
//       const value1 = val.data;
//       const value2 = val.path;

//       const targetedData = document.querySelector(value2).innerText;

//       //establish connection between the content_script and popup.js
//       chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//          if (message.name == 'send data of already set path') {
//             chrome.runtime.sendMessage({ name: 'send website data to popup', title: value1, data: targetedData });
//          }
//       });
//    });
// });


//---------------------------------------

// A common pattern used when you want to know the position of a specific element within a collection of elements.

// event.currentTarget refers to the object to which the event handler was attached. event.currentTarget.children retrieves a live HTMLCollection of child elements of the div. In other words, it gets all the child elements. Array.from(...) Converts the HTMLCollection to an array. This is done because HTMLCollection doesn't have all the array methods, and by converting it to an array, you can use array methods like indexOf. indexOf(event.target) finds the index of the clicked paragraph (event.target) within the array of paragraphs. The indexOf method returns the first index at which a given element can be found in the array, or -1 if it is not present.

//---------------------------------


function getSelector(element) {
   if (!element) return;

   var selector = element.tagName.toLowerCase();
   if (element.id) {
      selector += '[id="' + element.id + '"]';
   }

   if (element.className) {
      selector += '[class="' + element.className.replace(/\s+/g, ' ') + '"]';
   }
   return selector;
}

// repContainer.addEventListener('click', function (event) {
//    let repIndex = Array.from(event.currentTarget.children).indexOf(event.target);


//    let clickedContent = repContainer.children[repIndex].innerHTML;
//    console.log('Clicked paragraph at index:', repIndex);
//    console.log(clickedContent);
//    let info = document.querySelector(`div[class="test"][id="eee"] > :nth-child(${repIndex + 1})`);
//    console.log(info.innerText);
// });


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   switch (message.name) {
      case 'get selector':
         document.addEventListener('click', function (event) {
            // const selector = getSelector(event.target);
            // const parent1 = getSelector(event.target.parentElement);
            // const parent2 = getSelector(event.target.parentElement.parentElement);
            const parent3 = getSelector(event.target.parentElement.parentElement.parentElement);
            const parent4 = getSelector(event.target.parentElement.parentElement.parentElement.parentElement);
            const parent5 = getSelector(event.target.parentElement.parentElement.parentElement.parentElement.parentElement);

            let repIndex1 = Array.from(event.target.parentElement.children).indexOf(event.target);
            let repIndex2 = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
            let repIndex3 = Array.from(event.target.parentElement.parentElement.parentElement.children).indexOf(event.target.parentElement.parentElement);

            // let clickedContent = event.target.parentElement.children[repIndex1].innerText;

            const mainSelector = `${parent5} ${parent4} ${parent3} > :nth-child(${repIndex3 + 1}) > :nth-child(${repIndex2 + 1}) > :nth-child(${repIndex1 + 1})`;

            const mainData = document.querySelector(mainSelector).innerHTML;

            // console.log(clickedContent);
            // console.log(mainData);

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
         let requestedData = [];
         message.data.forEach(query => {
            let collectData = document.querySelector(query.path).innerText;
            query.content = collectData;;
            requestedData.push(query);
            // console.log(requestedData);
         });
         console.log(requestedData);
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
