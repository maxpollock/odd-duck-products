const button = document.getElementById("button");
const allProducts = [];

function Product(name, src, views, clicks) {
  this.name = name;
  this.src = src;
  this.views = views;
  this.clicks = clicks;
  allProducts.push(this);
}

function handleClick() {
  const productLS = JSON.parse(localStorage.getItem("Products"));

  for (let i = 0; i < productLS.length; i++) {
    new Product(
      productLS[i].name,
      productLS[i].src,
      productLS[i].views,
      productLS[i].clicks
    );
  }
  createChart();
}

function createChart() {
  const ctx = document.getElementById("myChart");
  let productVotes = [];
  let productNames = [];
  let productViews = [];

  for (let i = 0; i < allProducts.length; i++) {
    productVotes.push(allProducts[i].clicks);
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
  }

  const data = {
    labels: productNames,
    datasets: [
      {
        label: "Votes",
        type: "bar",
        data: productVotes,
        borderWidth: 3,
        backgroundColor: "red",
      },

      {
        label: "Views",
        type: "line",
        data: productViews,
        borderWidth: 3,
        backgroundColor: "green",
      },
    ],
  };

  new Chart(ctx, {
    data: data,
    options: {
      plugins: {
        autocolors: {
          mode: "label",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

button.addEventListener("click", handleClick);
