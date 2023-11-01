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
// The "web_accessible_resources" key in the manifest.json file is used to specify resources (like images, CSS files, or JavaScript files) that your extension wants to make accessible from web pages.

// in manifest.json, you have specified a list of image resources (1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg) that are included in your extension. By defining these resources, you are making them accessible to web pages, and they can be used in the content of web pages using URLs like chrome-extension://extension_id/img/1.jpg.

// So, to display one of these images on a web page using your extension, you can use the resource URL in your content script or injected code:
// chrome.runtime.getURL('img/1.jpg');