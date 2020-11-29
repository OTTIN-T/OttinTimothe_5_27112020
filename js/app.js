//Appel de notre API
fetch("http://localhost:3000/api/cameras")
.then(result => {
    result.json()
    .then(cameras => {
        const $cameraList = document.querySelector('#camera-list')
        cameras.forEach(camera => {
            const lenses = document.createElement("select")
                let i = 0
                for( i; i<camera.lenses.length; i++){
                    const option = document.createElement("option")
                    option.setAttribute("value", camera.lenses[i])                
                    option.innerHTML = camera.lenses[i]
                    lenses.appendChild(option)
                }
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
                        <select class="custom-select col-lg-6 col-md-6 col-sm-6 col-12" id="inputGroupSelect01">
                            <option selected selected value="1">Sélectionner</option>
                            ${lenses.innerHTML}
                        </select>
                        <p id="camera-price" class="card-text col-lg-6 col-md-6 col-sm-6 col-12 mx-auto">${camera.price + " €"}</p>
                    </div>  
                    <a id="camera-buy"class="btn btn-secondary col-6 mx-auto mt-3" href="#" role="button">Ajouter au panier</a>
                </div>   
            </div>` 
        })    
    }) 
})
.catch(error => {
    console.log(error);
})
