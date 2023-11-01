$(function () {
   var color = $('#fontColor').val();
   $('#fontColor').on("change paste keyup", function () {
      color = $(this).val();

      // //in case you want the code to work withour even clicking the change button ----------
      // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //    chrome.tabs.sendMessage(tabs[0].id, { todo: "changeColor", clickedColor: color });
      // });
      // //----------
   });

   $('#btnChange').click(function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
         chrome.tabs.sendMessage(tabs[0].id, { todo: "changeColor", clickedColor: color });
      });
   })
})