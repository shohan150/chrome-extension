$(function () {

   chrome.storage.sync.get(['total', 'limit'], function (budget) {
      $('#total').text(budget.total);
      $('#limit').text(budget.limit);
   });

   $('#spent-amount').click(function () {
      chrome.storage.sync.get(['total', 'limit'], function (budget) {
         // The chrome.storage.sync.get method retrieves data associated with the 'total' key. 

         // The data is then provided to the callback function as the budget parameter. This budget object contains the 'total' key and its associated value.

         // So, budget is an object that gets populated with the data retrieved from Chrome's storage for the 'total' key, but no need to explicitly declare it. It's created and populated by the Chrome Storage API when the data is retrieved.

         var newTotal = 0;
         if (budget.total) {  //check if total key already has any value
            newTotal += parseInt(budget.total);  //store the previously saved total amount
         }

         var amount = $('#amount').val();
         if (amount) {  //check if any value is entered after the spent button is clicked.
            newTotal += parseInt(amount);  //add the amount with the previous amount
         }

         if (amount && newTotal >= budget.limit) {
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
            $('#total').text(newTotal);
            $('#amount').val('');
         }
      });
   });
});