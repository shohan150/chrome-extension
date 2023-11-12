document.getElementById('dataCollector').addEventListener('click', function () {
   const data = {
      message: 'Hello from popup!',
   };
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, data);
   });
});


const siteData = document.getElementById("site-data");

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   if (message.type === "name") {
      siteData.innerHTML = '';
      const productName = document.createElement('h2');
      productName.innerText = `Product Name: ${message.data}`;
      siteData.appendChild(productName);

   }
});


