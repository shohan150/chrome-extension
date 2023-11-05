//get product name
var namePathFirst = document.querySelector('.name #first');
var namePathSecond = document.querySelector('.name #second');
var nameBtn = document.getElementById('nameBtn').onclick = () => {
   const namePath = {
      name: 'productName',
      firstPath: namePathFirst.value,
      secondPath: namePathSecond.value
   };
   chrome.storage.local.set({ [namePath.name]: namePath });
}

//get product price
var pricePathFirst = document.querySelector('.price #first');
var pricePathSecond = document.querySelector('.price #second');
var priceBtn = document.getElementById('priceBtn').onclick = () => {
   const pricePath = {
      name: 'price',
      firstPath: pricePathFirst.value,
      secondPath: pricePathSecond.value
   };
   chrome.storage.local.set({ [pricePath.name]: pricePath });
}


//show already set path
chrome.storage.local.get(['productName', 'price'], function (result) {
   namePathFirst.value = result.productName.firstPath;
   namePathSecond.value = result.productName.secondPath;
   pricePathFirst.value = result.price.firstPath;
   pricePathSecond.value = result.price.secondPath;
});

