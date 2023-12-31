const allProducts = [];

function Product(name, src, views, clicks) {
  this.name = name;
  this.src = src;
  this.views = views;
  this.clicks = clicks;
  allProducts.push(this);
}

// LOCAL STORAGE FUNCTIONS
// if local storage doesnt exist then run product
function checkLocal() {
  const retrievedProduct = localStorage.getItem("Products");
  const productLS = JSON.parse(retrievedProduct);

  if (productLS === null) {
    new Product("Bag", "./images/bag.jpg", 0, 0);
    new Product("Banana", "./images/banana.jpg", 0, 0);
    new Product("Bathroom", "./images/bathroom.jpg", 0, 0);
    new Product("Boots", "./images/boots.jpg", 0, 0, "boots");
    new Product("Breakfast", "./images/breakfast.jpg", 0, 0);
    new Product("Bubblegum", "./images/bubblegum.jpg", 0, 0);
    new Product("Chair", "./images/chair.jpg", 0, 0);
    new Product("Cthulhu", "./images/cthulhu.jpg", 0, 0);
    new Product("Dog Duck", "./images/dog-duck.jpg", 0, 0);
    new Product("Dragon Meat", "./images/dragon.jpg", 0, 0);
    new Product("Pen", "./images/pen.jpg", 0, 0);
    new Product("Pet Sweep", "./images/pet-sweep.jpg", 0, 0);
    new Product("Scissors", "./images/scissors.jpg", 0, 0);
    new Product("Shark", "./images/shark.jpg", 0, 0);
    new Product("Sweep", "./images/sweep.png", 0, 0);
    new Product("Tauntaun", "./images/tauntaun.jpg", 0, 0);
    new Product("Unicorn", "./images/unicorn.jpg", 0, 0);
    new Product("Watering Can", "./images/water-can.jpg", 0, 0);
    new Product("Wine Glass", "./images/wine-glass.jpg", 0, 0);
  } else {
    // if local storage exists, do NOT run the product.
    for (let i = 0; i < productLS.length; i++) {
      new Product(
        productLS[i].name,
        productLS[i].src,
        productLS[i].views,
        productLS[i].clicks
      );
    }
  }
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

  // checking if the product index has been used before
  while (
    allProducts[product1Index].name === image1.alt ||
    allProducts[product1Index].name === image2.alt ||
    allProducts[product1Index].name === image3.alt
  ) {
    product1Index = getRandomIndex();
  }

  while (
    allProducts[product2Index].name === image1.alt ||
    allProducts[product2Index].name === image2.alt ||
    allProducts[product2Index].name === image3.alt
  ) {
    product2Index = getRandomIndex();
  }

  while (
    allProducts[product3Index].name === image1.alt ||
    allProducts[product3Index].name === image2.alt ||
    allProducts[product3Index].name === image3.alt
  ) {
    product3Index = getRandomIndex();
  }

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
      "You have answered 25/25 times. Data is being compiled. Please click for the Chart page to view."
    );
    sendProduct();
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

// Updating Results page via button
function revealResults() {
  for (i = 0; i < allProducts.length; i++) {
    let id = document.getElementById("results-list");
    let voteNum = document.createElement("li");
    voteNum.textContent = `${allProducts[i].name}: ${allProducts[i].views} views | ${allProducts[i].clicks} votes.`;
    id.appendChild(voteNum);
  }
}

// // Assigning the function to the button
let button = document.getElementById("button");
button.addEventListener("click", revealResults);

function sendProduct() {
  const stringifyProductLS = JSON.stringify(allProducts);
  localStorage.setItem("Products", stringifyProductLS);
}

checkLocal();
renderProducts();
