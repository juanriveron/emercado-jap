//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let productCost = 0;
let cartProducts=[]
let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD";
let PESO_SYMBOL = "UYU";
var num= undefined

function getCart(url){
    return fetch(url).then(resultObj=>{
        return resultObj.json();
    })
}

document.addEventListener("DOMContentLoaded", function(e){
    getCart("https://japdevdep.github.io/ecommerce-api/cart/654.json").then((function(resultObj){
        cartProducts = resultObj.articles;
        showCart();
    }))
})

function showCart(){
    let htmlContentToAppend = "";

    let i=0;

    for(let article of cartProducts){
        if(article.currency==PESO_SYMBOL){
            article.unitCost = article.unitCost/40
            article.currency = DOLLAR_SYMBOL
        }

        htmlContentToAppend+= `
        
        <img class="img-fluid" src="`+ article.src+`" width="50px" >
        <div class="col" id="productName" >`+ article.name +`</div>
        <div class="col" id="productCost" >`+ article.currency+` `+article.unitCost+`</div>
        <input type="number" class="col" id="`+i+`" value="`+article.count+`" min="0" onchange="updateSubtotal(this.value,`+article.unitCost+`,`+i+`,'`+article.currency+`')">
          <div class="invalid-feedback">
            La cantidad es requerida.
          </div>
      <div class="col" id="subtotal${i}" >`+article.currency+` `+ article.count*article.unitCost +`</div>
      <div class="w-100"></div> 
      `
      
      i++
    }
    updateTotal();
    document.getElementById("renglon").innerHTML=htmlContentToAppend;  
}

function updateSubtotal(count,unitCost,i,currency){
    let num=count*unitCost;
    document.getElementById("subtotal"+i).innerHTML=currency+" "+num;
    cartProducts[i].count=count;
/*     console.log(cartProducts[i]); */
    updateTotal();
}

function updateTotal(){
    let total = 0;
    for(let article of cartProducts){
        total+=article.count*article.unitCost;
    }
    document.getElementById("productTotalCost").innerHTML=DOLLAR_SYMBOL+" "+total;
    document.getElementById("totalCost").innerHTML=DOLLAR_SYMBOL+total;
}

