var abc = document.querySelectorAll('form input[type="text"]');

var rand = ['karim', 'rahim', 'sujon']
for (var i = 0; i < abc.length; i++) {
   var counter = Math.floor(Math.random() * rand.length);
   abc[i].value = rand[counter];
   console.log(counter);
}