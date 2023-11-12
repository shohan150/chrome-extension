var newField = document.getElementById('addField');
var saveField = document.getElementById('saveField');
var dltField = document.getElementById('dltField');
var container = document.querySelector('.container');


newField.addEventListener('click', () => {
   container.innerHTML += fieldHTML;
});

saveField.addEventListener('click', () => {
   saveTheData();
});

dltField.addEventListener('click', () => {
   chrome.storage.local.remove('fieldsData');
   showStoredData();
})


var fieldHTML =
   `<div class="fields">
      <label>Name : </label>
      <input type="text" id="fieldName">
      <label>Path : </label>
      <input type="text" id="fieldPath">
   </div>`;

function saveTheData() {
   var particularField = document.querySelectorAll('.container .fields');
   var fieldsData = [];
   particularField.forEach(field => {
      const dataName = field.querySelector('input[id="fieldName"]').value;
      const dataPath = field.querySelector('input[id="fieldPath"]').value;
      fieldsData.push({ data: dataName, path: dataPath });
   })
   chrome.storage.local.set({ fieldsData });
}

function showStoredData() {
   chrome.storage.local.get(['fieldsData'], function (result) {
      if (!result.fieldsData) {
         container.innerHTML = '';
      } else {
         result.fieldsData.forEach(val => {
            var showStoredValues =
               `<div class="fields">
               <label>Name : </label>
               <input type="text" id="fieldName" value="${val.data}">
               <label>Path : </label>
               <input type="text" id="fieldPath" value="${val.path}">
            </div>`
            container.innerHTML += showStoredValues;
         });
      }
   });
}
showStoredData();
