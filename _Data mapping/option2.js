const collector = document.querySelector('.collector');
const getPath = document.getElementById('get-path');
const pathQuery = document.getElementById('path-query');

getPath.addEventListener('click', () => {
   const message = {
      name: 'get selector',
   };
   chrome.tabs.query({ currentWindow: true }, function (tabs) {
      tabs.forEach(tab => {
         chrome.tabs.sendMessage(tab.id, message);
      });
   });
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   if (message.name == 'element selector') {
      console.log(message.value);
      pathQuery.innerHTML = message.value;
   }
})