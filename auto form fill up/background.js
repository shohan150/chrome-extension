chrome.action.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
   let msg = {}
   chrome.tabs.sendMessage(tab.id, msg);
}
