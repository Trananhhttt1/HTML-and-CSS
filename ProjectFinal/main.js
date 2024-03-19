const content = document.querySelector(".content");
const btn_users = document.querySelector(".header__user");
const btn_product = document.querySelector(".header__product");
const btn_createUser = document.querySelector(".createUser");
const btn_createProduct = document.querySelector(".createProduct");
const content_formCreateUser = document.querySelector(
  ".content_formCreateUser"
);
const content_formCreateProduct = document.querySelector(
  ".content_formCreateProduct"
);
const buttonCancelProduct = document.querySelector(".buttonCancelProduct");
const buttonCancelUser = document.querySelector(".buttonCancelUser");
const detailModalDiv = document.querySelector(".detailModalDiv");

//API:
const usersAPI = "https://65f445aff54db27bc0213fbe.mockapi.io/users";
const productsAPI = "https://65f445aff54db27bc0213fbe.mockapi.io/products";
// api users

const getAllUsers = async () => {
  let res = await fetch(usersAPI);
  return res.json();
};
const getAllProducts = async () => {
  let res = await fetch(productsAPI);
  return res.json();
};

const starts = () => {
  content.innerHTML = `<h1 class="content_title">Hello</h1>`;
};
starts();

const showUserCard = (user) => {
  return `<div class = "content__card content__card__${user.id}">
      <h2 class = "card__title">User ID: ${user.id}</h2>
      <hr/>
      <img class = "card__image" src="${user.avatar}" alt="">
      <p>Name: ${user.userName}</p>
      <p>Age: ${user.age}</p>
      <p>Job: ${user.job}</p>
      <div class='actions'>
        <button onclick="openUserDetailModal(
          ${user.id}
        )">View Detail</button>
        <button onclick="handleEditUser(${user.id})">Edit</button>
        <button onclick="handleDeleteDataUser(${user.id})">Delete</button>
      </div>
  </div>`;
};
const showProductCard = (product) => {
  return `<div class = "content__card content__card__${product.id}">
      <h2 class = "card__title">Product ID: ${product.id}</h2>
      <hr/>
      <img class = "card__image" src="${product.image}" alt="">
      <p>Product Name: ${product.productName}</p>
      <p>Price: ${product.price}$</p>
      <p>Quantity: ${product.quantity}</p>
      <div class='actions'>
        <button onclick="openProductDetailModal(
          ${product.id})
        ">View Detail</button>
        <button onclick="handleEditProduct(${product.id})">Edit</button>
        <button onclick="handleDeleteDataProduct(${product.id})">Delete</button>
      </div>
  </div>`;
};

const displayUserList = async () => {
  if (!btn_createUser.classList.contains("createUserBlock")) {
    btn_createUser.classList.add("createUserBlock");
    btn_createProduct.classList.remove("createProductBlock");
  }
  if ((content_formCreateProduct.style.display = "block")) {
    content_formCreateProduct.style.display = "none";
  }
  content.innerHTML = `<h1 class="loading"><span class="loader"></span>Loading...</h1>`;
  let dataUserList = await getAllUsers();
  if (dataUserList.length > 0) {
    content.innerHTML = `
    <div class='user-list'>
        ${dataUserList.map((user, index) => showUserCard(user)).join("")}
    </div>
  `;
  } else {
    content.innerHTML = "<h1>No USer</h1>";
  }
};

const displayProductList = async () => {
  if (!btn_createProduct.classList.contains("createProductBlock")) {
    btn_createProduct.classList.add("createProductBlock");
    btn_createUser.classList.remove("createUserBlock");
  }
  if ((content_formCreateUser.style.display = "block")) {
    content_formCreateUser.style.display = "none";
  }
  content.innerHTML = `<h1 class="loading"><span class="loader"></span>Loading...</h1>`;
  let dataProductList = await getAllProducts();
  if (dataProductList.length > 0) {
    content.innerHTML = `
    <div class='product-list'>
        ${dataProductList
          .map((product, index) => showProductCard(product))
          .join("")}
    </div>
  `;
  } else {
    content.innerHTML = "<h1>No Product</h1>";
  }
};

//creat data:
async function postDataUser(data) {
  let option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(usersAPI, option);
  return response.json();
}

function handleCreateFormUser() {
  let userName = document.querySelector("#userName").value;
  let age = document.querySelector("#userAge").value;
  let adress = document.querySelector("#userAdress").value;
  let email = document.querySelector("#userEmail").value;
  let phoneNumber = document.querySelector("#UserPhone").value;
  let avatar = document.querySelector("#userAvt").value;
  let job = document.querySelector("#userJob").value;

  let data = {
    userName,
    age,
    adress,
    email,
    phoneNumber,
    avatar,
    job,
  };
  postDataUser(data).then(() => {
    displayUserList();
    cancelUserForm();
    document.querySelector("#userName").value = null;
    document.querySelector("#userAge").value = null;
    document.querySelector("#userAdress").value = null;
    document.querySelector("#userEmail").value = null;
    document.querySelector("#UserPhone").value = null;
    document.querySelector("#userAvt").value = null;
    document.querySelector("#userJob").value = null;
  });
}

async function postDataProduct(data) {
  let option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(productsAPI, option);
  return response.json();
}

function handleCreatFormProduct() {
  let productName = document.querySelector("#productName").value;
  let image = document.querySelector("#imageProduct").value;
  let price = document.querySelector("#priceProduct").value;
  let quantity = document.querySelector("#quantityProduct").value;
  let shopName = document.querySelector("#shopName").value;

  let data = { productName, image, price, quantity, shopName };
  postDataProduct(data).then(() => {
    displayProductList();
    cancelProductForm();
    document.querySelector("#productName").value = null;
    document.querySelector("#imageProduct").value = null;
    document.querySelector("#priceProduct").value = null;
    document.querySelector("#quantityProduct").value = null;
    document.querySelector("#shopName").value = null;
  });
}

//delete data
function handleDeleteDataProduct(id) {
  let option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(productsAPI + "/" + id, option)
    .then((response) => {
      response.json();
    })
    .then(() => {
      let contentCard = document.querySelector(".content__card__" + id);
      if (contentCard) {
        contentCard.remove();
      }
    });
}

function handleDeleteDataUser(id) {
  let option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(usersAPI + "/" + id, option)
    .then((response) => {
      response.json();
    })
    .then(() => {
      let contentCard = document.querySelector(".content__card__" + id);
      if (contentCard) {
        contentCard.remove();
      }
    });
}

//open and close formData
function displayCreateUser() {
  if (content_formCreateUser.style.display === "block") {
    content_formCreateUser.style.display = "none";
  } else {
    content_formCreateUser.style.display = "block";
  }
}

function displayCreateProduct() {
  if (content_formCreateProduct.style.display === "block") {
    content_formCreateProduct.style.display = "none";
  } else {
    content_formCreateProduct.style.display = "block";
  }
}

function cancelUserForm() {
  content_formCreateUser.style.display = "none";
}

function cancelProductForm() {
  content_formCreateProduct.style.display = "none";
}

//detail model:
const getProductById = async (productId) => {
  const res = await fetch(productsAPI + "/" + productId);
  return res.json();
};

const openProductDetailModal = async (productId) => {
  detailModalDiv.style.display = "block";
  detailModalDiv.innerHTML = "<h2>Loading Detail...</h2>";

  const productDetail = await getProductById(productId);

  console.log({ productDetail });
  detailModalDiv.innerHTML = `
      <div class='product-detail'>
          <div class="product__detail__image">
          <img class='detail__image' src='${productDetail.image}' />
          </div>
          <div class="product__detail__inf">
          <p>Product ID: ${productDetail.id}</p>
          <p>Product Name: ${productDetail.productName}</p>
          <p>Product Price: ${productDetail.price}$</p>
          <p>Product Quantity: ${productDetail.quantity}</p>
          <p>Shop: ${productDetail.shopName}</p>
          <button onclick='closeDetailModal()'>CLOSE</button>
          </div>
      </div>
  `;
};

const getUserById = async (userId) => {
  const res = await fetch(usersAPI + "/" + userId);
  return res.json();
};
const openUserDetailModal = async (userId) => {
  detailModalDiv.style.display = "block";
  detailModalDiv.innerHTML = "<h2>Loading Detail...</h2>";

  const userDetail = await getUserById(userId);

  console.log({ userDetail });
  detailModalDiv.innerHTML = `
      <div class='product-detail'>
          <div class="product__detail__image">
          <img class='detail__image' src='${userDetail.avatar}' />
          </div>
          <div class="product__detail__inf">
          <p>User ID: ${userDetail.id}</p>
          <p>Age: ${userDetail.age}</p>
          <p>Job: ${userDetail.job}</p>
          <p>Address: ${userDetail.adress}</p>
          <p>Email: ${userDetail.email}</p>
          <p>Phone Number: ${userDetail.phoneNumber}</p>
          <button onclick='closeDetailModal()'>CLOSE</button>
          </div>
      </div>
  `;
};

function closeDetailModal() {
  detailModalDiv.style.display = "none";
}

//edit

function handleEditUser(id) {
  document.querySelector(".content_formEditUser").style.display = "block";
  fetch(usersAPI + "/" + id)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      document.getElementById("formGroupUser").innerHTML = `
      <div  class="formGroup">
      <label for="userName">User Name</label>
      <input
        type="text"
        name=""
        value="${data.userName}"
        id="userNameEdit"
      /><br />
      <label for="userAge">Age</label>
      <input
        type="number"
        id="userAgeEdit"
        value="${data.age}"
      /><br />
      <label for="userAdress">Adress</label>
      <input
        type="text"
        name=""
        id="userAdressEdit"
        value="${data.adress}"
      /><br />
      <label for="userEmail">Email</label>
      <input
        type="text"
        name=""
        id="userEmailEdit"
        value="${data.email}"
      /><br />
      <label for="UserPhone">PhoneNumber</label>
      <input
        type="number"
        name=""
        id="userPhoneEdit"
        value="${data.phoneNumber}"
      /><br />
      <label for="userAvt">Avatar</label>
      <input
        type="text"
        name=""
        id="userAvtEdit"
        value="${data.avatar}"
      /><br />
      <label for="userJob">Job</label>
      <input
        type="text"
        name=""
        id="userJobEdit"
        value="${data.job}"
      /><br />
      </div>
            <div class="buttonForm">
              <input
                type="button"
                class="buttonPutUser"
                id=""
                value="Edit User"
                onclick="updateFormUser(${data.id})"
              />
              <input
                type="button"
                class="buttonCancelPutUser"
                id=""
                value="Cancel"
                onclick="cancelPutForm()"
              />
            </div>
      `;
    });
}

async function pustDataUser(data, id) {
  let option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(usersAPI + "/" + id, option);
  return response.json();
}

async function updateFormUser(id) {
  console.log(123);

  let userName = document.getElementById("userNameEdit").value;
  let age = document.getElementById("userAgeEdit").value;
  let adress = document.getElementById("userAdressEdit").value;
  let email = document.getElementById("userEmailEdit").value;
  let phoneNumber = document.getElementById("userPhoneEdit").value;
  let avatar = document.getElementById("userAvtEdit").value;
  let job = document.getElementById("userJobEdit").value;

  let data = {
    userName,
    age,
    adress,
    email,
    phoneNumber,
    avatar,
    job,
  };
  await pustDataUser(data, id).then(() => {
    displayUserList();
    document.querySelector(".content_formEditUser").style.display = "none";
  });
}

function handleEditProduct(id) {
  document.querySelector(".content_formEditProduct").style.display = "block";
  fetch(productsAPI + "/" + id)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      document.getElementById("formGroupProduct").innerHTML = `
      <div class="formGroup">
              <label for="productNameEdit">Product Name</label>
              <input
                type="text"
                name=""
                id="productNameEdit"
                value="${data.productName}"
              /><br />
              <label for="imageProduct">Image Product</label>
              <input
                type="text"
                id="imageProductEdit"
                value="${data.image}"
              /><br />
              <label for="priceProductEdit">Price Product</label>
              <input
                type="number"
                name=""
                id="priceProductEdit"
                value="${data.price}"
              /><br />
              <label for="quantityProductEdit">Quantity</label>
              <input
                type="number"
                name=""
                id="quantityProductEdit"
                value="${data.quantity}"
              /><br />
              <label for="shopNameEdit">Shop Name</label>
              <input
                type="text"
                name=""
                id="shopNameEdit"
                value="${data.shopName}"
              />
            </div>
            <div class="buttonForm">
              <input
                type="button"
                class="buttonPutProduct"
                id=""
                value="Edit Product"
                onclick="updateFormProduct(${data.id})"
              />
              <input
                type="button"
                class="buttonCancelProduct"
                id=""
                value="Cancel"
                onclick="cancelPutFormProduct()"
              />
            </div>
      `;
    });
}

async function pustDataProduct(data, id) {
  let option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(productsAPI + "/" + id, option);
  return response.json();
}

async function updateFormProduct(id) {
  console.log(123);

  let productName = document.getElementById("productNameEdit").value;
  let image = document.getElementById("imageProductEdit").value;
  let price = document.getElementById("priceProductEdit").value;
  let quantity = document.getElementById("quantityProductEdit").value;
  let shopName = document.getElementById("shopNameEdit").value;

  let data = {
    productName,
    image,
    price,
    quantity,
    shopName,
  };
  await pustDataProduct(data, id).then(() => {
    displayProductList();
    document.querySelector(".content_formEditProduct").style.display = "none";
  });
}

function cancelPutFormUser() {
  document.querySelector(".content_formEditUser").style.display = "none";
}
function cancelPutFormProduct() {
  document.querySelector(".content_formEditProduct").style.display = "none";
}
