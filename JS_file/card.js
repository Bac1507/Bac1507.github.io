"use strict";

const list_product = localStorage.getItem("cart")
const list_product_toObject = JSON.parse(list_product)

const prodId = Number(location.hash.split('#')[1])

let all_li_tag = '';
for (let i = 0; i < list_product_toObject.length; i++) {
    let add_li =
        `<li class="product_in_cart">
            <div class="image_product">
                <img src="${list_product_toObject[i].image}"
                    alt="IPhone 14 Pro Max">
            </div>
            <div class="prodInfo">
                <h3>Product Name: ${list_product_toObject[i].title}</h3>
                <div>Price:<span class="price">${list_product_toObject[i].price}</span></div>
                <div class="quantity">Số lượng: ${list_product_toObject[i].quantity}</div>
            </div>
            <div class="delete">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </li >`
    all_li_tag += '\n' + add_li;
}
const ul_new = document.querySelector(".list_product").innerHTML = all_li_tag

let allProdToPay = '';
let total = 0;
let count = 0;
for (let i = 0; i < list_product_toObject.length; i++) {
    let price = Number(list_product_toObject[i].price) * Number(list_product_toObject[i].quantity)
    count = count + Number(list_product_toObject[i].quantity)
    let add_prod =
        `<li class="bill">
            <div>${list_product_toObject[i].title} (SL: ${list_product_toObject[i].quantity})</div>
            <div>${price}</div>
        </li>`
    allProdToPay += '\n' + add_prod;
    total = total + price;
    console.log(total)
}

let total_box = `<div><b>Tổng:</b></div>
            <div>${total}</div>`

const billBox = document.querySelector(".bills").innerHTML = allProdToPay

const totalBox = document.querySelector(".total").innerHTML = total_box

// Xoa san pham khoi gio hang 

const deleteBtn = document.querySelectorAll(".delete")

for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", () => {
        // windows confirm 
        let text = "Bạn có chắc chắn muốn xóa sản phẩm này không?\nNhấn OK or Hủy.";
        if (confirm(text) == true) {
            list_product_toObject.splice(i, 1);
        }
        localStorage.setItem("cart", JSON.stringify(list_product_toObject));
        // reload lại trang
        location.reload();
        return false;
    })
}

// badge

const countBadge = document.querySelector(".w3-badge").innerHTML = count
console.log(countBadge)


