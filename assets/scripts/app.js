class Product {
	// title = "DEFAULT";
	// imageUrl;
	// description;
	// price;

	constructor(title, image, desc, price) {
		this.title = title;
		this.imageUrl = image;
		this.description = desc;
		this.price = price;
	}
}

class ProductItem {
	constructor(product) {
		this.product = product;
	}

	render() {
		const prodEl = document.createElement("li");
			prodEl.className = "product-item";
			prodEl.innerHTML = `
				<div>
					<img src="${this.product.imageUrl}" alt="${this.product.title}">
					<div class="product-item__content">
						<h2>${this.product.title}</h2>
						<h3>\$${this.product.price}</h3>
						<p>${this.product.description}</p>
						<button>Add to Cart</button>
					</div>
				</div>
			`;
		return prodEl;
	}
}

class ProductList {
	products = [
		new Product("A Pillow", "https://imgs.search.brave.com/emwM74thqCauE0n4EshcBiHJnq1_ZNXl3F043gWID_8/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/cGFjaWZpY2NvYXN0/LmNvbS9vbi9kZW1h/bmR3YXJlLnN0YXRp/Yy8tL1NpdGVzLXBj/Zi1tYXN0ZXItY2F0/YWxvZy9kZWZhdWx0/L2R3NjE0MTU2Nzcv/aW1hZ2VzL1BpbGxv/d3MvcGFjaWZpYy1j/b2FzdC1sdXh1cnkt/ZG93bi1maXJtLXBp/bGxvdy0yNjQ3Ni03/Ny5qcGc", "A nice carpet!", 39.99),
		new Product("A Carpet", "https://imgs.search.brave.com/Yae0XrGoqQz3DuWbH_5nUW57jX2P451RHe3d4NhMOuQ/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC43/NW1iWDk1aDhOa1Zx/czBFc3VCZUtnSGFI/YSZwaWQ9QXBp", "A soft pillow!", 19.99),
	];

	constructor() {}

	render() {
		const renderHook = document.getElementById("app");
		const prodList = document.createElement("ul");
		prodList.className = "product-list";
		for (const prod of this.products) {
			const productItem = new ProductItem(prod);
			const prodEl = productItem.render();
			prodList.append(prodEl);
		}
		renderHook.append(prodList);
	}
}

// console.log(new Product())
// const pList = {
// 	products: [
// 		{ 
// 			title: "A Pillow", 
// 			imageUrl: "https://imgs.search.brave.com/emwM74thqCauE0n4EshcBiHJnq1_ZNXl3F043gWID_8/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/cGFjaWZpY2NvYXN0/LmNvbS9vbi9kZW1h/bmR3YXJlLnN0YXRp/Yy8tL1NpdGVzLXBj/Zi1tYXN0ZXItY2F0/YWxvZy9kZWZhdWx0/L2R3NjE0MTU2Nzcv/aW1hZ2VzL1BpbGxv/d3MvcGFjaWZpYy1j/b2FzdC1sdXh1cnkt/ZG93bi1maXJtLXBp/bGxvdy0yNjQ3Ni03/Ny5qcGc", 
// 			price: 19.99, 
// 			description: "A soft pillow!" 
// 		}
// 	],
// 	render() {
// 		const renderHook = document.getElementById("app");
// 		const prodList = document.createElement("ul");
// 		prodList.className = "product-list";
// 		for (const prod of this.products) {
// 			const prodEl = document.createElement("li");
// 			prodEl.className = "product-item";
// 			prodEl.innerHTML = `
// 				<div>
// 					<img src="${prod.imageUrl}" alt="${prod.title}">
// 					<div class="product-item__content">
// 						<h2>${prod.title}</h2>
// 						<h3>\$${prod.price}</h3>
// 						<p>${prod.description}</p>
// 						<button>Add to Cart</button>
// 					</div>
// 				</div>
// 			`
// 			prodList.append(prodEl);
// 		}
// 		renderHook.append(prodList);
// 	}
// }

const productList = new ProductList();
productList.render()