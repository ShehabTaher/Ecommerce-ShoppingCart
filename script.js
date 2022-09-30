// Shopping Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// open the cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// close the cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Making Function
function ready() {
  // Remove Items from Cart
  var removeCartButtons = document.getElementsByClassName("remove-cart");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //  Quantity Change
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //  Add Items to Cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  // Buy  Button Work
  document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyButtonClicked)
}

// Buy  Button
function buyButtonClicked(){
  alert("Your Order is Placed");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while(cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

// Remove Items from Cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

//  Quantity Changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

//  Add to Cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerHTML;
  var price = shopProducts.getElementsByClassName("price")[0].innerHTML;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
  
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerHTML == title) {
      alert("You have already add this item to cart");
      return;
    }
  }

  var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
                      <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                      </div>
                      <!-- Remove Cart -->
<i class='bx bxs-trash-alt remove-cart'></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName("remove-cart")[0].addEventListener("click", removeCartItem);
  cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}
// Update Total
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerHTML.replace("EP", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
    document.getElementsByClassName("total-price")[0].innerHTML = total + "EP";
  
}

// Like Product
var likedCarts = document.querySelectorAll(".btn");
for (const likedCart of likedCarts) {
likedCart.addEventListener("click", ()=>{
  if (likedCart.style.color == "red") {
    likedCart.style.color = "grey";
  }else{
    likedCart.style.color = "red"
  }})
}


// // Increment and decrement items
// const plus = document.querySelector(".plus"),
//     minus = document.querySelector(".minus"),
//     num = document.querySelector(".num");
//     let a = 1;
//     plus.addEventListener("click", ()=>{
//       a++;
//       a = (a < 10) ? "0" + a : a;
//       num.innerText = a;
//     });

//     minus.addEventListener("click", ()=>{
//       if(a > 1){
//         a--;
//         a = (a < 10) ? "0" + a : a;
//         num.innerText = a;
//       }
//     });
