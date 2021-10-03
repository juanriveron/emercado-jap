//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var product = {};
var currentCommentsArray=[];

/* AGREGO CARRUSEL */
function showImagesGallery(array){

    let htmlContentToAppend = "";
    let indicators = "";
    /* primera imagen 'active' */
    htmlContentToAppend = `<div class="carousel-item active">
    <img class="d-block w-100" src="${array[0]}" alt="holis">
  </div>`;
  /* primer indicador 'active' */
    indicators = `<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>`;
  

    for(let i = 1; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        
        <div class="carousel-item">
                <img class="d-block w-100" src="`+ imageSrc + `" alt="">
            </div>
        `;
        indicators += `<li data-target="#carouselExampleIndicators" data-slide-to="`+ imageSrc + `"></li>`
    }
    document.getElementById("carrusel").innerHTML = htmlContentToAppend;
    document.getElementById("indicadores").innerHTML = indicators
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCountHTML.innerHTML = product.soldCount;
/*          productCategoryHTML.innerHTML = product.category;
            productImagesHTML.innerHTML = product.images; */

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultCom){
        if (resultCom.status === "ok"){
            currentCommentsArray = resultCom.data;
            showComment(currentCommentsArray)
        }
    });
});

/* lasEstrellas */
function showStars(score){
    let stars="";
    if (score==0){
        stars=` <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }else if (score==1){
        stars=`<span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }else if (score==2){
        stars=`<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }else if (score==3){
        stars=`<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }else if (score==4){
        stars=`<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>`
    }else{
        stars=`<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>`
    }
    return stars
}


function showComment(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentCommentsArray.length; i++){
        let comentario= currentCommentsArray[i];

        htmlContentToAppend+=`
        <a class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ comentario.user +`</h4>
                            <p>`+" "+ comentario.dateTime + `</p>
                        </div>
                        <p class="mb-1">` + comentario.description + `</p>
                        <div class="raiting">
                        <small class="text-muted">Puntaje: 
                        ` + showStars(comentario.score) + ` </small>
                        </div>
                        </div>
                </div>
            </a>
            `
            document.getElementById("comment_list").innerHTML=htmlContentToAppend;
/*             document.getElementById("insertarcomentario").reset(); */
        }
}

function saveComment(){
    var dateComment = new Date();
    let finalDate = dateComment.getFullYear()+ "-" + (dateComment.getMonth() +1)+ "-" + dateComment.getDate() + " " +  dateComment.getHours()+":"+dateComment.getMinutes()+":"+dateComment.getSeconds(); 

    newComment= {
        score: document.getElementById("score").value,
        description: document.getElementById("newComment").value,
        user: sessionStorage.getItem("ingrese_email"),
        dateTime: finalDate,
    }
    currentCommentsArray.push(newComment);
    showComment();
}
/* mostrar relacionados */
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj1){
        if (resultObj1.status === "ok"){
            infoProduct = resultObj1.data;
            getJSONData(PRODUCTS_URL).then(function(resultObj2){
                if(resultObj2.status=="ok"){
                    productos = resultObj2.data;
                    showRelated(infoProduct.relatedProducts);
                }
            }
        )}
    })
})

/* uso la misma variable que para los comentarios */
function showRelated(currentCommentsArray){
    let html = "";
    for(let i = 0; i < currentCommentsArray.length; i++){
        let related = currentCommentsArray[i];
        html += `<div>`+ productos[related].name + `</div>`
    }
    document.getElementById("productRelated").innerHTML = html;
}