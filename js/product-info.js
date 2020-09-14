var product = {};
var comment = {};

//Función para mostrar las imágenes del producto
function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>

        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función para mostrar los productos relacionados
//Toma como parámetro el array que contiene los índices (en PRODUCT_INFO_URL)
//Para cada valor del array en PRODUCTS_URL, se muestran los datos generando el HTML y haciendo un append al elemento con id "relatedProducts"
function showRelatedProducts(array){

    let htmlContentToAppend = "";

    array.forEach(function(productIndex) {
        let relatedProduct = products[productIndex];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + relatedProduct.imgSrc + `" alt="">
                <h4 class="mb-1">`+ relatedProduct.name +`</h4>
                <p class="mb-1">` + relatedProduct.description + `</p>
            </div>
        </div>
        `

        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    });
}

//Función para mostrar los comentarios
function showComments(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let comment = array[i];
        let puntuacion = "";

        htmlContentToAppend += `
        <div class="well">
            <div class="commentContainer">
                <div class="usuario">Usuario: ${comment.user}</div>
                <div>Fecha: ${comment.dateTime}</div>
                <div class = "descripción">Descripción: ${comment.description}</div>
        `
        //For para mostrar la puntuación en estrellas
        for(let j = 0; j < comment.score; j++) {
            puntuacion += `<label class="puntuacionReal">★</label>`;
        }
        
        //For para mostrar las estrellas restantes (quedarán en negro) y completar las 5
        for(let k = comment.score; k < 5; k++) {
            puntuacion += `<label class="puntuacionVacia">★</label>`;
        }

        //Sumo la puntuación a la variable htmlContentToAppend de arriba
        htmlContentToAppend += `<div class = "commentPuntuacion">Puntuación: ${puntuacion}</div></div></div>`

        document.getElementById("comments").innerHTML = htmlContentToAppend;
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
            let productCountHTML = document.getElementById("soldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productPriceHTML = document.getElementById("productPrice");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productPriceHTML.innerHTML = product.currency + " " + product.cost;
            let relatedProductsIndexesArray = product.relatedProducts;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);

            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    products = resultObj.data;
        
                    //Muestro los productos relacionados pasando por parámetro el array que contiene los índices
                    showRelatedProducts(relatedProductsIndexesArray);
                }
            });
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comment = resultObj.data;

            //Muestro las imagenes en forma de galería
            showComments(comment);
        }
    });
});