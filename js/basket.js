//Page cart
//On initialise nos variables
let cart;
let $cartTableBody;
let cartTableInfo;

//On récupère notre storage en json
let storage = localStorage.getItem("orinocoCamera");

//On extrait chaque ligne du tableau 
const cartRow = () => {
     for(let i = 0; i < cart.length; i++){
          cartTableInfo = cart[i] //Récupère pour un élément ses infos
     }
}

//Fonction pour créer une ligne du tableau
const cartTable = () => {
     $cartTableBody = document.querySelector('#cart-tablebody')
     $cartTableBody.innerHTML += (`
     <tr>
          <td>${cartTableInfo.name}</td>
          <td>${cartTableInfo.quantity}</td> 
          <td>${cartTableInfo.price} €</td>
     </tr>`)
}

//Fonction pour notre panier vide
const cartEmpty = () => {
     $cartTableBody = document.querySelector('#cart-tablebody')
     $cartTableBody.innerHTML +=(`
     <tr id="title-table-empty" class="col-12 mx-auto">
          <td>Votre panier est vide</td>
     </tr>
     `)
}


if(!storage) {
     //Si non
     storage = {
          cart: [],
     }
     if(storage.cart.length <= 0){
          cartEmpty()
     }
} else {
     //si oui
     //On extrait notre json 
     storage = JSON.parse(storage)
     cart = storage.cart
     //Condition pour afficher notre panier 
     if(cart.length >= 1){
          cartRow()
          cart.forEach((result) => { //Boucle pour incrémenter le tableau
               cartTableInfo = result
               cartTable()    
          });      
     }
}





