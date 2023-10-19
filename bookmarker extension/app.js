let allLinks = [];

const input = document.getElementById('input');
const inputBtn = document.getElementById('input-btn');
const tabBtn = document.getElementById('tab-btn');
const deleteBtn = document.getElementById('delete');
const list = document.getElementById('list');

let getLinksFromStorage = JSON.parse(localStorage.getItem("saveLinks"));

if (getLinksFromStorage) {
   allLinks = getLinksFromStorage;
   renderArray(allLinks);
};

function renderArray(arr) {
   list.innerHTML = '';
   arr.forEach(item => {
      list.innerHTML += `<li><a href=${item} class="link">Hello World ${item}</a></li>`
   })
};

inputBtn.addEventListener('click', () => {
   let links = input.value;
   allLinks.push(links);
   console.log(allLinks);
   input.value = '';
   localStorage.setItem("saveLinks", JSON.stringify(allLinks));
   renderArray(allLinks);
});

deleteBtn.addEventListener('click', () => {
   localStorage.clear();
   allLinks = [];
   renderArray(allLinks);
});

tabBtn.addEventListener('click', () => {
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var actibeTab = tabs[0].url;
      allLinks.push(actibeTab);
      localStorage.setItem("saveLinks", JSON.stringify(allLinks));
      renderArray(allLinks);
   })
});