chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
   //declare the random data
   const names = ['Sujon', 'Fatema', 'Rakib', 'Raihan', 'Arnab', 'Abir', 'Akash', 'Richad', 'Wade', 'Dave', 'Seth', 'Ivan', 'Riley', 'Gilbert', 'Jorge', 'Dan', 'Brian', 'Roberto', 'Liam', 'Ethan', 'Lewis', 'Joshua', 'Donald', 'Harvey', 'Antonio', 'Connor', 'Julian', 'Aidan', 'Harold', 'Conner', 'Peter', 'Carlos', 'Daisy', 'Deborah', 'Isabel', 'Stella', 'Debra', 'Beverly', 'Vera', 'Angela', 'Lucy', 'Lauren', 'Janet', 'Loretta', 'Tracey', 'Beatrice', 'Sabrina', 'Hannah', 'Alisa', 'Rachelle', 'Janine', 'Helena'];
   const lastNames = ['Khan', 'Ahmed', 'Chowdhury', 'Akhter', 'Alam', 'Harris', 'Thomas', 'Robinson', 'Walker', 'Scott', 'Nelson', 'Mitchell', 'Morgan', 'Cooper', 'Howard', 'Davis', 'Miller', 'Martin', 'Smith', 'Anderson', 'White', 'Perry', 'Clark', 'Richards', 'Wheeler', 'Stanley', 'Holland', 'Terry', 'Shelton', 'Miles', 'Lucas', 'Fletcher', 'Norris', 'Daniel', 'Potter', 'Francis', 'Erickson', 'Norman', 'Sherman', 'Simon', 'Jones', 'Brown', 'Garcia', 'Rodriguez', 'Lee', 'Young', 'Hall', 'Allen', 'Lopez', 'Green', 'Gonzalez', 'Baker', 'Adams'];
   const cities = ['Los Angles', 'Chicago', 'Dallas', 'Houston', 'Dhaka', 'Rajshahi', 'Chittagong', 'Shylet', 'Khulna', 'Barisal', 'Philadelphia', 'New York', 'Paris', 'El Paso', 'Miami', 'Tokyo', 'Sao Paolo', 'Cairo', 'Tehran', 'London', 'Hong Kong', 'Bagdad', 'Madrid', 'Nairobi', 'Kabul', 'Kuwait', 'Berlin', 'Rome', 'Melbourne', 'Jiddah', 'Dtriot', 'Taiyuan', 'Hefei', 'Naples', 'Cape Town', 'Dakar', 'Athens'];
   const states = ['California', 'Texas', 'Kentucjy', 'South Dakota', 'North Dakota', 'Ohio', 'Delware', 'Alabama', 'Pennsylvania', 'Arizona', 'Navada', 'Kansas', 'Hawaii', 'New Jersey', 'connecticut', 'Puerto Rico'];
   const countries = ['Albania', 'Argentina', 'Brazil', 'Armenia', 'Romania', 'Bangladesh', 'Australia', 'Burkia Faso', 'Cameroon', 'Chile', 'China', 'South Korea', 'North Korea', 'Colombia', 'Congo', 'Costa Rica', 'Cuba', 'Fiji', 'Finland', 'Norway', 'Iceland', 'Honduras', 'Hungary', 'Haiti', 'Indonesia', 'Ireland', 'Japan', 'Jordan', 'Kuwait', 'Maxico', 'Morocco', 'Poland', 'Russia', 'Thailand'];

   const emailDom = ['google', 'google', 'google', 'hotmail', 'yahoo'];
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
   var textFields = document.querySelectorAll('input[type="text"]');
   textFields.forEach(text => {
      var counter = randomNumber(names);
      text.value = names[counter];
   });


   var lastNameFields = document.querySelectorAll('input[type="text"][id*="last" i]');
   lastNameFields.forEach(text => {
      var counter = randomNumber(lastNames);
      text.value = lastNames[counter];
   });

   var cityFields = document.querySelectorAll('input[type="text"][id*="city" i]');
   cityFields.forEach(text => {
      var counter = randomNumber(cities);
      text.value = cities[counter];
   });


   var stateFields = document.querySelectorAll('input[type="text"][id*="state" i], input[type="text"][id*="province" i]');
   stateFields.forEach(text => {
      var counter = randomNumber(states);
      text.value = states[counter];
   });


   var countryFields = document.querySelectorAll('input[type="text"][id*="country" i]');
   countryFields.forEach(text => {
      var counter = randomNumber(countries);
      text.value = countries[counter];
   });

   var fullNameFields = document.querySelectorAll('input[type="text"][id*="full" i]');
   fullNameFields.forEach(text => {
      var counter = randomNumber(names);
      var counter2 = randomNumber(lastNames);
      text.value = names[counter] + lastNames[counter2];
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
   var textAreaFields = document.querySelectorAll('textarea, input[type="text"][id*="addr" i], input[type="search"]');
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
   var telephoneNumFields = document.querySelectorAll('input[type="tel"], input[type="text"][id*="phone" i], input[type="text"][id*="mobile" i], input[type="text"][id*="contact" i]');
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
   var numberFields = document.querySelectorAll('input[type="number"], input[type="text"][id*="code" i], input[type="text"][id*="postal" i], input[type="text"][id*="amount" i], input[type="text"][id*="zip" i]');
   numberFields.forEach(num => {
      let NumString = '';
      for (let i = 0; i < 4; i++) {
         var counter = randomNumber(numbers);
         NumString += numbers[counter];
      }
      num.value = NumString;
   });

   // input type age
   var ageFields = document.querySelectorAll('input[type="number"][id*="age" i], input[type="text"][id*="age" i]');
   ageFields.forEach(age => {
      let NumString = '';
      for (let i = 0; i < 2; i++) {
         var counter = randomNumber(numbers);
         NumString += numbers[counter];
      }
      age.value = NumString;
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

   //input type checkbox
   var checkboxField = document.querySelectorAll('input[type="checkbox"]');
   checkboxField.forEach(box => {
      box.checked = true;
   });

   //input type color
   var colorField = document.querySelectorAll('input[type="color"]');
   colorField.forEach(color => {
      colorCode = '#';
      i = 0;
      while (i < 6) {
         digit = randomNumber(numbers);
         colorCode += digit;
         i++;
      }
      color.value = colorCode;
   });
}
