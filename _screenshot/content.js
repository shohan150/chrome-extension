const script = document.createElement('script');
script.src = chrome.runtime.getURL('html2canvas.min.js');
document.head.appendChild(script);
script.onload = function () {
   function capture() {
      console.log('check bro');
      html2canvas(document.body).then(canvas => {
         var aa = document.createElement("a");
         aa.download = "canvas screenshot.png";
         aa.href = canvas.toDataURL("image / png");
         aa.click();
      })
   };
   capture();
};
