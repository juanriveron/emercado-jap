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
        //convierto moneda//
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

    //agrego costo de envio//
    let costoEnvio = document.querySelectorAll('input[type="radio"]');
    //agrego evento//
    document.querySelector('#envioTipo').addEventListener('change',()=>{

        // recorremos opciones ya que dentro hay una lista de nodos
        costoEnvio.forEach(opcion =>{
           
        //si la opcion recorrida esta seleccionada mostramos esa opcion
            if(opcion.checked){
                let costoEnvio2 = (opcion.value*total).toFixed(2);
                document.getElementById("comissionText").innerHTML=DOLLAR_SYMBOL+" "+ costoEnvio2;
                document.getElementById("totalCost").innerHTML=DOLLAR_SYMBOL+(parseFloat(total)+parseFloat(costoEnvio2));
            }
        })
    })
    
    document.getElementById("productTotalCost").innerHTML=DOLLAR_SYMBOL+" "+total;
}
/*
//validacion por bootstrap
(function () {
    'use strict';
    window.addEventListener('load',function(){
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.fliter.call(forms, function(form){
        form.addEventListener('submit', function (event) {
          if (form.checkValidity()===false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated')
        }, false);
      });
    }, false);
})();*/

function validarCampos1(){
    let direccionCalle = document.getElementById('calleEnvio');
    let direccionNumero = document.getElementById('numeroEnvio');
    let direccionEsquina = document.getElementById('esquinaEnvio');
    let direccionPais = document.getElementById('paisEnvio');
    let camposValidos = 0;

    let tipoEnvio = document.getElementsByName('envioTipo');
    let tipoEnvioValido = false;
    let tipoPago = document.getElementsByName('pagoTipo');
    let tipoPagoValido = false;
    
    for (let i = 0; i < tipoEnvio.length; i++) {
        if(tipoEnvio[i].checked){
            tipoEnvioValido = true;
        }    
    }

    for (let i = 0; i < tipoPago.length; i++) {
        if(tipoPago[i].checked){
            tipoPagoValido = true;
        }    
    }

    let campos=[direccionCalle.value, direccionNumero.value, direccionEsquina.value,direccionPais.value,tipoEnvioValido,tipoPagoValido];
    
    for(i=0; i<campos.length; i++){
        if(campos[i]!='' || campos[i]==true){
            camposValidos += 1; 
        }
    }
    if(camposValidos == campos.length){
        swal("Finalizado!", "Compra realizada con éxito!", "success");
        /* window.location.href="products.html"; */
    }else{
        swal("Debe completar todos los campos", "Revise los campos en rojo","warning");    }
}

