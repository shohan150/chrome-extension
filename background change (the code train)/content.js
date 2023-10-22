console.log('extension working');


chrome.runtime.onMessage.addListener(gotMessage);

// set up a listener for incoming messages from other parts of the extension or from external sources.


// chrome.runtime.onMessage is used to listen for messages sent using the chrome.runtime.sendMessage() method. This is an event listener provided by the Chrome Extension API.

// addListener(gotMessage): attaching an event listener. When a message is received, the gotMessage function will be called. The gotMessage function is the callback that will be executed when a message is received. It typically takes a few parameters, such as the message itself and additional information about the sender and a callback function if required. 

function gotMessage(message, sender, sendResponse) {
   let paragraphs = document.getElementsByTagName('p');
   for (elt of paragraphs) {
      elt.style['background-color'] = '#666666';
   }
   console.log(message.text);
   //try opening camera on click
   // navigator.mediaDevices.getUserMedia({
   //    video: true,
   //    audio: false,
   // }).then(function (stream) {
   //    console.log("The camera is now open.");
   // });

}

