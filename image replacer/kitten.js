
const filenames = [
   "/img/1.jpg",
   "/img/2.jpg",
   "/img/3.jpg",
   "/img/4.jpg",
   "/img/5.jpg"
]

let imgs = document.getElementsByTagName('img');
console.log(imgs);

for (images of imgs) {
   var r = Math.floor(Math.random() * filenames.length);
   file = filenames[r];
   images.src = chrome.runtime.getURL(filenames[r]);
}