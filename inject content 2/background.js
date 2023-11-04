try {
   chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status == "complete") {
         chrome.scripting.executeScript({
            files: ['content.js'],
            target: { tabId: tab.id }
         });

      }
   });
} catch (e) {
   console.log(e);
}

// `chrome.tabs.onUpdated.addListener(...)`: This line adds an event listener to the `onUpdated` event of the `chrome.tabs` API. The `onUpdated` event is fired when a tab is updated, such as when its status changes. the callback function is executed when the `onUpdated` event is triggered. It takes three parameters:
//    - `tabId`: The ID of the tab that was updated.
//    - `changeInfo`: An object containing information about the tab update, including the `status` property.
//    - `tab`: An object representing the updated tab.

// `if (changeInfo.status == "complete") { ... }`: This conditional statement checks if the `status` property in the `changeInfo` object is equal to "complete." This condition ensures that the code inside the block is executed only when the tab has finished loading.

// `chrome.scripting.executeScript({ ... })`: This line of code uses the `chrome.scripting` API to execute a content script (`content.js`) in the updated tab. Content scripts are JavaScript files that can be injected into web pages by Chrome extensions to interact with the page's DOM and modify its behavior.

//    - `files: ['content.js']`: Here, you specify the file or files that should be injected into the page. In this case, it's `content.js`.

//    - `target: { tabId: tab.id }`: This defines the target tab where the content script should be injected. It uses the `tabId` obtained from the callback function's `tab` parameter.

// `try { ... } catch (e) { ... }`: This is a try-catch block that surrounds the code. If any errors occur during the execution of the code within the try block, they will be caught and logged to the console.

// In summary, this code listens for tab updates, and when a tab finishes loading (status "complete"), it injects the content script `content.js` into that tab. Content scripts are commonly used in Chrome extensions to interact with web pages and perform various tasks.