'use strict';


var prodArray = [];
var clickArray = [];
var namesArray = [];
var viewedArray = [];
var randIndex = [];

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
new Product('cthulhu', './img/cthulhu.jpg');
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

function randIndexGen() {
  while (randIndex.length > 3) {
    randIndex.pop();
  }
  while (randIndex.length < 6) {
    var randInd = ranNum(prodArray.length);
    while (randIndex.includes(randInd)) {
      randInd = ranNum(prodArray.length);
    }
    randIndex.unshift(randInd);
  }
}

function renderProduct() {
  randIndexGen();
  var imgOneRand = prodArray[randIndex[0]];
  console.log(randIndex);
  var imgTwoRand = prodArray[randIndex[1]];
  var imgThreeRand = prodArray[randIndex[2]];

  imgOne.src = imgOneRand.src;
  imgTwo.src = imgTwoRand.src;
  imgThree.src = imgThreeRand.src;

  imgOne.alt = imgOneRand.name;
  imgTwo.alt = imgTwoRand.name;
  imgThree.alt = imgThreeRand.name;

  imgOneRand.viewed++;
  imgTwoRand.viewed++;
  imgThreeRand.viewed++;

}
renderProduct();

function ranNum(max) {
  return Math.floor(Math.random() * max);
}


function eventHandler(e) {
  clicksActual++;
  //console.log('check-1');
  if (clicksActual < clicksMax) {
    for (var i = 0; i < prodArray.length; i++) {
      // console.log(e.target.alt);
      if (prodArray[i].name === e.target.alt) {
        prodArray[i].clicked++;
        //console.log('check 3');
        renderProduct();
        break;
      }
    }
  } else if (clicksActual >= clicksMax) {
    imgThree.removeEventListener('click', eventHandler);
    imgTwo.removeEventListener('click', eventHandler);
    imgOne.removeEventListener('click', eventHandler);
    renderResults();
  }

}
imgOne.addEventListener('click', eventHandler);
imgTwo.addEventListener('click', eventHandler);
imgThree.addEventListener('click', eventHandler);

function renderResults() {
  var results = document.getElementById('results');
  var resultList = document.createElement('ul');

  for (var i = 0; i < prodArray.length; i++) {

    //adding data to arrays for chart
    clickArray.push(prodArray[i].clicked);
    viewedArray.push(prodArray[i].viewed);
    namesArray.push(prodArray[i].name);

    var listItem = document.createElement('li');
    listItem.textContent = `${prodArray[i].name}  Appeared: ${prodArray[i].viewed} Clicked ${prodArray[i].clicked}`;
    resultList.append(listItem);
  }
  results.append(resultList);
  console.log(clickArray,viewedArray,namesArray);
  chartSet();
}


function chartSet() {
  var chartObject = {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: 'Selected',
        data: clickArray,
        backgroundColor: [
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a',
          '#42f58a'
        ],
        hoverBackgroundColor: 'black',
        borderWidth: 1
      },
      {
        label: '# of Veiws',
        data: viewedArray,
        backgroundColor: [
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
          '#c842f5',
      
        ],
        hoverBackgroundColor: 'red',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      responsive: false,
    }
  };

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, chartObject); //eslint-disable-line
}