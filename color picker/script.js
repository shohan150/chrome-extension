const colorPickerBtn = document.querySelector("#color-picker");
const clearAll = document.querySelector(".clear-all");
const colorList = document.querySelector(".all-colors");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");
//  retrieves the data associated with the key "picked-colors" from `localStorage`. If there is no data for this key, it will return `null`.

//  JSON.parse is a JavaScript function that is used to parse a JSON (JavaScript Object Notation) string and convert it into a JavaScript object. 

//  It's used for deserialization, which means converting data from a string back into a structured object.

// The input JSON string should follow the syntax rules of JSON, including proper formatting with double quotes for property names and string values.

// For example this is a json string. It contains the data in string format. By using JSON.parse we take it into object.
// var jsonString = '{"name": "John", "age": 30, "city": "New York"}';
// var parsedObject = JSON.parse(jsonString);

// console.log(parsedObject.name); // Outputs: "John"
// console.log(parsedObject.age);  // Outputs: 30
// console.log(parsedObject.city); // Outputs: "New York"

// JSON.parse will throw an error if the input string is not valid JSON. JSON.parse is commonly used when working with data obtained from APIs, configuration files, or data storage. It's the counterpart of JSON.stringify, which is used to convert JavaScript objects into JSON strings for data serialization.

//  `|| "[]"`: a logical OR operator. If the value retrieved from `localStorage` is `null` (indicating no data was found), it defaults to an empty array represented as a JSON string `"[]"`. This way, you ensure that `pickedColors` is always an array, whether there's existing data or not.

// So, `pickedColors` will be an array containing the data retrieved from "picked-colors" in `localStorage`, or an empty array `[]`

// Copying the color code to the clipboard and updating the element text

const copyColor = (elem) => {
   elem.innerText = "Copied";
   navigator.clipboard.writeText(elem.dataset.color);
   setTimeout(() => elem.innerText = elem.dataset.color, 10);
}
// (elem) => { ... }: defines an arrow function with a single parameter, elem, which represents an HTML element. 

// elem.innerText = "Copied";: changes the visible text of the HTML element to indicate that the color has been copied.

// navigator.clipboard.writeText(elem.dataset.color);: the navigator.clipboard.writeText() method is used to write the value of the elem.dataset.color attribute (which contain the color code) to the user's clipboard. This method provides an asynchronous way to interact with the clipboard and write text to it.

// setTimeout(() => elem.innerText = elem.dataset.color, 1000);: After the color code has been copied, this line sets a timeout to change the text content of the element back to its original color code (contained in elem.dataset.color) after one second (1000 milliseconds). This gives visual feedback to the user that the color has been successfully copied.

const showColor = () => {
   if (!pickedColors.length) return; // Returning if there are no picked colors
   colorList.innerHTML = pickedColors.map(color => `
        <li class="color">
            <span class="rect" style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc" : color}"></span>
            <span class="value hex" data-color="${color}">${color}</span>
        </li>
    `).join(""); // // Generating li for the picked color and adding it to the colorList
   // pickedColors is an array containing color values.
   // The .map() method is used to iterate over an array and apply a function to each element in the array. The .map() method is often used for transforming data in one array into a new array with the transformed values.(color => ...) is an arrow function that defines what should happen for each item in the array. 

   // .join() method is used to concatenate the elements of an array into a single string. It takes an optional argument (seperator) that specifies the separator to use between the array elements.
   // For example:
   // const fruits = ["apple", "banana", "cherry"];
   // const joinedString = fruits.join(", ");
   // // joinedString is "apple, banana, cherry"

   // border: 1px solid ${color == "#ffffff" ? "#ccc" : color} sets the border style. If the color is #ffffff (white), it uses a gray border (#ccc), otherwise, it uses the color itself.
   // The data-* attribute is a way to store custom data private to the page or application. It allows you to store information in HTML elements and access that data using JavaScript. You can retrieve the value of data-color with JavaScript and use it for various purposes. It's a way to attach extra data to HTML elements, which can be helpful when working with dynamic web applications.

   // Example:
   // const colors = document.querySelector(".value.hex");
   // const dataColorValue = colors.getAttribute("data-color");
   // console.log(dataColorValue); 

   document.querySelector(".picked-colors").classList.remove("hide");

   // Add a click event listener to each color element to copy the color code
   document.querySelectorAll(".color").forEach(li => {
      li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild)); //It has two spans. last child element means the second span. 

      //it works with target as well instead of currentTarget. But using currentTarget is the proper way. 
      // event.target` refers to the actual HTML element that triggered the event. It represents the element that was interacted with directly.
      //    - If you have a click event on a button element, `event.target` would be the button element.
      //    - This property doesn't change during event propagation.

      // `event.currentTarget` refers to the element that the event handler is currently attached to. It is the element where you added the event listener.
      //    - If you have an event listener on a parent container, and a child element within that container triggers the event, `event.currentTarget` would be the parent container.
      //    - This property can change during event propagation. When the event bubbles or captures through the DOM tree, `currentTarget` remains the same (the element with the event listener), while `target` changes to the element that triggered the event.

      // an example:
      // <div id="parent">
      //   <button id="child">Click me!</button>
      // </div>

      // JavaScript:
      // document.getElementById("parent").addEventListener("click", function(event) {
      //   console.log("Current Target: " + event.currentTarget.id);
      //   console.log("Target: " + event.target.id);
      // });

      //  output:
      // Current Target: parent
      // Target: child

      // In this example, `currentTarget` is the `#parent` element (where the event listener is attached), and `target` is the `#child` button (the element that was clicked).
   });
}
showColor();

const activateEyeDropper = () => {
   document.body.style.display = "none";
   setTimeout(async () => {
      try {
         // Opening the eye dropper and getting the selected color
         const eyeDropper = new EyeDropper();
         const { sRGBHex } = await eyeDropper.open();
         navigator.clipboard.writeText(sRGBHex);

         // Adding the color to the list if it doesn't already exist
         if (!pickedColors.includes(sRGBHex)) {
            pickedColors.push(sRGBHex);
            localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
            showColor();
         }
      } catch (error) {
         alert("Failed to copy the color code!");
      }
      document.body.style.display = "block";
   }, 10);
}
// sets up a setTimeout function to execute some code with a slight delay(10 milliseconds). 

// Inside the setTimeout function, it tries to perform the steps asynchronously.An asynchronous function is a function that doesn't block the execution of the program while waiting for a task to complete. Instead of halting the program's execution until a task is finished, an asynchronous function allows the program to continue executing other tasks while waiting for the asynchronous operation to complete.asynchrony is commonly used for tasks that might take some time to finish, like making network requests, reading files, or waiting for user input. 

// The very short delay(10 milliseconds) is used to ensure that some code is executed asynchronously.The delay of 10ms indicates that the code inside the function won't start executing immediately. It will be scheduled to run after the specified delay. This doesn't mean that everything inside the function will be executed after 10ms; rather, it means that the function itself will be invoked after 10ms, and its execution will then proceed. If you set the delay to 5000ms. the eyepicker will become active after 5s of clicking the button.

// When this code is encountered, it schedules the function inside the setTimeout to run after a 10ms delay.The program continues to execute other tasks, and after 10ms, the scheduled function is placed in the JavaScript event queue to be executed.When the function's turn comes in the event queue, it is invoked, and its code begins to execute. So, the 10ms delay represents the time between scheduling the function to run and actually executing it. It's used to ensure that the code inside the function runs asynchronously and doesn't block the main execution thread, allowing other tasks to be performed during this time.

//It opens the eyedropper tool using new EyeDropper() and awaits the result. The await keyword means that this part of the code will pause and wait for the promise returned by eyeDropper.open() to resolve before continuing. The sRGBHex variable holds the color code that the eyedropper tool captured. It then copies the color code to the clipboard using navigator.clipboard.writeText(sRGBHex).

// It checks if the color code is already in the pickedColors array using !pickedColors.includes(sRGBHex). If it's not, it adds the color code to the array with pickedColors.push(sRGBHex).

// Finally, it updates the stored picked-colors in local storage and calls the showColor() function to display the list of picked colors.

// If an error occurs within the try block, such as a problem with opening the eyedropper tool, capturing a color, or copying the color to the clipboard, an exception (error) is thrown. The catch block catches this exception and assigns it to the error parameter.

const clearAllColors = () => {
   pickedColors.length = 0;
   localStorage.setItem("picked-colors", JSON.stringify(pickedColors)); //those two lines of code clear the pickedColors array and update the local storage to store the empty array. first line clears the array by setting its length to zero, effectively removing all elements from the array. 2nd line updates the local storage. JSON.stringify converts the array to a JSON string.

   document.querySelector(".picked-colors").classList.add("hide");
}

clearAll.addEventListener("click", clearAllColors);
colorPickerBtn.addEventListener("click", activateEyeDropper);