//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var product = {};
var currentCommentsArray=[];


function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="`+ imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
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
    let finalDate = dateComment.getDate()+ "-" + (dateComment.getMonth() +1) + "-" + dateComment.getFullYear()+ " " + dateComment.getHours()+":"+dateComment.getMinutes()+":"+dateComment.getSeconds(); 

    newComment= {
        score: document.getElementById("score").value,
        description: document.getElementById("newComment").value,
        user: sessionStorage.getItem("ingrese_email"),
        dateTime: finalDate,
    }
    currentCommentsArray.push(newComment);
    showComment();
}
