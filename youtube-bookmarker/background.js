//  listen for updates to browser tabs. 

//chrome.tabs.onUpdated: This is an event handler provided by the Chrome Extension API, specifically for monitoring tab updates.  .addListener: add an event listener for the onUpdated event. write code to handle specific actions when a tab is updated. For example, you might want to check if a particular URL is loaded in the tab, manipulate the tab's behavior, or perform other actions based on the changes detected in the tab.

// (tabId, tab, changeInfo) => { ... }: tabId: It represents the ID of the updated tab. tab: It represents the tab object, which contains information about the tab, such as its URL, title, and more changeInfo: It's an object that contains information about the changes that occurred in the tab, such as whether the tab's status was updated, its URL changed, or other relevant details.

chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes('youtube.com/watch')) {
    const queryParameters = tab.url.split('?')[1]; //[1] means extract the second element (index 1) of the resulting array
    const urlParameters = new URLSearchParams(queryParameters);
  }
});



