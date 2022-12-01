"use strict";

const list_product = localStorage.getItem("products")
const list_product_toObject = JSON.parse(list_product)

const prodId = Number(location.hash.split('#')[1])

let innerText = '';
for (let i = 0; i < list_product_toObject.length; i++) {
    if (Number(list_product_toObject[i].id) === prodId) {
        innerText =
            `<img src="${list_product_toObject[i].image}" alt="IPhone 14 Pro Max">
        <div class="prodInfo">
            <div class="InfoDetail">
                <h3>Product Name: ${list_product_toObject[i].title}</h3>
                <div>Price:<span class="price">${list_product_toObject[i].price}₫</span></div>
                <div>Mo ta san pham: ${list_product_toObject[i].description}</div>
            </div>
            <div class="number_prod">
                <button class="plus">+</button>
                <div class="numProd">1</div>
                <button class="sub">-</button>
                <button class="addToCart" data-product-id="${list_product_toObject[i].id}">Thêm vào giỏ</button>
            </div>
        </div>`
        break;
    }
}

const productInfoNew = document.querySelector(".product").innerHTML = innerText

const plusEl = document.querySelector(".plus")
const subEl = document.querySelector(".sub")
const numberProd = document.querySelector(".numProd")

let countProd = Number(numberProd.textContent)

plusEl.addEventListener("click", (event) => {
    countProd += 1;
    numberProd.textContent = countProd;
})
subEl.addEventListener("click", (event) => {
    if (countProd === 1) return;
    countProd -= 1;
    numberProd.textContent = countProd;
})

const addToCartEl = document.querySelector(".addToCart")

addToCartEl.addEventListener("click", (event) => {
    alert("OK!")
    const deleteButton = event.target;
    const prodId = deleteButton.dataset.productId;
    const prodToCart = list_product_toObject.filter(({ id }) => {
        return id === prodId;
    });

    if (!localStorage.getItem("cart")) {
        prodToCart[0]['quantity'] = countProd
        localStorage.setItem("cart", JSON.stringify(prodToCart));
    } else {
        const oldProductsList = localStorage.getItem("cart");
        const existProductsList = JSON.parse(oldProductsList);
        let prodIsExisted = existProductsList.find((existProd) => {
            return existProd.id === prodId
        });

        if (!!prodIsExisted) {
            for (let existProd of existProductsList) {
                if (existProd.id === prodId) {
                    existProd.quantity = Number(existProd.quantity) + Number(countProd);
                }
            }
        } else {
            prodToCart[0]['quantity'] = countProd;
            existProductsList.push(prodToCart[0]);
        }
        localStorage.setItem("cart", JSON.stringify(existProductsList));
    }
});


