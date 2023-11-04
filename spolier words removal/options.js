// Saves options to chrome.storage

function buildSaveArray() {
   var saveArray = [];
   saveOptions(saveArray);
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

// Restores select box and checkbox state using the preferences stored in chrome.storage.
const restoreOptions = () => {
   chrome.storage.sync.get({ keywordArray: [] }, (items) => {
      buildOptionDisplay(items.keywordArray);
   });
};

function buildOptionDisplay(items) {
   for (var i = 0; i < items.length; i++) {

   }
}


//add listener to add keyword button
document.querySelector('.add-keyword').addEventListener('click', () => {
   var individualWords = document.querySelector('.individual-words').innerHTML;
   var newRow = document.createElement('div');
   newRow.innerHTML = individualWords;
   newRow.classList.add('individual-words');
   document.querySelector('.keyword-row').appendChild(newRow);
})

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', buildSaveArray);