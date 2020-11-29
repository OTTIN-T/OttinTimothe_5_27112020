//Appel API pour page produit
//Appel URL
let getUrlProduct = window.location.href //Obtiens l'URL actuel
const urlProduct = new URL(getUrlProduct) //Permet d'obtenir les objet de l'url  
const search_params = urlProduct.search //On récupère .search de l'URL

//Appel de notre API
if(search_params) {
    const id = search_params
    fetch("http://localhost:3000/api/cameras" + id) //Rappel notre api + l'id de notre produit
    .then(result => result.json()) //Récupère le tableau json
    .then(cameras => { //Donne un nom au tableau json récupéré
        const $cameraProduct = document.querySelector('#camera-product')
        cameras.forEach(camera => { //Permet de sélectionner chaque élément du tableau et de nommer chaque élement
            const cameraId = "?id=" + camera._id  
            if(cameraId === id){ //Condition pour afficher l'élément avec le bon id

                //Mise en place liste déroulante pour les lentilles
                const lenses = document.createElement("select")
                let i = 0
                for( i; i<camera.lenses.length; i++){
                    const option = document.createElement("option")
                    option.setAttribute("value", camera.lenses[i])                
                    option.innerHTML = camera.lenses[i]
                    lenses.appendChild(option)
                }           
                $cameraProduct.innerHTML += 
                `<div id="camera-card" class="card col-10 mx-auto mt-3 mb-3 border-dark shadow">
                    <div class="background-image-product card-img-top" style="background-image: url(${camera.imageUrl})"></div>
                    <div class="card-body">
                        <h5 class="card-title">${camera.name}</h5>
                        <p class="card-text">${camera.description}</p> 
                        <div id="camera-lense"class="input-group col-12 mx-auto">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">Lentilles</label>
                            </div>
                            <select class="custom-select col-lg-6 col-md-6 col-sm-6 col-12" id="inputGroupSelect01">    
                                <option selected selected value="1">Sélectionner</option>  
                                ${lenses.innerHTML}
                            </select>
                            <p id="camera-price" class="card-text col-lg-6 col-md-6 col-sm-6 col-12 mx-auto">${camera.price + " €"}</p>
                        </div>  
                        <a id="camera-buy"class="btn btn-secondary col-6 mx-auto mt-3" href="#" role="button">Ajouter au panier</a>
                    </div>   
                </div>`
            } 
        })  
    })        
    .catch((error) => {
        console.log(error);
    })
}

