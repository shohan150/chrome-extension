var newField = document.getElementById('addField');
var saveField = document.getElementById('saveField');
var container = document.querySelector('.container');


var fieldHTML = `<div class="fields">
<label>Name : </label>
<input type="text" id="fieldName">
<label>Path : </label>
<input type="text" id="fieldPath">
</div>`
newField.addEventListener('click', () => {
   container.innerHTML += fieldHTML;
});

saveField.addEventListener('click', () => {
   var particularField = document.querySelectorAll('.container .fields');
   var fieldsData = [];
   particularField.forEach(field => {
      const dataName = field.querySelector('input[id="fieldName"]').value;
      const dataPath = field.querySelector('input[id="fieldPath"]').value;
      fieldsData.push({ data: dataName, path: dataPath });
   })

   chrome.storage.local.set({ fieldsData });
   // chrome.storage.local.get(['fieldsData'], function (result) {
   //    result.fieldsData.forEach(val => {
   //       console.log(val.data, val.path);
   //    })
   // });
});