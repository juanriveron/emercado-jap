//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
/* document.addEventListener("DOMContentLoaded", function (e) {

}); */
let currentProductsArray=[]

function showProductsArray(array){
    let htmlContentToAppend="";
    for(let i=0; i<currentProductsArray.length; i++){
        let product= array[i];

        htmlContentToAppend+=`
        <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <p>`+product.currency +" "+ product.cost + `</p>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                </div>
            </a>
            `
            document.getElementById("product_list").innerHTML=htmlContentToAppend;
    }
}
document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(PRODUCTS_URL).then(function(resultObj){
      if (resultObj.status === "ok"){
          currentProductsArray=resultObj.data;
          /* Muestro categorias ordenadas */
          showProductsArray(currentProductsArray)
      }
  });
});
