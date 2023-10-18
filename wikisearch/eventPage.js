var menuItem = {
   "id": "wikit",
   "title": "wikit",
   "contexts": ["selection"]
};
chrome.contextMenus.create(menuItem);

function fixedEncodeURI(str) {
   return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');

   // The `encodeURI()` function is a built -in JavaScript function used to encode a URI(Uniform Resource Identifier) component. 

   // URIs can contain special characters, and when you want to include them in a URI, you need to properly encode those characters to ensure the URI remains valid and doesn't break.

   // It takes a single argument, which is a string (str) that represents the URI component you want to encode. It encodes all characters in the string, except for the following characters: `,`, `/`, `:`, `;`, `=`, `?`, `&`, `@`, `#`, `$`, and`+`.These characters are reserved for specific purposes in URIs and are not encoded. 

   // It replaces spaces with `%20`.This is because spaces are not allowed in URIs, and`%20` is the URL - encoded representation of a space character. It encodes special characters using a `%` sign followed by two hexadecimal digits.For example, the character `#` is encoded as `%23`, and the character `?` is encoded as `%3F`.

   //    Here's an example of using `encodeURI()`:

   //    const originalString = "This is an example string: ?#";
   //    const encodedString = encodeURI(originalString);

   //    console.log(encodedString);
   //    // Output: "This%20is%20an%20example%20string:%20%3F#"
   //    ```
   //  You typically use `encodeURI()` when you need to include data within a URI, such as query parameters or path segments, to ensure that the URI remains valid and correctly represents the intended data.It helps prevent issues with characters that have special meanings in URIs.

   //  The replacement of `[` and `]` characters is necessary because these characters can be used for special purposes in URIs. In the context of query strings, `[` and `]` characters can be used to define the boundaries of arrays or lists of values, and they might have special meanings in certain web applications or services. For example, in some APIs or web services, query parameters like `myArray[0]` and `myArray[1]` could be used to pass an array of values. To ensure that these characters are correctly encoded and don't interfere with the intended functionality of the URI, they should be percent-encoded when included in the URI. For instance, `[` is percent-encoded as `%5B`, and `]` is percent-encoded as `%5D`.

}

chrome.contextMenus.onClicked.addListener(function (clickData) {

   if (clickData.menuItemId == "wikit" && clickData.selectionText)

   //`menuItem.id` and `menuItemId` are not the same thing. 

   //  `menuItem.id` is a property defined when creating a context menu item, and you can access it as a property of the `menuItem` object. You can access its `id` property as `menuItem.id` to get the value "wikit."

   // `menuItemId` is a property of the `clickData` object that is automatically provided by the context menu event. It represents the ID of the context menu item that was clicked. You access it as `clickData.menuItemId`. This value will be the ID of the clicked context menu item, such as "wikit" in your case.

   // So, these two are different properties with different purposes. `menuItem.id` is for setting the ID when creating the menu item, and `menuItemId` is for retrieving the ID of the clicked menu item when handling the context menu event.

   // The clickData.selection and clickData.selectionText properties are part of the clickData object provided when handling a context menu click event in a browser extension. They are related to the selected text on a webpage.

   // clickData.selection: property represents the selected text on the webpage when a context menu item was clicked. It provides more information about the selection, including details like the text, the start offset, and the end offset within the selected text.

   // clickData.selectionText: is a specific property of the clickData object that directly contains the text of the selection. It holds only the text of the selected portion on the webpage.

   {
      var wikiURl = "https://en.wikipedia.org/wiki/" + fixedEncodeURI(clickData.selectionText);

      //constructs a URL for a Wikipedia page by appending the selected text,clickData.selectionText after encoding it using the fixedEncodeURI function.

      var createData = {
         "url": wikiURl,
         "type": "popup",
         "top": 5,
         "left": 5,
         "width": 800,
         "height": 600

         // This block defines an object named createData with properties used to configure the new popup window. 
         // "url": specifies the URL of the page to be loaded in the popup.
         // "type": specifies the type of the window. In this case, it's set to "popup".
         // "top", "left", "width", "height": properties set the position and dimensions of the new popup window. The window will be positioned at (5, 5) pixels on the screen.
      }
      chrome.windows.create(createData, function () { })
      //open a new popup window with the specified configuration provided in createData.
   }
})