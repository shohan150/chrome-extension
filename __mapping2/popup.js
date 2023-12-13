const siteData = document.getElementById("site-data");
const dynamicData = document.getElementById("dynamic-data");

//send message when the collect data butto has been clicked
// document.getElementById('dataCollector').addEventListener('click', function () {
//    const message = {
//       name: 'send data of already set path',
//    };
//    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       const activeTab = tabs[0];
//       chrome.tabs.sendMessage(activeTab.id, message);
//    });
// });

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//    if (message.name == 'send website data to popup') {
//       var dataDivs = document.createElement('div');
//       dataDivs.classList.add('dataDiv');
//       var showData = `<h2>${message.title}: </h2>
//    <p>${message.data}</p>`;
//       dataDivs.innerHTML = showData;
//       siteData.appendChild(dataDivs);
//    }
// });

document.querySelector('#options-button').addEventListener('click', function () {
   chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
});


