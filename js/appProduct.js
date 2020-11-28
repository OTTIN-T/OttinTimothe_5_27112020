//Appel API pour page produit
let getUrlProduct = window.location.href //Obtiens l'URL actuel
console.log("getUrlProduct", getUrlProduct)

const urlProduct = new URL(getUrlProduct) //Permet d'obtenir les objet de l'url  
console.log("urlProduct", urlProduct)

const search_params = urlProduct.search //On récupère .search de l'URL
console.log("search_params", search_params)

if(search_params) {
    const id = search_params
    console.log("id", id)

    fetch("http://localhost:3000/api/cameras" + id) //Rappel notre api + l'id de notre produit
    .then(result => result.json()) //Récupère le tableau json
    .then(cameras => { //Donne un nom au tableau json récupéré
    console.log("cameras", cameras)
        const $cameraProduct = document.querySelector('#camera-product')
        cameras.forEach(camera => { //Permet de sélectionner chaque élément du tableau et de nommer chaque élement
            const cameraId = "?id=" + camera._id  
            console.log("cameraId", cameraId)
            if(cameraId === id){ //Condition pour afficher l'élément avec le bon id
                console.log("camera._id", camera._id)
                $cameraProduct.innerHTML += 
                `<div id="camera-card" class="card col-lg-5 col-md-12 col-sm-12 col-12 mt-3 mb-3 border-dark shadow">
                    <a href="../html/produit.html?id=${camera._id}">
                        <div class="background-image-camera card-img-top" style="background-image: url(${camera.imageUrl})"></div>
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${camera.name}</h5>
                        <p class="card-text">${camera.description}</p> 
                        <div id="camera-lense"class="input-group col-12 mx-auto">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">Lentilles</label>
                            </div>
                            <select class="custom-select col-lg-6 col-md-6 col-sm-6 col-12" id="inputGroupSelect01">
                                <option selected value="1">${camera.lenses}</option>
                                <option value="2">${camera.lenses}</option>
                            </select>
                            <p id="camera-price" class="card-text col-lg-6 col-md-6 col-sm-6 col-12 mx-auto">${camera.price + " €"}</p>
                        </div>  
                        <a id="camera-buy"class="btn btn-secondary col-6 mx-auto mt-3" href="#" role="button">Ajouter au panier</a>
                    </div>   
                </div>`
                console.log("camera", camera)
            }
        console.log("camera", camera)   
        })  
    })        
    .catch((error) => {
        console.log(error);
    })
}
