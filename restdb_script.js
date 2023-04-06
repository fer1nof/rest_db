var data = null;
let results = document.getElementById('results');
let hide_list = document.getElementById('hide');
let hide_modal = document.getElementById('myModal');
let product;
let bask_total = 0;
let db_arrray =[];

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    product = JSON.parse(xhr.response);
    console.log(this.response);
    console.log(typeof product);
  }
  ProductsList()
});

xhr.open("GET", "https://ferin-9145.restdb.io/rest/product");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "64149d84bc22d22cf7b26011");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.send(data);

function ProductsList(){ 
  for (let i = 0; i < product.length; i++){
      let offers = `
      <div class="cont_item" id="cont_item">
      <b id="prod_name${i}" class="name">${product[i].name}</b>
      <img id="prod_img${i}" class="prods-img" src="${product[i].photo_url}">
      <p>
      <b id="prod_price${i}">Price: </b>${product[i].price}$ <br>
      <b id="prod_decrip${i}">Description: </b>${product[i].description}</p>
      <a href="#">Seller profile</a>
      <button class="prods-btn" onclick="btn(this)">Buy</button>
      </div>
      `;
      results.innerHTML += offers;
  }
}

function bask_btn() {
  hide_list.classList.toggle('hide');
  
}
function buy_all() {
  hide_modal.style.display = "block";
}

function btn(a) {
console.log(a);
  let elemID = parse(a.id);
  let nameID = document.getElementById(`prod_name${elemID}`).textContent;
  let priceID = parse(document.getElementById(`prod_price${elemID}`).textContent);
  let imgID = document.getElementById(`prod_img${elemID}`).src;
  imgSrc = `<img class="bask-img" src="${imgID}">`
 
  bask_total += priceID;

  let orderArray = {
    name: nameID,
    price: priceID,
    img: imgID
  };

  db_arrray.push(orderArray);

  console.log(db_arrray);

  function parse(obj){
    return(parseInt(obj.match(/\d+/)))
  }
}
/* <button id="buttonBuy${i}" data="${i}" onclick="addInBasket(this)">Buy</button>

function addInBasket(odj){           
    let objId = ghjk(odj.id);}

function ghjk(obj){
    return(parseInt(obj.match(/\d+/)))
}
let priceObj = ghjk(document.getElementById(Price${objId}).textContent);
    let nameObj = document.getElementById(ProductTitle${objId}).textContent;
    let imgObj = document.getElementById(imgOut${objId}).src;
    imgComplet = <img class="imgBasket" src="${imgObj}">;

    priceBasket += priceObj;
    
    

    let databaseObj = {
      price : priceObj,
      name: nameObj,
      img: imgObj
    } ; */