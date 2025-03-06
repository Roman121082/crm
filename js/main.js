"use strict";

const data = [
  {
    productname: "Навигационная система Soundmax",
    category: "Настольные игры",
    unit: "шт",
    quantity: "5",
    price: "100",
  },
  {
    productname: "Навигационная система Soundmax",
    category: "Настольные игры",
    unit: "шт",
    quantity: "7",
    price: "120",
  },
  {
    productname: "Навигационная система Soundmax",
    category: "Настольные игры",
    unit: "шт",
    quantity: "4",
    price: "134",
  },
];

{
  const modalOverlay = document.querySelector(".modal-overlay");
  const modal = document.querySelector(".modal");
  const tableButton = document.querySelector(".table-button");
  const buttonModalClose = document.querySelector(".modal__close");

  const formPriceField = document.querySelector(".form__subtext");
  let quantity = document.querySelector("#quantity");
  let price = document.querySelector("#price");

  tableButton.addEventListener("click", () => {
    quantity = 0;
    price = 0;
    modalOverlay.classList.add("modal-overlay--activ");
  });

  quantity.addEventListener("change", (e) => {
    quantity = e.target.value;
    if (quantity > 0 && price > 0) {
      formPriceField.textContent = `$${price * quantity}`;
    }
  });
  price.addEventListener("change", (e) => {
    price = e.target.value;
    if (quantity > 0 && price > 0) {
      formPriceField.textContent = `$${price * quantity}`;
    }
  });

  modal.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  modalOverlay.addEventListener("click", (e) => {
    const target = e.target;
    if (target === modalOverlay || target.classList.contains("modal__close")) {
      modalOverlay.classList.remove("modal-overlay--activ");
    }
  });

  modal.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("modal__close")) {
      modalOverlay.classList.remove("modal-overlay--activ");
    }
  });

  // Добавление строки

  const createRow = ({ productname, category, unit, quantity, price }) => {
    const tr = document.createElement("tr");
    tr.classList.add("product__item");

    const tdID = document.createElement("td");
    const number = Math.floor(Math.random() * 1000000000 + 1);
    tdID.textContent = number;

    const tdName = document.createElement("td");
    tdName.textContent = productname;

    const tdCategory = document.createElement("td");
    tdCategory.textContent = category;

    const tdUnit = document.createElement("td");
    tdUnit.textContent = unit;

    const tdQuantity = document.createElement("td");
    tdQuantity.textContent = quantity;

    const tdPrice = document.createElement("td");
    tdPrice.textContent = `$${price}`;

    const tdTotalPrice = document.createElement("td");
    tdTotalPrice.classList.add("tdTotalPrice");
    tdTotalPrice.textContent = `$${quantity * price}`;

    const tdImg = document.createElement("td");
    tdImg.insertAdjacentHTML(
      "beforeend",
      `
  <td>
    <img class = "product-img" data-pic="images/kotyara.jpg" src="images/icon/picture-line.svg" alt="">
  </td>
  `
    );

    const tdEdit = document.createElement("td");
    tdEdit.insertAdjacentHTML(
      "beforeend",
      `
  <td>
    <img src="images/icon/icons-edit.svg" alt="">
  </td>
  `
    );

    const tdDel = document.createElement("td");
    tdDel.insertAdjacentHTML(
      "beforeend",
      `
  <td>
    <img class="delete" src="images/icon/delete-outlined.svg" alt="">
  </td>
  `
    );

    tr.append(
      tdID,
      tdName,
      tdCategory,
      tdUnit,
      tdQuantity,
      tdPrice,
      tdTotalPrice,
      tdImg,
      tdEdit,
      tdDel
    );

    return tr;
  };

  const renderProducts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const productBody = document.querySelector(".product__body");

  renderProducts(productBody, data);

  // Удалить элемент
  const delelem = productBody.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".delete")) {
      target.closest(".product__item").remove();
      renderPrice();
    }
  });

  //  ============== Добавление строки через форму начало================
  const addProductPage = (product__item, productBody) => {
    productBody.append(createRow(product__item));
  };

  const form = document.querySelector(".form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    addProductPage(newProduct, productBody);
    form.reset();
    modalOverlay.classList.remove("modal-overlay--activ");
    formPriceField.textContent = 0;
    renderPrice();
  });
  //  ============== Добавление строки через форму конец================

  //=========== Сортировка таблицы начало=============
  const table = document.querySelector(".product__table");

  table.onclick = function (e) {
    let th = e.target;
    sortTable(th.cellIndex, th.dataset.type);
  };

  function sortTable(colNum, type) {
    let tbody = table.querySelector("tbody");
    let rowsArray = Array.from(tbody.rows);
    let compare;
    switch (type) {
      case "number":
        compare = function (rowA, rowB) {
          return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
        };
        break;
      case "string":
        compare = function (rowA, rowB) {
          return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML
            ? 1
            : -1;
        };
        break;
    }

    rowsArray.sort(compare);
    tbody.append(...rowsArray);
  }
  //=========== Сортировка таблицы конец=============

  const formCheckbox = document.querySelector(".form__checkbox");
  const discount = document.querySelector('[name="discount"]');
  formCheckbox.onclick = () => {
    discount.toggleAttribute("disabled");
    discount.focus();
    if ((discount.setAttribute = "disabled")) {
      discount.value = "";
    }
  };

  const renderPrice = () => {
    const tdTotalPrice = document.querySelectorAll(".tdTotalPrice");
    let totalPrice = document.querySelector(".title__subtext");
    const arrPrice = [];

    tdTotalPrice.forEach((item) => {
      let numItem = Number(item.textContent.slice(1));
      arrPrice.push(numItem);
    });

    const sumPrice = arrPrice.reduce((acc, item) => {
      return acc + item;
    });

    totalPrice.textContent = sumPrice;
  };

  renderPrice();

  productBody.addEventListener("click", openImgProduct);

  function openImgProduct(e) {
    if (e.target.classList.contains("product-img")) {
      const productImg = document.querySelector(".product-img");
      const w = 500;
      const h = 500;
      const newWin = open(
        productImg.dataset.pic,
        "",
        `width=${w}, height=${h}, top=${(screen.height - h) / 2}, left=${
          (screen.width - w) / 2
        }, menubar=no,toolbar=no,scrollbars=no`
      );
    }
  }
}
