let imgs = document.getElementsByTagName('img');
// console.log(typeof (imgs));
let imgs2 = [];

for (images of imgs) {
   // images.src = chrome.runtime.getURL(filenames[r]);
   imgs2.push(images.src);
}
// console.log(typeof (imgs));
// console.log(imgs2);