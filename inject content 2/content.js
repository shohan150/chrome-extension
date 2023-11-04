if (typeof init === 'undefined') {
   const init = function () {
      const injectElement = document.createElement('div');
      injectElement.className = 'newElement';
      injectElement.innerHTML = `<style>
      .newElement {
         font-size: 24px;
         color: white;
         background-color: black;
         padding: 20px;
      }
      </style>
      Element successfully added again via background.js.`;
      document.body.appendChild(injectElement);

   }
   init();
}

// `if (typeof init === 'undefined') { ... }`: This conditional statement checks whether the variable `init` is undefined. If it's undefined, it executes the code inside the block. The purpose of this check is to ensure that the code is not executed multiple times in the same page, avoiding the insertion of the same element multiple times.

// `const init = function () { ... }`: Inside the block, a new function named `init` is defined using a `const` declaration. This function will create and inject the new HTML element when called.

// This code is designed to be executed once to add the specified styled element to the page. If the `init` function is already defined, it won't execute again to prevent duplicate insertions of the same element.