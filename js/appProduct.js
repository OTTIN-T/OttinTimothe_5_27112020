//Appel API pour page produit
//Appel URL
// let getUrlProduct = window.location.href //Obtiens l'URL actuel
// const urlProduct = new URLSearchParams(getUrlProduct) //Permet d'obtenir les objet de l'url  
// const search_params = urlProduct //On récupère .search de l'URL
// console.log("search_params", search_params)

const params = (new URL(document.location)).searchParams;
const id = params.get('id'); // la chaine de caractère "Jonathan Smith".


//Appel de notre API
let camera;
    fetch("http://localhost:3000/api/cameras/" + id) //Rappel notre api + l'id de notre produit
    .then(result => result.json()) //Récupère le tableau json
    .then(result => { //Donne un nom au tableau json récupéré
        camera = result
        const $cameraProduct = document.querySelector('#camera-product')
    
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
                        <div>
                            <label for="camera-quantity">Quantité: 
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
                                <button type="button" onclick="addToBasket()" class="add-to-cart btn btn-secondary mx-auto">Ajouter au panier</button>
                            </label>
                        </div>
                    </div>   
                </div>`
            } 
)  
       
    .catch((error) => {
        console.log(error);
    })


const addToBasket = () => {
    const quantity = document.querySelector('#quantity').value
    console.log("quantity", quantity)
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
    price : camera.price,
    imageUrl: camera.imageUrl,
    quantity: quantity
    })
    window.localStorage.setItem("orinocoCamera", JSON.stringify(storage))
    alert('Votre objet est bien ajouté au panier')
}