//Page index
//On initialise nos variables
let camera;
let $cameraList = document.querySelector('#camera-list');

//Appel de notre API
fetch(`${apiURL}/api/cameras`)
    .then(async result_ => { //On rend asynchrone notre fonction
        const result = await result_.json() //Le reste du code s'execute après l'execution de la promesse 
        result.forEach(result => {
            camera = result //Result deviens camera
            //Appel de nos functions
            cameraCard()
        })
    })
    .catch(error => {
        console.log(error);
    })

//Notre template camera card
const cameraCard = () => {
    $cameraList.innerHTML +=
        `<div id="camera-card" class="card col-lg-5 col-md-12 col-sm-12 col-12 mt-3 mb-3 shadow">
        <a href=../html/product.html?id=${camera._id}">
            <div class="background-image-camera card-img-top" style="background-image: url(${camera.imageUrl})"></div>
        </a>
        <div class="card-body">
            <h3 class="card-title">${camera.name}</h3>
            <p class="card-text">${camera.description}</p> 
            <div class="col-12 mt-3">
                <a href="./html/product.html?id=${camera._id}">
                    <button type="button" id="camera-infos" class="add-to-cart  btn col-6 mx-auto mt-1">Plus d'informations</button>
                </a>
            </div>               
        </div>   
    </div>`
} 
