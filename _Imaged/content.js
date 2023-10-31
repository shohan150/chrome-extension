//import product images
const imgs = document.querySelectorAll('.product-image img');
let imgs2 = [];

for (images of imgs) {
   imgs2.push(images.src);
}





//establish connection between the content_script and popup.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   // console.log('Message received in content script:', message.message);
   chrome.runtime.sendMessage(imgs2);
});







