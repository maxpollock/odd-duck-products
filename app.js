// Product Array and Creating Product functions
const allProducts = [
  new Product("Bag", "./images/bag.jpg", "bag"),
  new Product("Banana", "./images/banana.jpg", "banana"),
  new Product("Bathroom", "./images/bathroom.jpg", "bathroom"),
  new Product("Boots", "./images/boots.jpg", "boots"),
  new Product("Breakfast", "./images/breakfast.jpg", "breakfast"),
  new Product("Bubblegum", "./images/bubblegum.jpg", "bubblegum"),
  new Product("Chair", "./images/chair.jpg", "chair"),
  new Product("Cthulhu", "./images/cthulhu.jpg", "cthulhu"),
  new Product("Dog Duck", "./images/dog-duck.jpg", "dogDuck"),
  new Product("Dragon Meat", "./images/dragon.jpg", "dragon"),
  new Product("Pen", "./images/pen.jpg", "pen"),
  new Product("Pet Sweep", "./images/pet-sweep.jpg", "petSweep"),
  new Product("Scissors", "./images/scissors.jpg", "scissors"),
  new Product("Shark", "./images/shark.jpg", "shark"),
  new Product("Sweep", "./images/sweep.png", "babySweep"),
  new Product("Tauntaun", "./images/tauntaun.jpg", "tauntaun"),
  new Product("Unicorn", "./images/unicorn.jpg", "unicorn"),
  new Product("Watering Can", "./images/water-can.jpg", "waterCan"),
  new Product("Wine Glass", "./images/wine-glass.jpg", "wineGlass"),
];

function Product(name, src, id) {
  this.name = name;
  this.src = src;
  this.id = id;
  this.views = 0;
  this.clicks = 0;
}

// Random Index Function
function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

// Using the DOM to select the img containers
let imgContainer = document.getElementById("img-container");
let image1 = document.getElementById("img1");
let image2 = document.getElementById("img2");
let image3 = document.getElementById("img3");

function renderProducts() {
  // Get 3 different index's for the products in the array
  let product1Index = getRandomIndex();
  let product2Index = getRandomIndex();
  let product3Index = getRandomIndex();

  // making sure they are not the same index
  while (
    product1Index === product2Index ||
    product1Index === product3Index ||
    product2Index === product3Index
  ) {
    product2Index = getRandomIndex();
    product3Index = getRandomIndex();
  }

  // changing the sources of the images so they update on each interaction
  image1.src = allProducts[product1Index].src;
  image2.src = allProducts[product2Index].src;
  image3.src = allProducts[product3Index].src;

  // Adding the alt name to our items for the click counter to work
  image1.alt = allProducts[product1Index].name;
  image2.alt = allProducts[product2Index].name;
  image3.alt = allProducts[product3Index].name;

  // adding views to the array
  allProducts[product1Index].views++;
  allProducts[product2Index].views++;
  allProducts[product3Index].views++;
}

// 25 clicks only
let userClicks = 0;
let maxClicks = 25;

function execClick(event) {
  if (userClicks >= maxClicks) {
    alert(
      "You have answered enough times. Please click 'Populate Results' to view the outcome of the survey."
    );
    return;
  } else {
    userClicks++;
  }

  let clickedProduct = event.target.alt;

  if (event.target === imgContainer) {
    alert("Uh oh! Please click on a product you support...");
  } else {
    renderProducts();
  }

  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].clicks++;
      break;
    }
  }
}

// click function for the container for imgs
imgContainer.addEventListener("click", execClick);
renderProducts();

// Auto update the total votes for a button
Product.prototype.updateVotes = function () {
  let id = document.getElementById(this.id);
  let voteNum = document.createElement("span");
  voteNum.textContent = ` ${this.views} views | ${this.clicks} votes.`;
  id.appendChild(voteNum);
};

function updateVotesButton() {
  for (i = 0; i < allProducts.length; i++) {
    allProducts[i].updateVotes();
  }
}

let button = document.getElementById("button");
button.addEventListener("click", updateVotesButton);
