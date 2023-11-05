// Saves options to chrome.storage

function buildSaveArray() {
   var saveArray = [];
   var element = document.querySelectorAll('.individual-words');
   for (var i = 0; i < element.length; i++) {
      var obj = {};
      obj.keyword = element[i].querySelector('.keyword input').value;
      obj.type = element[i].querySelector('.type select').value;
      obj.replace = element[i].querySelector('.replace input').value;
      saveArray.push(obj);
   }
   saveOptions(saveArray);
   console.log(saveArray);
}

const saveOptions = (saveArray) => {
   chrome.storage.sync.set({ keywordArray: saveArray },
      () => {
         // Update status to let user know options were saved.
         const status = document.getElementById('status');
         status.textContent = 'Options saved.';
         setTimeout(() => {
            status.textContent = '';
         }, 750);
      }
   );
};

// restore options from the synchronized storage and then calling another function to display those options.

// retrieve data from the synchronized storage. You're specifying that you want to retrieve an object with a property called keywordArray. If this property doesn't exist, it will default to an empty array []. { keywordArray: [] }: This object specifies the default values for the items you want to retrieve. Once the data is retrieved, the provided callback function is executed.

// (items) => { ... }: This is the callback function that receives the retrieved data as the items parameter. In this case, items will be an object with a property keywordArray that holds an array of keywords.

// Inside the callback, you call the buildOptionDisplay function and pass the keywordArray from the retrieved items as an argument. This function is responsible for building the display for the options. The buildOptionDisplay function is defined to handle the rendering of options. It takes the items array as a parameter.
const restoreOptions = () => {
   chrome.storage.sync.get({ keywordArray: [] }, (items) => {
      buildOptionDisplay(items.keywordArray);
      console.log(items.keywordArray);
   });
};

function buildOptionDisplay(item) {
   if (item.length == 0) {
      document.querySelector('.add-keyword').click();
   }
   for (var i = 0; i < item.length; i++) {
      if (typeof (item[i]) == 'object') {
         // console.log(item[i]);
         createRowWithOptions(item[i]);
      }
   }
}

function createRowWithOptions(obj) {
   var individualWords = document.querySelector('.individual-words').innerHTML;
   if (typeof (document.querySelector('.individual-words').dataset.id) === 'undefined') {
      document.querySelector('.individual-words').remove();
   }

   var newRow = document.createElement('div');
   newRow.innerHTML = individualWords;
   newRow.classList.add('individual-words');
   var time = new Date();
   var timeStamp = time.toISOString();
   newRow.dataset.id = timeStamp;
   document.querySelector('.keyword-row').appendChild(newRow);

   var newElement = document.querySelector('.keyword-holder .keyword-row .individual-words[data-id="' + timeStamp + '"]');

   newElement.querySelector('.keyword input').value = obj.keyword;
   newElement.querySelector('.type select').value = obj.type;
   if (obj.type == '1') {
      newElement.querySelector('.replace').style.display = 'block';
      newElement.querySelector('.replace input').value = obj.replace;
   }
   newElement.querySelector('.type select').addEventListener('change', (e) => {
      if (e.target.value == '1') {
         newElement.querySelector('.replace').style.display = 'block';
      } else {
         newElement.querySelector('.replace').style.display = 'none';
      }
   })
}

//add listener to add keyword button
document.querySelector('.add-keyword').addEventListener('click', () => {
   var obj = {
      keyword: 'example',
      type: '1',
      replace: 'string'
   };
   createRowWithOptions(obj);
})

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', buildSaveArray);