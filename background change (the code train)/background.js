chrome.action.onClicked.addListener(buttonClicked);
// defines a callback function to be executed when the user clicks the extension's icon in the browser's toolbar.

function buttonClicked(tab) {
   let msg = {
      text: "hello"
   }
   chrome.tabs.sendMessage(tab.id, msg);
}
// send a message from a background script to a content script running in a specific tab. Enables communication between different parts of a Chrome extension, pass data and instructions from a background script to a content script.
// tab.id: the ID of the tab to send the message. It specifies the target tab for the communication.
// msg: This is the message object. It typically contains data or instructions that the content script in the specified tab should process.
// For example:
// const msg = {
//   type: 'notification',
//   text: 'Hello from the background script!',
// };

