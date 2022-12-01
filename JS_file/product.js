"use strict";

const list_product = localStorage.getItem("products")
const list_product_toObject = JSON.parse(list_product)

let all_li_tag = '';
for (let i = 0; i < list_product_toObject.length; i++) {
    let add_li =
        `<li class="box-sp">
        <img src="${list_product_toObject[i].image}" alt='product'>
        <h3 class="prodName">Product Name: ${list_product_toObject[i].title}</h3>
        <p>Mô tả: ${list_product_toObject[i].description}</p>
        <div>Price:<span class="price">${list_product_toObject[i].price}₫</span></div>
        <a href="./prod_detail.html#${list_product_toObject[i].id}" target="_blank"><button>Xem chi tiết</button></a>
        <button class='deleteBtn' productId=${list_product_toObject[i].id}>Delete product</button>
    </li>`
    all_li_tag += '\n' + add_li;
}

const ul_new = document.querySelector("ul").innerHTML = all_li_tag

const deleteBtns = document.querySelectorAll(".deleteBtn")
for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", (event) => {
        // windows confirm 
        let text = "Bạn có chắc chắn muốn xóa sản phẩm này không?\nNhấn OK or Hủy.";
        if (confirm(text) == true) {
            list_product_toObject.splice(i, 1);
        }
        localStorage.setItem("products", JSON.stringify(list_product_toObject));
        // reload lại trang
        location.reload();
        return false;
    })
}





