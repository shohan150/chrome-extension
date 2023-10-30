let imgs = document.getElementsByTagName('img');
let imgs2 = [];

for (images of imgs) {
   imgs2.push(images.src);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   // console.log('Message received in content script:', message.message);
   chrome.runtime.sendMessage(imgs2);
});







