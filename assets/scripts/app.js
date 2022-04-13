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

class ElementAttribute {
	constructor(attrName, attrValue) {
		this.name = attrName;
		this.value = attrValue;
	}
}
class Component {
	constructor(renderHookId, shouldRender = true) {
		this.hookId = renderHookId;
		if (shouldRender) {
			this.render();
		}
	}

	render() {}

	createRootElement(tag, cssClasses, attributes) {
		const rootElement = document.createElement(tag);
		if (cssClasses) {
			rootElement.className = cssClasses;
		}

		if (attributes && attributes.length > 0) {
			for (const attr of attributes) {
				rootElement.setAttribute(attr.name, attr.value);
			}
		}

		document.getElementById(this.hookId).append(rootElement);
		return rootElement;
	}
}

class ShoppingCart extends Component {
	items = [];

	set cartItems(value) {
		this.items = value;
		this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
	}

	get totalAmount() {
		const sum = this.items.reduce((prevValue, curItem) => prevValue + curItem.price, 0);
		return sum;
	};

	constructor(renderHookId) {
		super(renderHookId, false);
		this.orderProducts = () => {
			console.log("Ordering...");
			console.log(this.items);
		};
		this.render();
	}

	addProduct(product) {
		const updatedItems = [...this.items];
		updatedItems.push(product);
		this.cartItems = updatedItems;
	}


	render() {
		const cartEl = this.createRootElement("section", "cart");
		cartEl.innerHTML = `
			<h2>Total: \$${0}</h2>
			<button>Order Now!</button>
		`;
		const orderButton = cartEl.querySelector("button");
		// one approach
		// orderButton.addEventListener("click", () => this.orderProducts());
		orderButton.addEventListener("click", this.orderProducts);
		this.totalOutput = cartEl.querySelector("h2");
	}
}

class ProductItem  extends Component {
	constructor(product, renderHookId) {
		super(renderHookId, false);
		this.product = product;
		this.render();
	}

	addToCart() {
		App.addProductToCart(this.product);
	}

	render() {
		const prodEl = this.createRootElement("li", "product-item");
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
		const addCartButton = prodEl.querySelector("button");
		addCartButton.addEventListener("click", this.addToCart.bind(this));
	}
}

class ProductList extends Component {
	#products = [];

	constructor(renderHookId) {
		super(renderHookId, false);
		this.render();
		this.fetchProducts();
	}
	
	fetchProducts() {
		this.#products = [
			new Product("A Carpet", "https://imgs.search.brave.com/Yae0XrGoqQz3DuWbH_5nUW57jX2P451RHe3d4NhMOuQ/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC43/NW1iWDk1aDhOa1Zx/czBFc3VCZUtnSGFI/YSZwaWQ9QXBp", "A nice carpet!", 39.99),
			new Product("A Pillow", "https://imgs.search.brave.com/emwM74thqCauE0n4EshcBiHJnq1_ZNXl3F043gWID_8/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/cGFjaWZpY2NvYXN0/LmNvbS9vbi9kZW1h/bmR3YXJlLnN0YXRp/Yy8tL1NpdGVzLXBj/Zi1tYXN0ZXItY2F0/YWxvZy9kZWZhdWx0/L2R3NjE0MTU2Nzcv/aW1hZ2VzL1BpbGxv/d3MvcGFjaWZpYy1j/b2FzdC1sdXh1cnkt/ZG93bi1maXJtLXBp/bGxvdy0yNjQ3Ni03/Ny5qcGc", "A soft pillow!", 19.99),
		]
		this.renderProducts();
	}

	renderProducts() {
		for (const prod of this.#products) {
			new ProductItem(prod, "prod-list");
		}
		
	}
	
	render() {
		this.createRootElement("ul", "product-list", [new ElementAttribute("id", "prod-list")]);
		if (this.#products && this.#products.length > 0) {
			this.renderProducts();
		}
	}
}

class Shop extends Component {
	constructor() {
		super();
	}

	render() {
		this.cart = new ShoppingCart("app");
		new ProductList("app");
	}
}

class App {
	static cart;

	static init() {
		const shop = new Shop();
		this.cart = shop.cart;
	}

	static addProductToCart(product) {
		this.cart.addProduct(product);
	}
}

App.init();

