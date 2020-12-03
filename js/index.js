//Script pour l'index
//On initialise nos variables
let camera;
let lenses;
let price;
let quantity;
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
    for( let i = 0; i < camera.lenses.length; i++){
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
        <a href="../html/product.html?id=${camera._id}">
            <div class="background-image-camera card-img-top" style="background-image: url(${camera.imageUrl})"></div>
        </a>
        <div class="card-body">
            <h5 class="card-title">${camera.name}</h5>
            <p class="card-text">${camera.description}</p> 
            <div class="col-12 mt-3">
                <a href="../html/product.html?id=${camera._id}">
                    <button type="button" id="camera-buy" class="add-to-cart btn btn-secondary col-6 mx-auto mt-1">Plus d'informations</button>
                </a>
            </div>               
        </div>   
    </div>`
} 