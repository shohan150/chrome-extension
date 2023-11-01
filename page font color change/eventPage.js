//redundant code 
//-------------------
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
   //in the tutorial, the icon is used to be blur. but when mathing url reached, icon should be transparent. to perform that this portion of if() code is written. but that no blue occurs in the icon in the current version (I think that is why permission was particularly requested in the permissions section along with 'tabs' in the tutorial. But as this feature does not match as shown in the tutorial, that permission is probably not necesssary).

   //when the matching site is reached, hoving over the extension shows that the extension has access to the site. So, for now, this portion of doesn't actually have any application. Even if the code betwee nthe dashed lines are removed, the extension still works.

   if (message.todo == "showPageAction") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
         chrome.pageAction.show(tabs[0].id);
         // This code ensures that the page action is shown only for the currently active tab in the current window, making it context-aware and relevant to the user's current browsing session.

         // `chrome.tabs.query` retrieve information about the active tab in the current window. The callback function is executed when the query operation is completed. It receives an array of `tabs` as an argument.

         // `chrome.pageAction.show(tabs[0].id)` is called to display the page action for the first tab (tabs[0]) in the array of tabs. This activates the page action icon for that tab. Or at least that is what supposed to be done. But the icon is visible in all pages anyway.

         // When you call `chrome.pageAction.show`, you typically set up a listener in your extension to respond to clicks on the page action icon (extension icon), allowing you to trigger actions or open a popup.

      })
   }
})
//-------------------------

