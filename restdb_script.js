let results = document.getElementById('results');
let hide_list = document.getElementById('bask_prods');
let hide_modal = document.getElementById('myModal');
let productArray = [];
let bask_array = [];
let url = 'https://ferin-9145.restdb.io/rest';
let total_price = document.getElementById('total_price');
let cont_modal_results = document.getElementById('cont_modal_results');

let xhr = new XMLHttpRequest();
xhr.withCredentials = false;



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    productArray = JSON.parse(xhr.response);
    console.log(this.response);
    console.log(typeof productArray);
    ProductsList();
  }
});

xhr.open("GET", url + "/product");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "64149d84bc22d22cf7b26011");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.send();

function ProductsList(){ 
  results.innerHTML = null;
  productArray.forEach(p => {
    productArray.push(p);
    let div_prods = document.createElement('div');
    div_prods.classList.add('cont_item');
    div_prods.innerHTML = `
      <b class="name">${p.name}</b>
      <img class="prods-img" src="${p.photo_url}">
      <p>
      <b>Price: <b>${Number(p.price)}</b>$</b> <br>
      <b>Description: </b>${p.description}</p>
      <a href="#">Seller profile</a>
      <button class="prods-btn" onclick="AddToBask(${p.id})">Buy</button>
    `;
    results.append(div_prods);
  })
  // for (let i = 0; i < productArray.length; i++){
  //     let offers = `
  //     <div class="cont_item" id="cont_item">
  //     <b id="prod_name${i}" data="${i}" class="name">${product[i].name}</b>
  //     <img id="prod_img${i}" class="prods-img" src="${product[i].photo_url}">
  //     <p>
  //     <b>Price: <b id="prod_price${i}">${product[i].price}</b>$</b> <br>
  //     <b id="prod_decrip${i}">Description: </b>${product[i].description}</p>
  //     <a href="#">Seller profile</a>
  //     <button id="prod_btn${i}" class="prods-btn" onclick="AddToBask(this)">Buy</button>
  //     </div>
  //     `;
  //     results.innerHTML += offers;
  // }
}

function bask_btn() {
  hide_list.classList.toggle('hide');
  
}

if(localStorage.getItem('productArray')) {
  productArray = JSON.parse(localStorage.getItem('productArray'));
  drawProdInBasket();
}

function AddToBask(id) {
  let product = productArray.find(function(p){
    return p.id == id;
  })
  // console.log(product);
  bask_array.push(product);
  drawProdInBasket();
  localStorage.setItem("bask_array", JSON.stringify(bask_array));

  document.getElementById('bask-btn').classList.add('active');
    setTimeout(function(){
        document.getElementById('bask-btn').classList.remove('active');
    },500);
  /*
  console.log(a);
  let elemID = parse(a.id);
  console.log(elemID);
  let nameID = document.getElementById(`prod_name${elemID}`).textContent;
  let priceID = Number(document.getElementById(`prod_price${elemID}`).textContent);
  let imgID = document.getElementById(`prod_img${elemID}`).src;
  imgSrc = `<img class="bask-img" src="${imgID}">`
 
  bask_total += priceID;

  let orderArray = {
    name: nameID,
    price: priceID,
    img: imgID
  };
  
  db_arrray.push(orderArray);

  drawProdInBasket();

  console.log(db_arrray);
  */
}
  function drawProdInBasket() {
    if(bask_array.length === 0) return hide_list.innerHTML = 'Cart is empty';
    hide_list.innerHTML = null;
    let bask_total = 0;
    bask_array.forEach(function(p){
      hide_list.innerHTML += `
        <p><img src="${p.photo_url}">${p.name} |${Number(p.price)}$</p>
        <hr>
      `;
      bask_total += Number(p.price);
    });
    hide_list.innerHTML += `
      <p>Total price: ${bask_total}$</p>
      <div class="btn_bask" id="btn_bask" onclick="buy_all()">Buy all</div>
    `;
  /*
   if(db_arrray.length === 0) return 
     bask_prods.innerHTML = '';
     bask_prods.innerHTML += `<div class="bask_push_prods">${imgSrc} ${nameID}| ${priceID}$</div>
       <hr>
    `;
     hide_list.innerHTML += `<div class="btn_bask" id="btn_bask" onclick="buy_all()">Buy all</div>`;
     t = false;else{
     bask_prods.innerHTML += `<div class="bask_push_prods">${imgSrc} ${nameID}| ${priceID}$</div>
       <hr>
     `;
   }
  */
  }
  // function cancel(){
  //   document.getElementById('btn_bask_cancelation').addEventListener('click', function(){
  //     hide_list.innerHTML += '';
  //   })
  // }
  

function buy_all() {
  hide_modal.style.display = "block";
  drawProdInModalWindow();
}
function closeModalWindow() {
  hide_modal.style.display = "none";
  cont_modal_results.innerHTML = '';
  total_price.innerHTML = '';
}

function drawProdInModalWindow() {
  let total = 0;
  bask_array.forEach(function(p){
    cont_modal_results.innerHTML += `
      <div class="modal_results"><img src="${p.photo_url}"><br><b>${p.name} |${Number(p.price)}$</b></div>
    `;
    total += Number(p.price);
  });
  total_price.innerHTML += `
    ${total}$
  `;
}
document.getElementById("input_form").addEventListener('submit', function(e){
  e.preventDefault();
  console.log('1');
  let data = JSON.stringify({
    "name": e.target['name'].value,
    "adress": e.target['adress'].value,
    "phone": e.target['ph_number'].value,
    "post_number": e.target['post_number'].value,
    "status": "New",
    "product": localStorage.getItem('bask_array')
  });
  // console.log(data);
  
  let qwe = new XMLHttpRequest();
  qwe.withCredentials = false;
  qwe.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  qwe.open("POST", url + "/order");
  qwe.setRequestHeader("content-type", "application/json");
  qwe.setRequestHeader("x-apikey", "64149d84bc22d22cf7b26011");
  qwe.setRequestHeader("cache-control", "no-cache");
  qwe.send(data)

  hide_modal.style.display = "none";
  bask_array = [];
  hide_list.innerHTML = 'Cart is empty';
  localStorage.setItem("bask_array", '[]');
});