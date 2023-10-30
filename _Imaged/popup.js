
document.getElementById('all').addEventListener('click', function () {
   const data = {
      message: 'Hello from popup!',
   };
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, data);
   });
});


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   const container = document.getElementById("allImg");
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
