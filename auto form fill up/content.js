chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
   const names = ['karim', 'rahim', 'sujon', 'fatema', 'rakib', 'raihan'];
   const emailDom = ['google', 'hotmail', 'yahoo'];
   const numbers = '0123456789';
   const capital = 'ABCDEFGHIZKLMNOPQRUVWXYZ';
   const small = 'abcdefghijklmnopqrstuvwxyz';
   const numbles = '0123456789!@#$%&(){}[]+-_\:;<>,.?/';
   const lorem = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut labore', 'et dolore', 'magna', 'aliqua'];

   function randomNumber(data) {
      var random = Math.floor(Math.random() * data.length);
      return random;
   }

   //input type text
   var textFields = document.querySelectorAll('input[type="text"], input[type="search"], input[type="text"][id*="city" i], input[type="text"][id*="state" i]');

   textFields.forEach(text => {
      var counter = randomNumber(names);
      text.value = names[counter];
   });

   //input type email
   var emailFields = document.querySelectorAll('input[type="email"], input[type="text"][id*="login" i]');
   emailFields.forEach(email => {
      const unique = 'xyz.3679';
      let NumString = '';
      for (let i = 0; i < 2; i++) {
         var counter = randomNumber(numbers);
         NumString += numbers[counter];
      }
      var counter = randomNumber(names);
      var counter2 = randomNumber(emailDom);
      var counter3 = randomNumber(unique);
      email.value = `${names[counter]}${unique[counter3]}${NumString}@${emailDom[counter2]}.com`;
   });

   //select option element
   var allSelectFields = document.querySelectorAll('select');
   allSelectFields.forEach(select => {
      var counter = randomNumber(select);
      select.selectedIndex = counter;
   });

   //textarea
   var textAreaFields = document.querySelectorAll('textarea, input[type="text"][id*="address" i]');
   textAreaFields.forEach(textarea => {
      let areaString = '';
      for (let i = 0; i < 5; i++) {
         if (i > 0) {
            areaString += ' ';
         }
         var counter = randomNumber(lorem);
         areaString += lorem[counter];
      }
      textarea.innerText = areaString;
   });


   //input type tel
   var telephoneNumFields = document.querySelectorAll('input[type="tel"], input[type="text"][id*="phone" i], input[type="text"][id*="mobile" i]');
   telephoneNumFields.forEach(tel => {
      const num = '123456789';
      let telNumString = '+1 (';
      for (let i = 0; i < 10; i++) {
         if (i == 3) {
            telNumString += ') ';
         } else if (i == 6) {
            telNumString += '-';
         }
         var counter = randomNumber(num);
         telNumString += num[counter];
      }
      tel.value = telNumString;
   });


   // input type number
   var numberFields = document.querySelectorAll('input[type="number"], input[type="text"][id*="code" i]');
   numberFields.forEach(num => {
      let NumString = '';
      for (let i = 0; i < 4; i++) {
         var counter = randomNumber(numbers);
         NumString += numbers[counter];
      }
      num.value = NumString;
   });

   // input type date
   var dateFields = document.querySelectorAll('input[type="date"], input[type="text"][id*="date" i]');
   dateFields.forEach(date => {
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
      date.value = randomDate;
   });

   //input type password
   var passwordFields = document.querySelectorAll('input[type="password"]');
   passwordFields.forEach(pass => {
      let passString = '';
      for (let i = 0; i < 3; i++) {
         var counter1 = randomNumber(numbles);
         var counter2 = randomNumber(capital);
         var counter3 = randomNumber(small);
         passString += capital[counter2] + numbles[counter1] + small[counter3];
      }
      pass.value = passString;
   });

   //input type radio
   var radioFields = document.querySelectorAll('input[type="radio"]');
   if (!radioFields.length == 0) {
      var radioCounter = randomNumber(radioFields);
      radioFields.item(radioCounter).checked = true;
   }

   //input type url
   var urlFields = document.querySelectorAll('input[type="url"], input[type="text"][id*="url" i], input[type="text"][id*="website" i]');
   urlFields.forEach(link => {
      counter = randomNumber(names);
      linkString = `www.${names[counter]}.com`;
      link.value = linkString;
   });
}
