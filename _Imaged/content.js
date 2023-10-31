//import product images
const imgs = document.querySelectorAll('.product-image img');
let imgs2 = [];

for (images of imgs) {
   imgs2.push(images.src);
}

//product name
const productName = document.querySelector('.product-details h1').innerText;

//price
const productPrice = document.querySelector('.product-price span').innerText;


//description
const productDes = document.querySelector('#product-tab-description .full-description').innerText;
console.log(productDes);

//establish connection between the content_script and popup.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   // console.log('Message received in content script:', message.message);
   chrome.runtime.sendMessage({ type: "img", data: imgs2 });
   chrome.runtime.sendMessage({ type: "name", data: productName });
   chrome.runtime.sendMessage({ type: "price", data: productPrice });
   chrome.runtime.sendMessage({ type: "des", data: productDes });
});







