const init = function () {
   const injectElement = document.createElement('div');
   injectElement.className = 'newElement';
   injectElement.innerHTML = 'Element successfully added';
   document.body.appendChild(injectElement);

}
init();

