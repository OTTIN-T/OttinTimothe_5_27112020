//Page products
//On initialise nos variables
let products;
let productsTableInfo;
let totalPrice = 0;
let productsTotalSub = []; //On initialise un tableau vide de chaque élément
let productsTotalQuant = [];
let productsTotalName = [];
let productsTotalId = [];
const $productsTableBody = document.querySelector('#products-tablebody');

//On récupère notre storage en json
let storage = localStorage.getItem("orinocoCamera");

//On extrait chaque ligne du tableau 
const tableRow = () => {
     for (let i = 0; i < products.length; i++) {
          productsTableInfo = products[i] //Récupère pour un élément du panier ses infos sous forme d'objet

     }
}

//Fonction pour créer une ligne du tableau
const productsTable = () => {
     $productsTableBody.innerHTML += (`
     <tr id="parent-price">
          <td class="text-center">${productsTableInfo.name}  ${productsTableInfo.lenses}</td>
          <td class="text-center">
               <button type="button" onclick="buttonBasketReduce()" class="btn mx-auto quantity-reduce">-</button>
                    <span class="quantity-product">${productsTableInfo.quantity}</span>
               <button type="button" onclick="buttonBasketPlus()" class="btn mx-auto quantity-plus">+</button>
          </td> 
          <td id="price-table" class="text-center">${productsTableInfo.price + ' €'}</td>
     </tr>`)
     // buttonBasket()
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ne marche que pour la première ligne
//Fonction  pour les boutons + et -
const buttonBasketReduce = () => {
     const $quantityProduct = document.querySelector('.quantity-product')
     const $priceTable = document.querySelector('#price-table')
     const $productsCalcul = document.querySelector('#sub-total')
     const $quantityReduce = document.querySelector('.quantity-reduce')
     const $quantityPlus = document.querySelector('.quantity-plus')

          $quantityProduct.innerHTML = --productsTableInfo.quantity //la quantité décrémente à chaque click
          const productsTotalByItem = productsTableInfo.priceByItems * productsTableInfo.quantity //On recalcul le prix en fonction de la quantité
          $priceTable.innerHTML = productsTotalByItem
          totalPrice -= productsTableInfo.price //On modifie le total du panier 
          $productsCalcul.innerHTML = totalPrice
          alert('Vous avez retiré un produit à votre panier !')

}
const buttonBasketPlus = () => {
     const $quantityProduct = document.querySelector('.quantity-product')
     const $priceTable = document.querySelector('#price-table')
     const $productsCalcul = document.querySelector('#sub-total')
     const $quantityReduce = document.querySelector('.quantity-reduce')
     const $quantityPlus = document.querySelector('.quantity-plus')

          $quantityProduct.innerHTML = ++productsTableInfo.quantity //La quantité s'incrémente à chaque click
          const productsTotalByItem = productsTableInfo.priceByItems * productsTableInfo.quantity //On recalcul le prix en fonction de la quantité
          $priceTable.innerHTML = productsTotalByItem
          totalPrice += productsTableInfo.price //On modifie le total du panier
          $productsCalcul.innerHTML = totalPrice
          alert('Vous avez ajouté un produit à votre panier !')

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Fonction pour notre panier vide
const tableEmpty = () => {
     $productsTableBody.innerHTML += (`
     <tr id="title-table-empty" class="col-12 mx-auto">
          <td></td>
          <td class="text-center">Votre panier est vide</td>
          <td></td>
     </tr>
     `)
}

//Fonction pour créer notre bouton d'achat
const tableFooter = () => {
     const $productsFooter = document.querySelector('#products-footer')
     $productsFooter.innerHTML += (`
     <tr class="container">
          <td class="text-center">
               <a href="../index.html">
                    <button type="button" onclick="clearCommand()" id="clear-command" class="btn col-md-6 col-12 mx-auto d-none d-sm-block">Annuler la commande</button>
               </a>
          </td>
          <td class="text-center">    
               <a href="order.html">
                    <button type="button" onclick="sendCommand()" id="confirm-command" class="btn col-md-6 col-12 mx-auto">Passer la commande</button>
               </a>
          </td>
          <td class="text-center">
               <p class="mt-3">Sous total : <span id="sub-total"></span>€</p>
          </td>
     </tr>
     <tr class="container">
          <td>
          </td>
          <td class="text-center">
               <a href="../index.html">
                    <button type="button" onclick="clearCommand()" id="clear-command" class="btn col-md-6 col-12 mx-auto d-block d-sm-none">Annuler la commande</button>
               </a>
          </td>
          <td>
          </td>
     </tr`)
}

//Fonction pour implémenter chaque élement dans le tableau
const implementBasket = () => {
     const $productsCalcul = document.querySelector('#sub-total')
     products.forEach((result) => {
          productsTableInfo = result;
          totalPrice += productsTableInfo.price; //+= S'ajoute à lui même avec une autre valeur
          productsTotalId.push(productsTableInfo._id) //On push chaque élément dans son tableau
          productsTotalSub.push(productsTableInfo.price)
          productsTotalQuant.push(productsTableInfo.quantity)
          productsTotalName.push(productsTableInfo.name)
     });
     $productsCalcul.innerHTML = totalPrice //On fait le total de notre tableau

}

//Condition pour afficher et utiliser notre panier
if (!storage) { //On vérifie si storage existe
     //Si non
     storage = {
          products: [], //Créé un tableau vide
     }
     if (storage.products.length <= 0 || localStorage.order) {
          tableEmpty()
     }
} else {
     //si oui
     //On extrait notre json 
     storage = JSON.parse(storage)
     products = storage.products //Un tableau avec un index = une ligne/items 
     //Condition pour afficher notre panier 
     if (products.length >= 1 && (localStorage.order == undefined || localStorage.order)) {
          tableRow()
          tableFooter()
          implementBasket()
          products.forEach((result) => { //Boucle pour incrémenter le tableau
               productsTableInfo = result
               productsTable()
          });
     } else if (products.length >= 1 && localStorage.order) { //Si on a déjà une commande affiche tableEmpty
          tableEmpty()
     }
}

//Fonction pour stocker notre commande dans le localStorage
const sendCommand = () => {
     let order = window.localStorage.getItem("sendCommand") //Créer notre stockage de panier
     const $productsCalcul = document.querySelector('#sub-total')
     if (!order) {
          order = {
               products: [],
          }
     } else {
          order = JSON.parse(order) //On extrait notre json 
     }
     order.products.unshift({ //Place notre commande en index 0
          name: productsTotalName,
          quantity: productsTotalQuant,
          price: productsTotalSub,
          id: productsTotalId,
     })
     if (order.products.length > 1) { //Supprime anciennes commande si nouvelle commande
          const pos = 1
          const n = 1
          order.products.splice(pos, n)
     }
     window.localStorage.setItem("sendCommand", JSON.stringify(order))
     localStorage.removeItem("orderResult") //On nettoie notre localStorage pour passer une nouvelle commande
     localStorage.removeItem("order")
     alert(`Votre commande d'un total de ${$productsCalcul.textContent} € est envoyée. Vous allez être redirigé pour finaliser votre commande.`)
}

//Fonction pour annuler la commande
const clearCommand = () => {
     localStorage.clear() //Vide le local storage
     alert(`Commande annulée. Vous allez être redirigé vers la page d'accueil.`)
}





