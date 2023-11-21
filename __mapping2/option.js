var newField = document.getElementById('addField');
var saveField = document.getElementById('saveField');
var dltField = document.getElementById('dltField');
var container = document.querySelector('.container');
var savedData = document.querySelector('.savedData');


//add event listeners to the buttons
newField.addEventListener('click', () => {
   var newDiv = document.createElement('div');
   newDiv.appendChild(newItem());
   container.appendChild(newDiv);
});

saveField.addEventListener('click', () => {
   saveTheData();
   savedData.innerHTML = '';
   setTimeout(() => {
      showStoredData();
      container.innerHTML = '';
   }, 10);
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
   var label3 = document.createElement('label');
   var input1 = document.createElement('input');
   var input2 = document.createElement('input');
   var input3 = document.createElement('input');
   var dltIcon = document.createElement('img');
   var particularData = document.createElement('div');


   label1.innerText = 'Name : ';
   label2.innerText = 'Source : ';
   label3.innerText = 'Destination : ';
   input1.id = 'fieldName';
   input2.id = 'fieldPath';
   input3.id = 'destination';
   dltIcon.src = 'img/delete.png';


   package.appendChild(label1);
   package.appendChild(input1);
   package.appendChild(label2);
   package.appendChild(input2);
   package.appendChild(label3);
   package.appendChild(input3);
   package.appendChild(dltIcon);
   package.appendChild(particularData);


   //add event listener to the get data & path button
   input2.addEventListener('click', () => {
      //send message to all tabs
      const message = {
         name: 'get selector',
      };
      let isDataUpdated = false;
      chrome.tabs.query({}, function (tabs) {
         tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, message, function (response) {
               if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError);
               } else {
                  if (!isDataUpdated) {
                     input2.value = response.value;
                     particularData.innerHTML = `<p>${response.data}</p>`;

                     isDataUpdated = true;
                  }
               }
            });
         });
      });
   });

   input3.addEventListener('click', (event) => {
      var sendData = particularData.querySelector('div p').innerText;
      const message = {
         name: 'show data',
         data: sendData
      }
      chrome.tabs.query({}, function (tabs) {
         tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, message, function (response) {
               if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError);
               } else {
                  input3.value = response.value;
               }
            })
         });
      })
   })

   dltIcon.addEventListener('click', (event) => {
      event.target.parentElement.remove();
   });
   return package;
}

function saveTheData() {
   chrome.storage.local.get(['fieldsData'], function (result) {
      let fieldsData = result.fieldsData || [];

      let newData = [];
      var particularField = document.querySelectorAll('.container .fields');
      particularField.forEach(field => {
         const dataName = field.querySelector('input[id="fieldName"]').value;
         const dataPath = field.querySelector('input[id="fieldPath"]').value;
         const destination = field.querySelector('input[id="destination"]').value;
         if (dataName.trim() || dataPath.trim() || destination.trim()) {
            singularData = { data: dataName, path: dataPath, dest: destination };
            newData.push(singularData);
         } else {
            console.error('You have entered an empty field');
         }

      });
      if (newData.length) {
         fieldsData.push(newData);
      }
      chrome.storage.local.set({ fieldsData });
   });
}

function showStoredData() {
   chrome.storage.local.get(['fieldsData'], function (result) {
      if (!result.fieldsData) {
         savedData.innerHTML = '';
      } else {
         let counter = 0;
         result.fieldsData.forEach(val => {
            storedSection(result.fieldsData, counter);
            counter++;
         });
      }
   });
}

function storedSection(storedData, counter) {
   const collapsable = document.createElement('div');
   const collapsableHeading = document.createElement('h3');
   const collapsableImage = document.createElement('img');
   const dataDiv = document.createElement('div');
   const updateBtn = document.createElement('button');
   const deleteBtn = document.createElement('button');

   collapsable.className = 'collapsable';
   dataDiv.className = 'dataDiv';
   collapsableHeading.innerText = 'Saved Item ' + (counter + 1);
   collapsableImage.src = 'img/arrow.png';
   collapsableImage.id = 'collImg';
   updateBtn.innerText = 'Update';
   updateBtn.id = 'update';
   deleteBtn.innerText = 'Delete this set';
   deleteBtn.id = 'dlt';

   collapsable.appendChild(collapsableHeading);
   collapsable.appendChild(collapsableImage);
   collapsable.appendChild(dataDiv);
   collapsable.appendChild(updateBtn);
   collapsable.appendChild(deleteBtn);
   savedData.appendChild(collapsable);

   collapsable.addEventListener('click', () => {
      singleStoredData(storedData[counter], dataDiv);
      collapsableImage.style.transform = 'rotate(180deg)';
      //class toggle on dataDiv, dltBtn,updtBtn
      //fix the repetative issue
   });

   updateBtn.addEventListener('click', (event) => {
      updateSet(event, counter);
   })

   deleteBtn.addEventListener('click', (event) => {
      deleteSet(event, counter);
   })
}

function singleStoredData(val, dataDiv) {
   let counter = 0;
   // dataDiv.innerHTML = '';
   val.forEach(value => {
      var newDiv = document.createElement('div');
      newDiv.appendChild(newItem());
      dataDiv.appendChild(newDiv);
      newDiv.querySelector('input[id="fieldName"]').value = val[counter].data;
      newDiv.querySelector('input[id="fieldPath"]').value = val[counter].path;
      newDiv.querySelector('input[id="destination"]').value = val[counter].dest;
      counter++;
   })
}

function updateSet(event, counter) {
   let storedField = event.target.parentElement.querySelectorAll('.dataDiv .fields');
   let newData = [];

   storedField.forEach(field => {
      const dataName = field.querySelector('input[id="fieldName"]').value;
      const dataPath = field.querySelector('input[id="fieldPath"]').value;
      const destination = field.querySelector('input[id="destination"]').value;
      singularData = { data: dataName, path: dataPath, dest: destination };
      newData.push(singularData);
   });


   chrome.storage.local.get('fieldsData', function (result) {
      const retrieveStoredData = result.fieldsData || [];
      retrieveStoredData[counter] = newData;
      chrome.storage.local.set({ 'fieldsData': retrieveStoredData });
   });
}

function deleteSet(event, counter) {
   chrome.storage.local.get('fieldsData', function (result) {
      const storedData = result.fieldsData || [];
      storedData.splice(counter, 1);

      chrome.storage.local.set({ 'fieldsData': storedData });
   });

   event.target.parentElement.remove();
}

showStoredData();


//toggle the saved fields
//create field button
//use