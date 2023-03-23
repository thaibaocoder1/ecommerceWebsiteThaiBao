// Cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");
cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});
closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
// Functions
function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // Add item to cart
  var addCart = document.getElementById("add-to-cart");
  addCart.addEventListener("click", addCartClicked);
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}
function buyButtonClicked() {
  alert("Your order is placed");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}
function removeCartItem(e) {
  var buttonClicked = e.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}
function quantityChanged(e) {
  var input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}
function addCartClicked() {
  var title = document.getElementsByClassName("name")[0].innerText;
  var price = document.getElementsByClassName("price")[0].innerText;
  var productImg = document.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemNames.length; ++i) {
    if (cartItemNames[i].innerText == title) {
      alert("You have already add this item to cart");
      return;
    }
  }
  var cartBoxContent = `
                          <img src="${productImg}" alt="" class="cart-img">
                              <div class="detail-box">
                                  <div class="cart-product-title">${title}</div>
                                  <div class="cart-price">${price}</div>
                                    <div>
                                    <input type="number" name="" id="" class="cart-quantity" value="1">
                                    <select name="" id="">
                                      <option value="">Select Size</option>
                                      <option value="">XXL</option>
                                      <option value="">XL</option>
                                      <option value="">Large</option>
                                      <option value="">Medium</option>
                                      <option value="">Small</option>
                                  </select>
                                  </div>
                              </div>
                              <i class="fa-solid fa-trash cart-remove"></i>
                              `;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElemnt = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElemnt.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-prices")[0].innerText = "$" + total;
}
// Changed click on images
var productImg = document.getElementById("productImg");
var smallImg = document.getElementsByClassName("small-img");
smallImg[0].onmouseover = function () {
  productImg.src = smallImg[0].src;
};
smallImg[1].onmouseover = function () {
  productImg.src = smallImg[1].src;
};
smallImg[2].onmouseover = function () {
  productImg.src = smallImg[2].src;
};
smallImg[3].onmouseover = function () {
  productImg.src = smallImg[3].src;
};
// Rated
const starsUL = document.querySelector(".stars");
const output = document.querySelector(".output");
const stars = document.querySelectorAll(".star");
stars.forEach((star, index) => {
  star.starValue = index + 1;
  star.addEventListener("click", starRate);
});
function starRate(e) {
  output.innerHTML = `You rated this ${e.target.starValue} stars`;
  stars.forEach((star, index) => {
    if (index < e.target.starValue) {
      star.classList.add("orange");
    } else {
      star.classList.remove("orange");
    }
  });
}
