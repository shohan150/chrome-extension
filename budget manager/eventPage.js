var contextMenuItem = {
   "id": "spenddMoney",
   "title": "Spend Money",
   "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
   return !isNaN(value) &&  //ensures that the value is not NaN(not a number)
      parseInt(Number(value)) == value && //ensure that the selcted value is in the required format
      !isNaN(parseInt(value, 10)); //same as first check but ensures that the base of the number is 10 in integer format.
   //if every condition met, return true. 
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
   if (clickData.menuItemId == "spenddMoney" && clickData.selectionText) {
      if (isInt(clickData.selectionText)) {
         chrome.storage.sync.get(['total', 'limit'], function (budget) {
            var newTotal = 0;
            if (budget.total) {
               newTotal += parseInt(budget.total);
               console.log(newTotal);
            }
            newTotal += parseInt(clickData.selectionText);
            console.log(newTotal);

            if (newTotal >= budget.limit) {
               var notif = {
                  type: 'basic',
                  iconUrl: 'icon.png',
                  title: 'Limit reached',
                  message: "Looks like you have reached your limit"
               };
               chrome.notifications.create('limitNotif', notif);
            }
            else {
               chrome.storage.sync.set({ 'total': newTotal });
            }
         })
      }
   }
})

chrome.storage.onChanged.addListener(function (changes, storageName) {
   chrome.action.setBadgeText({ 'text': changes.total.newValue.toString() });
})

// changes Parameter is an object that contains information about the changes that occurred in the storage area. It maps the names of the items that changed to the details of those changes. Here, the `changes` parameter represents the changes made to the storage.

// you have a key named "total" in your storage and it changes, `changes` will look something like this:

//    {
//      total: {
//        oldValue: ...,
//        newValue: ...
//      },
//    }
   
// `total` is the name of the changed item.
// `oldValue` represents the previous value of the item (before the change).
// `newValue` represents the new value of the item (after the change).

// storageName parameter indicates the name of the storage area that was changed. However, you don't typically need to use this parameter, as you're working with Chrome's built-in `chrome.storage` API. Chrome extensions typically have a default storage area, so you don't explicitly set or pass a storage name.

// In the code snippet chrome.action.setBadgeText({ 'text': changes.total.newValue.toString() });, you're using the Chrome Extension API to update the badge text of your extension's icon. Here's an explanation of what this line does:

// chrome.action.setBadgeText() is a function provided by the Chrome Extension API. It allows to set the text that appears in the badge of the extension's icon.

// { 'text': changes.total.newValue.toString() }: This is an object with a single property `text`. You specify the text you want to display in the badge using the `text` property.

// `changes.total.newValue.toString()`: Here, you're getting the new value of the "total" item from the `changes` object, which is the updated value after a change has occurred. You use `toString()` to ensure that it's a string because badge text is typically displayed as strings.
