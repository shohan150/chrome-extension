$(function () {
   //Using jQuery to define a function that will be executed when the DOM is fully loaded and ready. 

   // This is a common pattern in jQuery to ensure that your JavaScript code doesn't run until the HTML document is ready for manipulation. $(function(){ ... }) or $(document).ready(function(){ ... }) waits for the DOM (HTML document) to be fully loaded and ready. Once the DOM is ready, the code inside the function (the ... part) will be executed. This is a good practice to make sure your JavaScript code doesn't run into issues related to trying to interact with HTML elements that haven't been loaded yet.

   $('#name').keyup(function () {
      $('#greet').text('Hello ' + $('#name').val());
   })

})

async function checkIsPinned() {
   let userSettings = await chrome.action.getUserSettings();
   if (userSettings.isOnToolbar == true) {
      document.querySelector('h1 span').innerText = "The extension is pinned";
   } else {
      document.querySelector('h1 span').innerText = "You haven't pinned the extension";
   }
}
checkIsPinned();