
fetch("http://kea-alt-del.dk/t5/api/productlist").then((response) => response.json())
.then((data) => {
	
	populateProductList(data);
})
.catch((error) => {
	
	console.error('Error:', error);
});


function populateProductList(data) {

	
	let loader = document.getElementById('loader');
	loader.parentNode.removeChild(loader);

	
	for (let item of data) {
		
		let productsContainer = document.getElementById('products-container-' + item.category);

		
		let itemContainer = constructItemContainer(item);
		productsContainer.appendChild(itemContainer);
	}
}



function constructItemContainer(item) {

	
	let productCard = document.createElement("DIV");
	productCard.classList.add("product-card");

	
	if (item.soldOut) {
		let soldoutBanner = document.createElement("text");
		soldoutBanner.innerText = "SOLD OUT!";
		soldoutBanner.style = "position: absolute; top: 50%; padding: 5px; text-align: center; width: 100%; background-color: red;"
		productCard.appendChild(soldoutBanner);
	};

	
	let header = document.createElement("p");
	header.innerHTML = item.name;
	productCard.appendChild(header);

	
	let image = document.createElement("img");
	console.log(item.image)
	
	image.src = "https://kea-alt-del.dk/t5/site/imgs/small/" + item.image + "-sm.jpg"
	productCard.appendChild(image);

	
	let description = document.createElement("p");
	description.innerHTML = item.shortdescription;
	productCard.appendChild(description);

	
	let longDescription = document.createElement("p");
	longDescription.innerHTML = "For more info click the button below";
	longDescription.classList.add("long-description");
	productCard.appendChild(longDescription);


	
	let priceWrapper = document.createElement("span");

	let price = document.createElement("text");
	price.innerText = "Price: ";
	priceWrapper.appendChild(price);

	let priceValue = document.createElement("text");
	priceValue.innerText = item.price + "dkk";
	priceWrapper.appendChild(priceValue);

	
	if (item.discount > 0) {
		let discount = document.createElement("text");
		discount.innerText = " " + (item.price - item.discount) + "dkk";
		priceWrapper.appendChild(discount);
		priceValue.style = "text-decoration: line-through;";
	};
	
	productCard.appendChild(priceWrapper);


	
	if (item.vegetarian) {
		let vegetarian = document.createElement("img");
		vegetarian.src = "http://life-of-dan.com/images/vegetarian_logo.png";
		vegetarian.style = "height: 30px; width: 30px;"
		productCard.appendChild(vegetarian);
	};

	productCard.appendChild(document.createElement("br"))


	
	let button = document.createElement("button");
	button.classList.add("more-info-btn");
    button.innerText = "> More info";
	productCard.appendChild(button);
    

	
	button.addEventListener("click", (event) => {
		
		let self = event.target;
		let longDesc = self.parentNode.getElementsByClassName("long-description")[0];

		
		longDesc.classList.toggle("expanded");
		if (longDesc.classList.contains("expanded")) {
			self.innerText = "Less info";
		} else {
			self.innerText = "More info";		
		};

		
		if (!item.longDescription) {
			fetch("http://kea-alt-del.dk/t5/api/product?id=" + item.id).then((response) => response.json())
			.then((data) => {
				
				item.longDescription = data.longdescription;
				
				if (data.longdescription) {
					longDesc.innerHTML = item.longDescription;
				} else {
					longDesc.innerHTML = "No further description";
				}
			})
			.catch((error) => {
			  console.error('Error:', error);
			});
		};
	})

	productCard.appendChild(document.createElement("br"));

	return productCard;
}