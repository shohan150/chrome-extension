$(function () {

   chrome.storage.sync.get('limit', function (budget) {
      $('#limit').val(budget.limit);
   });


   $('#saveLimit').click(function () {
      var limit = $('#limit').val();
      if (limit) {
         chrome.storage.sync.set({ 'limit': limit }, function () {
            // chrome.storage.sync.set is a Chrome Storage API method. 

            // Stores key-value pairs in Chrome's synchronized storage. The data stored using this method is synchronized across the user's Chrome installations if they are signed in with the same Google account.

            // {'limit': limit}: This is the object that is stored in the synchronized storage. It contains a single key-value pair, where the key is 'limit' and the value is the value of the limit variable.

            // Synchronized Storage: Synchronized storage is used for storing data that needs to be synchronized across multiple devices where the same user is signed in with their Google account. It's often used for user settings, preferences, and small amounts of data that need to be available consistently across devices. It has a storage limit of approximately 8KB.

            // Local Storage: Local storage is used for storing data that is local to a specific Chrome installation.
            // It's suitable for storing larger amounts of data, such as cached content or data that doesn't need to be synchronized. It has a storage limit of approximately 5MB.

            // Managed Storage: Managed storage is a type of storage that's mainly used by Chrome Apps, not extensions.It's intended for managing settings and policies within a managed Chrome environment (e.g., an organization's IT department controlling settings).

            //close the current browser window or tab
            var notif = {
               type: 'basic',
               iconUrl: 'icon.png',
               title: 'Limit reset',
               message: "New spending limit is set"
            };
            chrome.notifications.create('limitNotif', notif);
            close();
         });
      }
   });
   $('#reset').click(function () {
      chrome.storage.sync.set({ 'total': 0 });
      var notif = {
         type: 'basic',
         iconUrl: 'icon.png',
         title: 'Total reset',
         message: "Your accounts have been reset"
      };
      chrome.notifications.create('limitNotif', notif);
   })

})