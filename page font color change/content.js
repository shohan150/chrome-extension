
//-------------------------
chrome.runtime.sendMessage({ todo: "showPageAction" });
// { todo: "showPageAction" } is the message being sent.
// It's an object with a property todo set to the string value "showPageAction". The purpose of sending this message is to trigger some action in the background script/eventPage.

//------------------

chrome.runtime.onMessage.addListener(function (msg, sender, sendRespoce) {
   if (msg.todo == "changeColor") {
      var addColor = msg.clickedColor;
      console.log(addColor);
      $('.fixed-table').css('color', addColor);
   }
});
