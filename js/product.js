//Page produit
//On initialise nos variables
let camera;
const $cameraProduct = document.querySelector('#camera-product')
const lenses = document.createElement("select");

//Appel URL
const params = (new URL(document.location)).searchParams;
const id = params.get('id'); //Obtiens l'id du produit



//Fonction pour le tableau lenses
const lenseList = () => {
    for( let i = 0; i<camera.lenses.length; i++){
        const option = document.createElement("option") //Créé notre liste option
        option.setAttribute("value", camera.lenses[i]) //Incrémente nos lenses à notre liste option               
        option.innerHTML = camera.lenses[i]
        lenses.appendChild(option)
    } 
}

//Notre template camera card
const cameraCard = () => {   
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
                <select class="custom-select col-lg-4 col-md-4 col-sm-4 col-12" id="inputGroupSelect01">
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
                <p id="camera-price" class="card-text col-lg-3 col-md-3 col-sm-3 col-12 mx-auto">${camera.price} €</p>
            </div>
            <div class="col-12 mt-3">
                <button type="button"  onclick="addToBasket()" id="camera-buy" class="add-to-products btn btn-secondary col-6 mx-auto mt-1">Ajouter au panier</button>
            </div>               
        </div>   
    </div>`
}

//Fonction pour le prix
const addToPrice = () => {
    const quantity = document.querySelector('#quantity')/*.value*/ //Récupère la valeur de la quantité
    const $cameraPrice = document.querySelector('#camera-price')
    console.log("$cameraPrice", $cameraPrice)
    camera.price = (camera.price * quantity)//Notre prix est calculé en fonction de notre quanttité
    console.log("camera.price", camera.price)  
    $cameraPrice.innerHTML = camera.price
}

//Fonction pour le localStorage
const addToBasket = () => {
    const quantity = document.querySelector('#quantity').value //Récupère la valeur de la quantité
    let storage = window.localStorage.getItem("orinocoCamera") //Créer notre stockage de panier
    if(!storage){
        storage = {
            products: [],
        }
    } else{
        storage = JSON.parse(storage) //On extrait notre json 
    }
    storage.products.push({
        name: camera.name,
        _id: camera._id,
        lenses: inputGroupSelect01.value,
        quantity: quantity,
        price : camera.price * quantity,
        imageUrl: camera.imageUrl,
    })
    window.localStorage.setItem("orinocoCamera", JSON.stringify(storage))
    alert('L\'article a bien été ajouté à votre panier')
}

//Appel de notre API
fetch("http://localhost:3000/api/cameras/" + id) //Rappel notre api + l'id de notre produit
.then(async result_ => {  //Récupère le tableau json 
    const result = await result_.json() //Donne un nom au tableau json récupéré
    camera = result //Result deviens camera
    //Appel de nos functions
    lenseList() 
    cameraCard()
})
.catch((error) => {
console.log(error);
})
