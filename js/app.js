fetch("http://localhost:3000/api/cameras")
.then((result) => {
    result.json()
    .then((cameras) => {
        const $cameraList = document.querySelector('#camera-list')
        cameras.forEach(camera => {
            $cameraList.innerHTML += ` 
            <div class="card border-dark shadow">
            <a href="../html/produit.html?id=${camera._id}"><div class="background-image-camera card-img-top" style="background-image: url(${camera.imageUrl})"></div></a>
                    
                    <div class="card-body">
                        <h5 class="card-title">${camera.name}</h5>
                        <p class="card-text">Description</p>
                        <a href="#" class="card-link">Option personnalisation</a>
                        <a class="btn btn-secondary col-12" href="#" role="button">Lien achat</a>
                    </div>
              </div>`
            console.log(camera)
        })

    })
})
.catch((error) => {
    console.log(error);
})