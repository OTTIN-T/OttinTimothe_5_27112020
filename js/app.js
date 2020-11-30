//Script pour l'index
//On initialise nos variables
let camera;
let lenses;
let $cameraList;

//Appel de notre API
fetch("http://localhost:3000/api/cameras")
.then(result => {
    result.json()
    .then(result => {
        $cameraList = document.querySelector('#camera-list')
        result.forEach(result => {
            camera = result //Result deviens camera
            //Appel de nos functions
            lenseList()
            cameraCard()
        })    
    }) 
        
})
.catch(error => {
    console.log(error);
})

//Fonction pour le tableau lenses
const lenseList = () => {
    lenses = document.createElement("select") 
    for( let i = 0; i<camera.lenses.length; i++){
        const option = document.createElement("option")
        option.setAttribute("value", camera.lenses[i])                
        option.innerHTML = camera.lenses[i]
        lenses.appendChild(option)
    }
}

//Notre template camera card
const cameraCard = () => {
    $cameraList.innerHTML += 
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
                <select class="custom-select col-lg-4 col-md-4 col-sm-4 col-12" id="inputGroupSelect01">
                    <option selected value="1">Sélectionner</option>
                    ${lenses.innerHTML}
                </select>
                <label class="col-3 camera-quantity-selector" for="camera-quantity">Quantité: 
                    <select id="quantity" name="camera-quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </label>
                <p id="camera-price" class="card-text col-lg-3 col-md-3 col-sm-3 col-12 mx-auto">${camera.price + " €"}</p>
            </div>
            <div class="col-12 mt-3">
                <button type="button" onclick="addToBasket()" id="camera-buy" class="add-to-cart btn btn-secondary col-6 mx-auto mt-1">Ajouter au panier</button>
            </div>               
        </div>   
    </div>`
} 
// <a id="camera-buy" class="btn btn-secondary col-6 mx-auto mt-3" href="#" role="button">Ajouter au panier</a>
//Fonction pour le localStorage
const addToBasket = () => {
    const quantity = document.querySelector('#quantity').value
    let storage = window.localStorage.getItem("orinocoCamera")
    if(!storage){
        storage = {
            panier: [],
        }
    } else{
        storage = JSON.parse(storage)
    }
    storage.panier.push({
        _id: camera._id,
        lenses: lenses.value,
        price : camera.price,
        imageUrl: camera.imageUrl,
        quantity: quantity
    })
    window.localStorage.setItem("orinocoCamera", JSON.stringify(storage))
    alert('Votre objet est bien ajouté au panier')
}