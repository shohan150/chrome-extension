
const filenames = [
   "/img/1.jpg",
   "/img/2.jpg",
   "/img/3.jpg",
   "/img/4.jpg",
   "/img/5.jpg"
]

let imgs = document.getElementsByTagName('img');
const imgArray = Array.from(imgs);
console.log(imgs);

// imgs.forEach((image) => {
//    var r = Math.floor(Math.random() * filenames.length);
//    console.log(image.src);
//    console.log(r);
//    console.log(filenames[r]);
//    file = filenames[r];
//    image.src = chrome.runtime.getURL(filenames[r]);
// });

for (images of imgs) {
   var r = Math.floor(Math.random() * filenames.length);
   // console.log(images.src);
   // console.log(r);
   // console.log(filenames[r]);
   file = filenames[r];
   images.src = chrome.runtime.getURL(filenames[r]);
}