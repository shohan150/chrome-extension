document.getElementById('all').addEventListener('click', function () {
   const data = {
      message: 'Hello from popup!',
   };
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, data);
   });
});


const container = document.getElementById("allImg");
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   container.innerHTML = '';
   for (let i = 0; i < message.length; i++) {
      if (message[i]) {
         const divs = document.createElement('div');
         const productImages = document.createElement("img");
         productImages.src = message[i];
         container.appendChild(divs);
         divs.appendChild(productImages);
      }
   }
});
