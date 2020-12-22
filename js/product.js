//Page produit
//On initialise nos variables
let camera;
const $cameraProduct = document.querySelector('#camera-product')
const lenses = document.createElement("select");



//Appel URL
const params = (new URL(document.location)).searchParams;
const id = params.get('id'); //Obtiens l'id du produit

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

//Fonction pour le tableau lenses
const lenseList = () => {
    for (let i = 0; i < camera.lenses.length; i++) {
        const option = document.createElement("option") //Créé notre liste option
        option.setAttribute("value", camera.lenses[i]) //Incrémente nos lenses à notre liste option               
        option.innerHTML = camera.lenses[i]
        lenses.appendChild(option)
    }
}


//Notre template camera card
const cameraCard = () => {
    camera.price = parseFloat(camera.price) / 100 //Permet de supprimer les 0 inutiles des prix

    $cameraProduct.innerHTML +=
        (`<div id="camera-item" class="card col-10 mx-auto mt-5 mb-5 shadow">
        <div class="background-image-product card-img-top mx-auto" style="background-image: url(${camera.imageUrl})"></div>
        <div class="card-body">
            <h5 class="card-title">${camera.name}</h5>
            <p class="card-text">${camera.description}</p> 
            <div id="camera-lense"class="input-group col-12">
                <div class="input-group-prepend col-sm-4 col-12 d-none d-sm-block">
                    <label class="input-group-text" for="inputGroupSelect01">Lentilles</label>
                </div>
                <select class="custom-select col-sm-4 col-12" id="inputGroupSelect01">
                    ${lenses.innerHTML}
                </select>
                <label class="camera-quantity-selector col-sm-4 col-12 text-center " for="camera-quantity">Quantité: 
                    <select id="quantity" onclick="addToPrice()" class="text-center mx-auto" name="camera-quantity">
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
                <p id="camera-price" class="card-text col-sm-4 col-12 mx-auto mt-3"></p>
            </div>
            <div class="col-12 mt-3">
                <button type="button"  onclick="addToBasket()" id="camera-buy" class="add-to-products btn col-sm-6 col-12 mx-auto">Ajouter au panier</button>
            </div>               
        </div>   
    </div>`)
    addToPrice()
}

//Fonction pour changer le prix en fonction de la quantité
const addToPrice = () => {
    let $cameraPrice = document.querySelector('#camera-price')
    let quantity = document.querySelector('#quantity').value
    $cameraPrice.innerHTML = (`${camera.price * quantity} €`)
}

//Fonction pour le localStorage
const addToBasket = () => {
    const quantity = document.querySelector('#quantity').value //Récupère la valeur de la quantité
    let storage = window.localStorage.getItem("orinocoCamera") //Créer notre stockage de panier
    if (!storage) {
        storage = {
            products: [],
        }
    } else {
        storage = JSON.parse(storage) //On extrait notre json 
    }
    storage.products.push({
        name: camera.name,
        _id: camera._id,
        lenses: inputGroupSelect01.value,
        quantity: quantity,
        price: camera.price * quantity,
        priceByItems: camera.price,
    })
    window.localStorage.setItem("orinocoCamera", JSON.stringify(storage))
    console.log("localStorage", storage.products)
    blurRemove()
    alert(`${quantity} appareil ${camera.name} lentille  ${inputGroupSelect01.value} ajouté à votre panier !`)
}

//Fonction pour supprimer le blur
const blurRemove = () => {
    const $blurRemove = document.querySelector('.basket')
    $blurRemove.classList.remove("inactive")
    $blurRemove.classList.add("active")
}