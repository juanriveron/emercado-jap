const ORDER_ASC_BY_COST = "costo asc";
const ORDER_DESC_BY_COST = "costo desc";
const ORDER_BY_PROD_COUNT = "Popularidad";
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
let currentProductsArray=[]

function sortproducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    return result;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentproductsArray = productsArray;
    }

    currentproductssArray = sortproducts(currentSortCriteria, currentproductsArray);

    //Muestro los productos ordenadas
    showProductsArray();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray=resultObj.data;
          /* Muestro categorias ordenadas */
          sortAndShowProducts(currentProductsArray)
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        ShowProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        ShowProducts();
    });
});
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
/* document.addEventListener("DOMContentLoaded", function (e) {

}); */

function showProductsArray(){
    let htmlContentToAppend="";
    for(let i=0; i<currentProductsArray.length; i++){
        let product= currentProductsArray[i];
        
        htmlContentToAppend+=`
        <div class="card" style="width: 18rem;">
            <img src="` + product.imgSrc + `" class="card-img-top">
            <div class="card-body">
                <h4 class="card-title">`+ product.name +`</h4>
                <p>`+product.currency +" "+ product.cost + `</p>
                <p class="card-text">` + product.description + `</p>
                <small class="text-muted">` + product.soldCount + ` vendidos</small>
                <a href="product-info.html" class="card-link">Ver</a>
            </div>
        </div>
         `
            document.getElementById("product_list").innerHTML=htmlContentToAppend;
    }
}
