"use strict";

const formEl = document.querySelector("form");
const titleEl = document.querySelector("#title");
const imageEl = document.querySelector("#image");
const priceEl = document.querySelector("#price");
const descriptionEl = document.querySelector("#description");



function showError(inputName) {
    const messageErrorEl = document.querySelector("#" + inputName + " ~ .error-message");
    messageErrorEl.textContent = "Dữ liệu không hợp lệ!";
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    let formIsValid = true;
    const formData = [...new FormData(formEl)]
    console.log(formData)

    const { title, image, price, description } = Object.fromEntries(formData)

    if (titleEl.value.trim().length === 0) {
        showError('title')
        formIsValid = false;
    }
    if (imageEl.value.trim().length === 0) {
        showError('image')
        formIsValid = false;
    }
    if (priceEl.value.trim().length === 0) {
        showError('price')
        formIsValid = false;
    }

    if (descriptionEl.value.trim().length === 0) {
        showError('description')
        formIsValid = false;
    }

    if (formIsValid) {
        alert('Submit Done!!!')
        formEl.reset();
        const id = Date.now().toString().slice(-5)
        const newProduct = { title, image, price, description, id }
        console.log(newProduct)

        if (!localStorage.getItem("products")) {
            const productsList = [newProduct];
            localStorage.setItem("products", JSON.stringify(productsList));
        } else {
            const oldProductsList = localStorage.getItem("products");
            const existProductsList = JSON.parse(oldProductsList);
            existProductsList.push(newProduct);

            localStorage.setItem("products", JSON.stringify(existProductsList));
        }

    }

});
