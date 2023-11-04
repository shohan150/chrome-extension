const init = function () {
   const injectElement = document.createElement('div');
   injectElement.className = 'newElement';
   injectElement.innerHTML = 'Element successfully added via content script';
   document.body.appendChild(injectElement);

}
init();

