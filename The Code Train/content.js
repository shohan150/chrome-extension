console.log('extension working');


chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
   let paragraphs = document.getElementsByTagName('p');
   for (elt of paragraphs) {
      elt.style['background-color'] = '#666666';
   }
   // console.log('extension working again');
   // console.log(message.text);
}

