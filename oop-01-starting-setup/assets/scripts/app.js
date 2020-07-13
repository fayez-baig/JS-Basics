class Product {
  // title = "DEFAULT";
  // imageUrl;
  // description;
  // price;

  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

const productList = {
  products: [
    new Product(
      "A Pillow",
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Pillows_on_a_hotel_bed.jpg",
      "A soft pillow!",
      19.99
    ),
    new Product(
      "A Pillow",
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Pillows_on_a_hotel_bed.jpg",
      "A soft pillow!",
      19.99
    ),
  ],
  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const prodEl = document.createElement("li");
      prodEl.className = "product-item";
      prodEl.innerHTML = `
      <div>
      <img src="${prod.imageUrl}" alt="${prod.title}" >
      <div class="product-item__content">
        <h2>${prod.title}</h2>
        <h3>\$${prod.price}</h3>
        <p>${prod.description}</p>
        <button>Add to Cart</button>
      </div>
    </div>
      `;
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  },
};

productList.render();
