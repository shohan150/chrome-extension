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
      Element successfully added again.`;
      document.body.appendChild(injectElement);

   }
   init();
}
