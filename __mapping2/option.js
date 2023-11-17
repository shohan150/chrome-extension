var newField = document.getElementById('addField');
var saveField = document.getElementById('saveField');
var dltField = document.getElementById('dltField');
var container = document.querySelector('.container');


//add event listeners to the buttons
newField.addEventListener('click', () => {
   var newDiv = document.createElement('div');
   newDiv.appendChild(newItem());
   container.appendChild(newDiv);
});

saveField.addEventListener('click', () => {
   saveTheData();
});

dltField.addEventListener('click', () => {
   chrome.storage.local.remove('fieldsData');
   showStoredData();
})


function newItem() {
   const package = document.createElement('div');
   package.classList.add('fields');
   var label1 = document.createElement('label');
   var label2 = document.createElement('label');
   var input1 = document.createElement('input');
   var input2 = document.createElement('input');
   var pathBtn = document.createElement('button');
   var exportBtn = document.createElement('button');
   var particularData = document.createElement('div');


   label1.innerText = 'Name : ';
   label2.innerText = 'Query Path : ';
   input1.id = 'fieldName';
   input2.id = 'fieldPath';
   pathBtn.innerText = 'Get Data';
   exportBtn.innerText = 'Export Data';

   pathBtn.addEventListener('click', () => {
      const message = {
         name: 'get selector',
      };
      chrome.tabs.query({}, function (tabs) {
         tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, message, function (response) {
               if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError);
               } else {
                  input2.value = response.value;
                  particularData.innerHTML = `<h3> Collected data: </h3>
                  <p>${response.data}</p>`;
               }
            });
         });
      });
   });

   exportBtn.addEventListener('click', () => {
      var sendData = particularData.querySelector('p').innerText;
      const message = {
         name: 'show data',
         data: sendData
      }
      chrome.tabs.query({}, function (tabs) {
         tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, message)
            // console.log(message);
         })
      })
   });


   package.appendChild(label1);
   package.appendChild(input1);
   package.appendChild(label2);
   package.appendChild(input2);
   package.appendChild(pathBtn);
   package.appendChild(exportBtn);
   package.appendChild(particularData);
   return package;
}


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
            var newDiv = document.createElement('div');
            newDiv.appendChild(newItem());
            container.appendChild(newDiv);
            newDiv.querySelector('input[id="fieldName"]').value = val.data;
            newDiv.querySelector('input[id="fieldPath"]').value = val.path;
         });
      }
   });
}
showStoredData();
