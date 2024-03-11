let labelUser = document.getElementById("labelUser");
let itemCards = document.querySelector(".itemCards");
let loading = document.querySelector(".loading");

function show_item_user(item, index) {
  return `
  <div class = "itemCard" >
  <p style="color:blue">ID : ${item.id}</p>
  <p>Name : ${item.name}</p>
  <p>Email : ${item.email}</p>
  <p>Address : ${item.address.street}</p>
  <p>UserName : ${item.username}</p>
  <p>Phone : ${item.phone}</p>
  <div >
  <button class="button" style="background-color:red">Show Detail</button>
  </div>
  </div>`;
}
function show_item_photo(item) {
  return `
  <div class = "itemCard">
    <p style="color:blue"> ID: ${item.id}</>
    <p>AlbumID: ${item.albumId}</p>
    <p>Title: ${item.title}</p>
    <img src="${item.thumbnailUrl}" alt="Anh mau" style = "width: 100px; height: 100px";}>
    <div >
      <button class="button" style="background-color:red">Show Detail</button>
    </div>
  </div>
  `;
}
function show_item_album(item) {
  return `
  <div class = "itemCard">
    <p style="color:blue"> ID: ${item.id}</>
    <p>UserID: ${item.userId}</p>
    <p>Title: ${item.title}</p>
    <div >
      <button class="button" style="background-color:red">Show Detail</button>
    </div>
  </div>
  `;
}
function show_item_post(item, index) {
  return `
  <div class = "itemCard"  >
    <p style="color:blue"> ID: ${item.id}</>
    <p>UserID: ${item.userId}</p>
    <p>Title: ${item.title}</p>
    <p>Body: ${item.body}</p>
    <div >
      <button class="button" style="background-color:red">Show Detail</button>
    </div>
  </div>
  `;
}
function show_item_comment(item) {
  return `
  <div class = "itemCard" >
    <p style="color:blue"> ID: ${item.id}</>
    <p>PostID: ${item.postId}</p>
    <p>Name: ${item.name}</p>
    <p>Email: ${item.email}</p>
    <p>Body: ${item.body}</p>
    <div >
      <button class="button" style="background-color:red">Show Detail</button>
    </div>
  </div>
  `;
}

function show_item_todo(item) {
  return `
  <div class = "itemCard" >
    <p style="color:blue"> ID: ${item.id}</>
    <p>UserID: ${item.userId}</p>
    <p>Title: ${item.title}</p>
    <p>Completed: ${item.completed}</p>
    <div >
      <button class="button" style="background-color:red">Show Detail</button>
    </div>
  </div>
  `;
}

function getData(name, callback) {
  loading.style.display = "block";
  fetch("https://jsonplaceholder.typicode.com/" + name).then((response) =>
    response
      .json()
      .then((data) => {
        loading.style.display = "none";
        let contentUser = data.map((item, index) => {
          if (item.id < 7) {
            return callback(item, index);
          }
        });
        itemCards.innerHTML = contentUser.join("");
      })
      .catch((err) => {
        itemCards.innerHTML = "Khong the lay du lieu";
      })
  );
}

function hanldleUsers() {
  getData("users", show_item_user);
}

function hanldlePhotos() {
  getData("photos", show_item_photo);
}
function hanldleAblbum() {
  getData("albums", show_item_album);
}
function hanldlePost() {
  getData("posts", show_item_post);
}
function hanldleComment() {
  getData("comments", show_item_comment);
}
function hanldleTodo() {
  getData("todos", show_item_todo);
}

// let btnCreate = document.querySelector(".create");
// let formadd = document.querySelector(".formadd");
// let btnAdd = document.querySelector(".add");
// let formNhap = document.querySelector(".formNhap");
// btnCreate.onclick = () => {
//   if (formadd.style.display === "none") {
//     formadd.style.display = "block";
//   } else if (formadd.style.display === "block") {
//     formadd.style.display = "none";
//   }
// };

// btnAdd.onclick = () => {
//   if (formNhap.style.display === "none") {
//     formNhap.style.display = "block";
//     formadd.style.display = "none";
//   } else if (
//     formNhap.style.display === "block" &&
//     formadd.style.display === "none"
//   ) {
//     formNhap.style.display = "none";
//     formadd.style.display = "block";
//   }
// };
