chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
   console.log('button works');

};


let imgs = document.getElementsByTagName('img');
let imgs2 = [];

for (images of imgs) {
   imgs2.push(images.src);
}

chrome.runtime.sendMessage({ text: "Hello from content script!" });



