chrome.storage.local.get(['productName', 'price'], function (result) {

   //import product images
   var imgPath = '.product-image img';
   const imgs = document.querySelectorAll(imgPath);
   let productImgs = [];

   for (images of imgs) {
      productImgs.push(images.src);
   }


   //-------------------------------------------

   //product name
   // var namePath = '.product-details h1';
   // const productName = document.querySelector(namePath).innerText;
   const value1 = result.productName.firstPath;
   const value2 = result.productName.secondPath;
   var nameQuery = value1 + ' ' + value2;
   const productName = document.querySelector(nameQuery).innerText;


   //price
   // var pricePath = '.product-price span';
   // const productPrice = document.querySelector(pricePath).innerText;
   const value11 = result.price.firstPath;
   const value12 = result.price.secondPath;
   var priceQuery = value11 + ' ' + value12;
   const productPrice = document.querySelector(priceQuery).innerText;

   //----------------------------------------------




   //description
   var descriptionPath = '#product-tab-description .full-description';
   const productDescription = document.querySelector(descriptionPath).innerText;


   //establish connection between the content_script and popup.js
   chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      // console.log('Message received in content script:', message.message);
      chrome.runtime.sendMessage({ type: "img", data: productImgs });
      chrome.runtime.sendMessage({ type: "name", data: productName });
      chrome.runtime.sendMessage({ type: "price", data: productPrice });
      chrome.runtime.sendMessage({ type: "des", data: productDescription });
   });

});








