'use strict';


var prodArray = [];

var imgOne = document.getElementById('image-one');
var imgTwo = document.getElementById('image-two');
var imgThree = document.getElementById('image-three');

var clicksActual = 0;
var clicksMax = 25;

//constructor
function Product(name, src) {
  this.viewed = 0;
  this.clicked = 0;
  this.src = src;
  this.name = name;

  prodArray.push(this);
}

//Creating products
new Product('bag', './img/bag.jpg');
new Product('bannana', './img/banana.jpg');
new Product('bathroom', './img/bathroom.jpg');
new Product('boots', './img/boots.jpg');
new Product('breakfast', './img/breakfast.jpg');
new Product('bubblegum', './img/bubblegum.jpg');
new Product('chair', './img/chair.jpg');
new Product('cthulu', './img/cthulhu.jpg');
new Product('dog-duck', './img/dog-duck.jpg');
new Product('dragon', './img/dog-duck.jpg');
new Product('pen', './img/pen.jpg');
new Product('pet-sweep', './img/pet-sweep.jpg');
new Product('scissors', './img/scissors.jpg');
new Product('shark', './img/shark.jpg');
new Product('sweep', './img/sweep.png');
new Product('tuantaun', './img/tauntaun.jpg');
new Product('unicorn', './img/unicorn.jpg');
new Product('usb', './img/usb.gif');
new Product('water can', './img/water-can.jpg');
new Product('wine-glass', './img/wine-glass.jpg');

function renderProduct() {
  var imgOneRand = prodArray[ranNum(prodArray.length)];
  console.log(imgOneRand);
  var imgTwoRand = prodArray[ranNum(prodArray.length)];
  var imgThreeRand = prodArray[ranNum(prodArray.length)];


  while (imgOneRand === imgTwoRand || imgOneRand === imgThreeRand || imgTwoRand === imgThreeRand) {
    imgTwoRand = prodArray[ranNum(prodArray.length)];
    imgThreeRand = prodArray[ranNum(prodArray.length)];

  }
  imgOne.src = imgOneRand.src;
  imgTwo.src = imgTwoRand.src;
  imgThree.src = imgThreeRand.src;

  imgOne.alt = imgOneRand.name;
  imgTwo.alt = imgTwoRand.name;
  imgThree.alt = imgThreeRand.name;

  for (var i = 0; i < prodArray.length; i++) {
    if (imgOne.alt === prodArray[i].name || imgTwo.alt === prodArray[i].name || imgThree.alt === prodArray[i].name) {
      prodArray[i].viewed++;
    }
  }

}

renderProduct();

function ranNum(max) {
  return Math.floor(Math.random() * max);
}

imgOne.addEventListener('click', eventHandler);
imgTwo.addEventListener('click', eventHandler);
imgThree.addEventListener('click', eventHandler);

function eventHandler(e) {
  clicksActual++;
  //console.log('check-1');
  if (clicksActual <= clicksMax) {
    for (var i = 0; i < prodArray.length; i++) {
      // console.log(e.target.alt);
      if (prodArray[i].name === e.target.alt) {
        prodArray[i].clicked++;
        //console.log('check 3');
        renderProduct();
      }
    }
  } else if (clicksActual >= clicksMax) {
    imgThree.removeEventListener('click',eventHandler);
    imgTwo.removeEventListener('click',eventHandler);
    imgOne.removeEventListener('click',eventHandler);
    renderResults();
  }

}

function renderResults() {
  var results = document.getElementById('results');
  var resultList = document.createElement('ul');

  for (var i = 0; i < prodArray.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = `${prodArray[i].name}  Appeared: ${prodArray[i].viewed} Clicked ${prodArray[i].clicked}`;
    resultList.append(listItem);
  }
  results.append(resultList);
}
console.log(prodArray);


