chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
   //input type text
   var textFields = document.querySelectorAll('input[type="text"]');

   var names = ['karim', 'rahim', 'sujon', 'fatema', 'rakib', 'raihan'];
   for (var i = 0; i < textFields.length; i++) {
      var counter = Math.floor(Math.random() * names.length);
      textFields[i].value = names[counter];
   }

   //input type email
   var emailDom = ['google', 'hotmail', 'yahoo'];
   var emailFields = document.querySelectorAll('input[type="email"], input[type="text"][id="login"]');
   for (var i = 0; i < emailFields.length; i++) {
      const numbers = '0123456789';
      let NumString = '';
      for (let i = 0; i < 3; i++) {
         var counter = Math.floor(Math.random() * numbers.length);
         NumString += numbers[counter];
      }
      var counter = Math.floor(Math.random() * names.length);
      var counter2 = Math.floor(Math.random() * emailDom.length);
      emailFields[i].value = `${names[counter]}${NumString}@${emailDom[counter2]}.com`;
   }

   //select option element
   var allSelectFields = document.querySelectorAll('select');
   for (var i = 0; i < allSelectFields.length; i++) {
      var counter = Math.floor(Math.random() * allSelectFields[i].length);
      allSelectFields[i].selectedIndex = counter;
   }

   //textarea
   var textAreaFields = document.querySelectorAll('textarea');
   for (var i = 0; i < textAreaFields.length; i++) {
      const lorem = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut labore', 'et dolore', 'magna', 'aliqua'];
      let areaString = '';
      for (let i = 0; i < 5; i++) {
         if (i > 0) {
            areaString += ' ';
         }
         var counter = Math.floor(Math.random() * lorem.length);
         areaString += lorem[counter];
      }
      textAreaFields[i].innerText = areaString;
   }

   //input type tel
   var telephoneNumFields = document.querySelectorAll('input[type="tel"], input[type="text"][id="number"]');
   for (var i = 0; i < telephoneNumFields.length; i++) {
      const numbers = '123456789';
      let telNumString = '+880 1';
      for (let i = 0; i < 9; i++) {
         var counter = Math.floor(Math.random() * numbers.length);
         telNumString += numbers[counter];
      }
      telephoneNumFields[i].value = telNumString;
   }


   // input type number
   var numberFields = document.querySelectorAll('input[type="number"], input[type="text"][id="postcode"]');
   for (var i = 0; i < numberFields.length; i++) {
      const numbers = '0123456789';
      let NumString = '';
      for (let i = 0; i < 4; i++) {
         var counter = Math.floor(Math.random() * numbers.length);
         NumString += numbers[counter];
      }
      numberFields[i].value = NumString;
   }

   // input type date
   var dateFields = document.querySelectorAll('input[type="date"], input[type="text"][id="birth_date"]');
   for (var i = 0; i < dateFields.length; i++) {
      function getRandomDate() {
         const minYear = 1950;
         const maxYear = 2023;

         const year = Math.floor(Math.random() * (maxYear - minYear + 1) + minYear);
         const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');  // Random month (1-12)
         const day = String(Math.floor(Math.random() * 31) + 1).padStart(2, '0');    // Random day (1-31)

         const formattedDate = `${year}-${month}-${day}`;
         return formattedDate;
      }
      const randomDate = getRandomDate();
      //console.log(randomDate);
      dateFields[i].value = randomDate;
      //console.log(dateFields[i].value);
   }

   //input type password
   var passwordFields = document.querySelectorAll('input[type="password"]');
   for (var i = 0; i < passwordFields.length; i++) {
      const numbles = '0123456789!@#$%&(){}[]+-_\:;<>,.?/';
      const capital = 'ABCDEFGHIZKLMNOPQRUVWXYZ';
      const small = 'abcdefghijklmnopqrstuvwxyz';
      let passString = '';
      for (let i = 0; i < 3; i++) {
         var counter1 = Math.floor(Math.random() * numbles.length);
         var counter2 = Math.floor(Math.random() * capital.length);
         var counter3 = Math.floor(Math.random() * small.length);
         passString += capital[counter2] + numbles[counter1] + small[counter3];
      }
      passwordFields[i].value = passString;
   }
}
