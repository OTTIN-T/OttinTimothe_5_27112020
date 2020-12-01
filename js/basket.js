//Page cart
//On initialise nos variables
let cart;
let cartTableInfo;
let cartCalcul;
let $cartTableBody;
let $cartTotal;
let $parentPrice;
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
     <tr id="parent-price">
          <td>${cartTableInfo.name}</td>
          <td>${cartTableInfo.quantity}</td> 
          <td id="price-table">${cartTableInfo.price + ' €'}</td>
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

//Fonction prix total
// const subTotal = () => {
//      $cartTotal = document.querySelector('#subtotal')
//      $priceTable = document.querySelector('#price-table')
//      console.log("$priceTable", $priceTable.price)
//      console.log("$priceTable2", $priceTable)
//      $parentPrice = document.querySelector('#parent-price')

//      console.log("cart", cart);

//      if(cart.length >= 1){
//      console.log("$parentPrice", $parentPrice )
//      console.log("$priceTable3", $priceTable.value)
//           // for(let i = 0; i<cart.length; i++){
//                cartCalcul = $parentPrice.appendChild($priceTable)
//                console.log("cartCalcul", cartCalcul.push)
//                console.log("cartTableInfo", cartTableInfo)
//           // }          
//           console.log("cartCalcul2", cartCalcul.tagName)
//           // const cartTotalCalcul = cartTableInfo.price * $priceTable //Le calcul
//           $cartTotal.innerHTML = (`${cartTableInfo.price}`)                 
//      }else{
//           $cartTotal.innerHTML = (`Panier vide 0`)   
//      }
//      console.log(" $cartTotal.innerHTML",  $cartTotal.innerHTML)
//      console.log("cart.length", cart.length)
     
//      // Il faut calculer le nombre de id price table et le multiplier par le price total

//       //Ce qu'on veut afficher
//      // console.log("cart.length", cart.length)
//      // console.log("cartTotalCalcul", cartTotalCalcul)
    
//      // console.log("$cartTotal.innerHTML", $cartTotal.innerHTML)
//      // console.log("cartable", cartTableInfo.price);
//      // console.log("Info",cartTableInfo);
// }

const subTotal = () => {
     cartCalcul = document.querySelector('#subtotal')
     $cartTotal = (cartTableInfo.price * cart.length)
     cartCalcul.innerHTML +=  $cartTotal.length
     console.log("$cartTotal.valueOf()", $cartTotal.valueOf())
     console.log("cartTableInfo.price * cart.length", cartTableInfo.price * cart.length)
     console.log("$cartTotal", $cartTotal)
     console.log("cartTableInfo.price", cartTableInfo.price)
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
               subTotal()  
          });      
     }
}





