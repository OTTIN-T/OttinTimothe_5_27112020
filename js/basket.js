//Page products
//On initialise nos variables
let products;
let productsTableInfo;
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
          <td class="text-center">${productsTableInfo.quantity}</td> 
          <td id="price-table" class="text-center">${productsTableInfo.price + ' €'}</td>
     </tr>`)
}

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
               <p><span></span></p>
          </td>
          <td class="text-center">    
               <a href="order.html">
                    <button type="button" onclick="sendCommand()" id="confirm-command" class="btn col-md-6 col-12 mx-auto">Passer la commande</button>
               </a>
          </td>
          <td class="text-center">
               <p class="mt-3">Sous total : <span id="sub-total"></span>€</p>
          </td>
     </tr>`)
}

//Fonction pour implémenter chaque élement dans le tableau
const implementBasket = () => {
     const productsCalcul = document.querySelector('#sub-total')
     let totalPrice = 0;
     products.forEach((result) => {
          productsTableInfo = result;
          totalPrice += productsTableInfo.price; //+= S'ajoute à lui même avec une autre valeur
          productsTotalId.push(productsTableInfo._id) //On push chaque élément dans son tableau
          productsTotalSub.push(productsTableInfo.price)
          productsTotalQuant.push(productsTableInfo.quantity)
          productsTotalName.push(productsTableInfo.name)
     });
     productsCalcul.innerHTML = totalPrice //On fait le total de notre tableau

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
     alert('Commande envoyé')
}





