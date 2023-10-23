chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
   var abc = document.querySelectorAll('form input[type="text"]');
   for (var i = 0; i < abc.length; i++) {
      abc[i].value = 'hidden';
   }
}

