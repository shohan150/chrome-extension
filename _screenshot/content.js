const script = document.createElement('script');
script.src = chrome.runtime.getURL('html2canvas.js');
document.head.appendChild(script);
script.onload = function () {
   function capture() {
      html2canvas(document.body).then(canvas => {
         var aa = document.createElement("a");
         aa.download = "canvas screenshot.png";
         aa.href = canvas.toDataURL("image / png");
         aa.click();
      })
   };
   capture();
};

// const script2 = document.createElement('script');
// script2.src = chrome.runtime.getURL('example.js');
// document.head.appendChild(script2);
// script2.onload = function () {
//    test('check 2');
//    function capture() {
//       // html2canvas(document.body).then(canvas => {
//       //    var aa = document.createElement("a");
//       //    aa.download = "canvas screenshot.png";
//       //    aa.href = canvas.toDataURL("image / png");
//       //    aa.click();
//       // })
//    };
//    capture();
// };
