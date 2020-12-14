// YOUR NAME HERE

// === constants ===
const MAX_QTY = 9;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";

// === global variables  ===
// the total cost of selected products 
var total = 0;



// function called when page is loaded, it performs initializations 
var init = function () {
	createShop();
	

	
	// TODO : add other initializations to achieve if you think it is required
}
window.addEventListener("load", init);
window.addEventListener("load", addToCartFunc);



// usefull functions

/*
* create and add all the div.produit elements to the div#boutique element
* according to the product objects that exist in 'catalog' variable
*/
var createShop = function () {
	var shop = document.getElementById("boutique");
	for(var i = 0; i < catalog.length; i++) {
		shop.appendChild(createProduct(catalog[i], i));
		
	}
}

/*
* create the div.produit elment corresponding to the given product
* The created element receives the id "index-product" where index is replaced by param's value
* @param product (product object) = the product for which the element is created
* @param index (int) = the index of the product in catalog, used to set the id of the created element
*/
var createProduct = function (product, index) {
	// build the div element for product
	var block = document.createElement("div");
	block.className = "produit";
	// set the id for this product
	block.id = index + "-" + productIdKey;
	// build the h4 part of 'block'
	block.appendChild(createBlock("h4", product.name));

	
	// /!\ should add the figure of the product... does not work yet... /!\ 
	block.appendChild(createFigureBlock(product));

	// build and add the div.description part of 'block' 
	block.appendChild(createBlock("div", product.description, "description"));
	// build and add the div.price part of 'block'
	block.appendChild(createBlock("div", product.price, "prix"));
	// build and add control div block to product element
	block.appendChild(createOrderControlBlock(index));
	return block;
}


/* return a new element of tag 'tag' with content 'content' and class 'cssClass'
 * @param tag (string) = the type of the created element (example : "p")
 * @param content (string) = the html wontent of the created element (example : "bla bla")
 * @param cssClass (string) (optional) = the value of the 'class' attribute for the created element
 */
var createBlock = function (tag, content, cssClass) {
	var element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className =  cssClass;
	}
	element.innerHTML = content;
	return element;
}

/*
* builds the control element (div.controle) for a product
* @param index = the index of the considered product
*
* TODO : add the event handling, 
*   /!\  in this version button and input do nothing  /!\  
*/
var createOrderControlBlock = function (index) {
	var control = document.createElement("div");
	control.className = "controle";

	// create input quantity element
	var input = document.createElement("input");
	input.id = index + '-' + inputIdKey;
	input.type = "number";
	input.step = "1";
	input.value = "0";
	input.min = "0";
	input.max = MAX_QTY.toString();
	// add input to control as its child
	control.appendChild(input);
	
	// create order button
	var button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-" + orderIdKey;
	button.setAttribute('index',index);
	// add control to control as its child
	control.appendChild(button);
	
	// the built control div node is returned
	return control;
}


/*
* create and return the figure block for this product
* see the static version of the project to know what the <figure> should be
* @param product (product object) = the product for which the figure block is created
*
* TODO : write the correct code
*/
var createFigureBlock = function (product) {
	// this is absolutely not the correct answer !
	// TODO 
	 return createBlock("figure", "<img src=" + product.image +">");
	
}


// The function that handls all add to cart operations
function addToCartFunc(){
	// select All the elements with 'commander class'
	var addButton = document.getElementsByClassName('commander')
	for (var i = 0 ; i < addButton.length; i++) {
		addButton[i].addEventListener('click' , addProductToCard , false ) ; 
	 }
	 // Get all the data from product added to card
	function addProductToCard(event){
		var button = event.target ;
		var productSelected = button.parentElement.parentElement ;
		var title = productSelected.getElementsByTagName('h4')[0].innerText ;
		var price = productSelected.getElementsByClassName('prix')[0].innerText;
		var imageSrc = productSelected.getElementsByTagName('img')[0].src ;
		var quantity = productSelected.getElementsByTagName('input')[0].value ;
		console.log(title,price, imageSrc, quantity);
		createAddedProduct(title,price,imageSrc,quantity)  // Send all these data to the function that will set it
	};

	// the function that will build all the blocks for the product added
	function createAddedProduct(title,price,imageSrc,quantity){
		// build the div element for product
		var card = document.createElement("div");
		card.className = "achat";

		// set the id for this product
		card.id = title+'-achat';		

		// /!\ should add the figure of the product... does not work yet... /!\ 
		card.appendChild(createBlock("figure", "<img src=" + imageSrc +">"));


		// build the h4 part of 'block'
		card.appendChild(createBlock("h4", title));
		// build the quantity block
		card.appendChild(createBlock("div", quantity ,'quantite'));
		// build the price block
		card.appendChild(createBlock("div", price ,'prix'));

		// create the controle element
		var controle = document.createElement("div");
		card.appendChild(controle);
		var button1 = document.createElement("button");
		button1.className='retirer';
		button1.id=title + '-remove';
		controle.appendChild(button1);

		// Get the parent div which have the 'achats ' class
		var achatsElem = document.getElementsByClassName('achats')[0]
		// Append the block to the parent element 
		achatsElem.appendChild(card);
	}
	

}

