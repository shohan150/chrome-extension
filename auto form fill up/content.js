chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
   var abc = document.querySelectorAll('form input[type="text"]');

   var names = ['karim', 'rahim', 'sujon', 'fatema', 'rakib', 'raihan'];
   for (var i = 0; i < abc.length; i++) {
      var counter = Math.floor(Math.random() * names.length);
      abc[i].value = names[counter];
   }

   var email = document.querySelectorAll('form input[type="email"]');
   for (var i = 0; i < email.length; i++) {
      var counter = Math.floor(Math.random() * names.length);
      email[i].value = `${names[counter]}@gmail.com`;
   }

   var allSelectFields = document.querySelectorAll('form select');
   for (var i = 0; i < allSelectFields.length; i++) {
      var counter = Math.floor(Math.random() * allSelectFields[i].length);
      allSelectFields[i].selectedIndex = counter;
   }
}

