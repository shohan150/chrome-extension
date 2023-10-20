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
   setTimeout(() => elem.innerText = elem.dataset.color, 1000);
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
   document.querySelector(".picked-colors").classList.remove("hide");

   // Add a click event listener to each color element to copy the color code
   document.querySelectorAll(".color").forEach(li => {
      li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
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

// Clearing all picked colors, updating local storage, and hiding the colorList element
const clearAllColors = () => {
   pickedColors.length = 0;
   localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
   document.querySelector(".picked-colors").classList.add("hide");
}

clearAll.addEventListener("click", clearAllColors);
colorPickerBtn.addEventListener("click", activateEyeDropper);