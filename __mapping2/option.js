const newField = document.getElementById('addField');
const saveField = document.getElementById('saveField');
const dltField = document.getElementById('dltField');
const container = document.querySelector('.container');
const savedData = document.querySelector('.savedData');


newField.addEventListener('click', () => {
   let newDiv = document.createElement('div');
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

//create new field to take input values
function newItem() {
   const package = document.createElement('div');
   package.classList.add('fields');
   const label1 = document.createElement('label');
   const label2 = document.createElement('label');
   const label3 = document.createElement('label');
   const input1 = document.createElement('input');
   const input2 = document.createElement('input');
   const input3 = document.createElement('input');
   const dltIcon = document.createElement('img');
   const particularData = document.createElement('div');


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
      let sendData = particularData.querySelector('div p').innerText;
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
      let particularField = document.querySelectorAll('.container .fields');
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


//upper section or create new set part complete. from here, functionality of stored sections begin

showStoredData();

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
   const buttonDiv = document.createElement('div');
   const addNew = document.createElement('button');
   const updateBtn = document.createElement('button');
   const deleteBtn = document.createElement('button');
   const use = document.createElement('button');

   collapsable.className = 'collapsable';
   dataDiv.className = 'dataDiv';
   collapsableHeading.innerText = 'Saved Item ' + (counter + 1);
   collapsableImage.src = 'img/arrow.png';
   collapsableImage.id = 'collImg';
   updateBtn.innerText = 'Update';
   updateBtn.id = 'update';
   deleteBtn.innerText = 'Delete this set';
   deleteBtn.id = 'dlt';
   addNew.innerText = 'Add new field';
   addNew.id = 'add';
   use.innerText = 'Use';
   use.id = 'use';
   buttonDiv.classList.add('buttonDiv');
   dataDiv.classList.add('hideElement');
   buttonDiv.classList.add('hideElement');

   collapsable.appendChild(collapsableHeading);
   collapsable.appendChild(collapsableImage);
   collapsable.appendChild(dataDiv);
   buttonDiv.appendChild(addNew);
   buttonDiv.appendChild(updateBtn);
   buttonDiv.appendChild(deleteBtn);
   buttonDiv.appendChild(use);
   collapsable.appendChild(buttonDiv);
   savedData.appendChild(collapsable);

   collapsableImage.addEventListener('click', () => {
      singleStoredData(storedData[counter], dataDiv);
      dataDiv.classList.toggle('hideElement');
      buttonDiv.classList.toggle('hideElement');
      collapsableImage.classList.toggle('rotateIcon');
   });
   // singleStoredData(storedData[counter], dataDiv);
   updateBtn.addEventListener('click', (event) => {
      updateSet(event, counter);
   });

   deleteBtn.addEventListener('click', (event) => {
      deleteSet(event, counter);
   });

   addNew.addEventListener('click', (event) => {
      let newDiv = document.createElement('div');
      newDiv.appendChild(newItem());
      dataDiv.appendChild(newDiv);
   });

   use.addEventListener('click', (e) => {
      apply(e);
   })
}

function singleStoredData(val, dataDiv) {
   let counter = 0;
   dataDiv.innerHTML = '';
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
   let storedField = event.target.parentElement.parentElement.querySelectorAll('.dataDiv .fields');
   let newData = [];

   storedField.forEach(field => {
      const dataName = field.querySelector('input[id="fieldName"]').value;
      const dataPath = field.querySelector('input[id="fieldPath"]').value;
      const destination = field.querySelector('input[id="destination"]').value;
      if (dataName.trim() || dataPath.trim() || destination.trim()) {
         singularData = { data: dataName, path: dataPath, dest: destination };
         newData.push(singularData);
      } else {
         console.error('Empty field detected');
      }
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

   event.target.parentElement.parentElement.remove();
}

function apply(event) {
   let collection = event.target.parentElement.parentElement.querySelectorAll('.fields');
   let collectData = [];

   collection.forEach(element => {
      const dataName = element.querySelector('input[id="fieldName"]').value;
      const dataPath = element.querySelector('input[id="fieldPath"]').value;
      const destination = element.querySelector('input[id="destination"]').value;
      const mainData = '';

      let singularData = { data: dataName, path: dataPath, dest: destination, content: mainData };
      collectData.push(singularData);
   });

   requestDataFromWebsite(collectData);

}

function requestDataFromWebsite(collectData) {
   const message = {
      name: 'request data',
      data: collectData
   };
   chrome.tabs.query({}, function (tabs) {
      tabs.forEach(tab => {
         chrome.tabs.sendMessage(tab.id, message, function (response) {
            if (chrome.runtime.lastError) {
               console.error(chrome.runtime.lastError);
            } else {
               let checker = 0;
               response.value.forEach(val => {
                  if (val.content) checker++;
               })

               if (checker == response.value.length) {
                  sendDataToForm(response.value);
               }
            }
         });
      });
   });
}

function sendDataToForm(receivedReponce) {
   const message = {
      name: 'form fill up',
      data: receivedReponce
   };
   chrome.tabs.query({}, function (tabs) {
      tabs.forEach(tab => {
         chrome.tabs.sendMessage(tab.id, message);
      });
   });
}


