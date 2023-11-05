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
const info = document.getElementById("product-info");

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   if (message.type === "name") {
      info.innerHTML = '';
      const productName = document.createElement('h2');
      productName.innerText = `Product Name: ${message.data}`;
      info.appendChild(productName);

   }
   if (message.type === "price") {
      const productPrice = document.createElement('h1');
      productPrice.innerText = message.data;
      info.appendChild(productPrice);
   }
   if (message.type === "des") {
      const productDes = document.createElement('p');
      productDes.innerText = message.data;
      info.appendChild(productDes);
   }
   if (message.type === "img") {
      container.innerHTML = '';
      const divs = document.createElement('div');
      container.appendChild(divs);
      for (let i = 0; i < message.data.length; i++) {
         if (message.data[i]) {
            const productImages = document.createElement("img");
            productImages.src = message.data[i];
            divs.appendChild(productImages);
         }
      }
   }
});


