//Page products
//On initialise nos variables
let products;
let productsTableInfo;
let totalPrice = 0;
let productsTotalSub = []; //On initialise un tableau vide de chaque élément
let productsTotalQuant = [];
let productsTotalName = [];
let productsTotalId = [];


//On récupère notre storage en json
let storage = localStorage.getItem("orinocoCamera");

//On extrait chaque ligne du tableau 
const tableRow = () => {
     console.log("Element à mettre dans le tableau", products)
     for (let i = 0; i < products.length; i++) {
          productsTableInfo = products[i] //Récupère pour un élément du panier ses infos sous forme d'objet
          console.log("Une ligne de tableau", productsTableInfo)
     }
}

const $productsTableBody = document.querySelector('#products-tablebody');
console.log("$productsTableBody", $productsTableBody)
//Fonction pour créer une ligne du tableau
const productsTable = () => {
     // let tr;
     //Crée la ligne tr de chaque élement
     let myTr = document.createElement('tr')
     console.log("myTr", myTr)
     //Donne un id
     myTr.id = (`${productsTableInfo._id}`)
     //Inclus myTr dans mon tableau ($productsTableBody)
     $productsTableBody.appendChild(myTr)

     //Crée la ligne td nom 
     let myTd = document.createElement('td')
     console.log("myTdNom", myTd)
     //Donne une classe
     myTd.className = 'text-center'
     //Rajoute le contenu
     myTd.textContent = (`${productsTableInfo.name}  ${productsTableInfo.lenses}`)
     //Inclus myTd dans myTr
     myTr.appendChild(myTd)

     //Crée la ligne td quantité 
     myTd = document.createElement('td')
     console.log("myTdQuantité", myTd)
     myTd.className = 'text-center'
     myTr.appendChild(myTd)


     // //Créé le bouton -
     let myButtonReduce = document.createElement('button')
     console.log("myButtonReduce", myButtonReduce)
     myButtonReduce.className = 'btn mx-auto quantity-reduce'
     //Donne un type
     myButtonReduce.type = 'button'
     // //Donne un attribut
     // // myButtonReduce.setAttribute('onclick', ' = document.querySelector('#')()')
     myButtonReduce.textContent = '-'
     myTd.appendChild(myButtonReduce)

     //Créé la span quantité
     let mySpan = document.createElement('span')
     console.log("mySpanQuantité", mySpan)
     mySpan.id = (`${productsTableInfo._id}`)
     mySpan.className = 'quantity-product'
     mySpan.textContent = (`${productsTableInfo.quantity}`)
     myTd.appendChild(mySpan)
     // tr = myTd.appendChild(mySpan).textContent //Donnne comme valeur la quantité

     //Créé le bouton +
     let myButtonPlus = document.createElement('button')
     console.log("myButtonPlus", myButtonPlus)
     myButtonPlus.className = 'btn mx-auto quantity-plus'
     myButtonPlus.type = 'button'
     // myButtonPlus.setAttribute('onclick', 'buttonBasketPlus()')
     myButtonPlus.textContent = '+'
     myTd.appendChild(myButtonPlus)

     //Crée la ligne td du prix
     myTd = document.createElement('td')
     console.log("myTdPrix", myTd)
     myTd.id = 'price-table'
     myTd.className = 'text-center'
     myTr.appendChild(myTd)
     // tr =  myTr.appendChild(myTd).textContent //Donnne comme valeur le prix

     //Créé la span prix
     let mySpanPrice = document.createElement('span')
     console.log("mySpanPrix", mySpanPrice)
     mySpanPrice.textContent = (`${productsTableInfo.price + ' €'}`)
     myTd.appendChild(mySpanPrice)

     myButtonReduce.addEventListener('click', function (event) {
          console.log("productsTableInfo.quantity", productsTableInfo.quantity)
          productsTableInfo.quantity = mySpan.textContent //Prends la valeur textContent exact au click   
          let quantity = --productsTableInfo.quantity //Redeviens un nombre
          mySpan.innerHTML = quantity //la quantité décrémente à chaque click

          console.log("productsTableInfo.priceByItems", productsTableInfo.priceByItems)
          productsTableInfo.priceByItems = mySpanPrice.textContent
          console.log("productsTableInfo.priceByItems2", productsTableInfo.priceByItems)
          let price = --productsTableInfo.priceByItems
          console.log("productsTableInfo.priceByItems3", productsTableInfo.priceByItems)
          myTd.innerHTML = price
          // console.log("productsTableInfo.price.textContent",  myTd.innerHTML)
          // console.log("productsTableInfo.price1", productsTableInfo.price)
          // console.log("productsTableInfo.price1.Type",typeof productsTableInfo.price)
          // myTd.textContent = productsTableInfo.price
          // console.log("productsTableInfo.price2", productsTableInfo.price)
          // console.log("productsTableInfo.price2.Type",typeof productsTableInfo.price)
          // let price = productsTableInfo.price * quantity
          // console.log("productsTableInfo.price3", productsTableInfo.price)
          // console.log("productsTableInfo.price3.Type",typeof productsTableInfo.price)

          // myTd.innerHTML = price

          event.stopPropagation()
          event.preventDefault()
     })

     myButtonPlus.addEventListener('click', function (event) {
          productsTableInfo.quantity = mySpan.textContent //Prends la valeur textContent exact au click
          let quantity = ++productsTableInfo.quantity //Redeviens un nombre
          mySpan.innerHTML = quantity //la quantité décrémente à chaque click

          // let price = productsTableInfo.price * quantity
          // myTd.innerHTML = price
          myTd.textContent = parseFloat(myTd.textContent)
          console.log("myTd.textContent", myTd.textContent)
          myTd.innerHTML = myTd.textContent * quantity

          event.stopPropagation()
          event.preventDefault()
     })
     // console.log("Prix de chacun des élements du tableau", productsTableInfo.price)
     // console.log("id de chacun des élements du tableau", productsTableInfo._id)
     // const $buttonBasketReduce = document.querySelector('.quantity-reduce')
     // console.log("Chaque boutons moins", $buttonBasketReduce)

     // $productsTableBody.innerHTML += (`
     // <tr id="parent-price">
     //      <td class="text-center">${productsTableInfo.name}  ${productsTableInfo.lenses}</td>
     //      <td class="text-center">
     //           <button type="button" onclick=" = document.querySelector('#')()" class="btn mx-auto quantity-reduce">-</button>
     //                <span class="quantity-product">${productsTableInfo.quantity}</span>
     //           <button type="button" onclick="buttonBasketPlus()" class="btn mx-auto quantity-plus">+</button>
     //      </td> 
     //      <td id="price-table" class="text-center">${productsTableInfo.price + ' €'}</td>
     // </tr>`)
     // buttonBasket()
}


/*
Déjà un petit conseil comme ça à première vue : 
ne pas ajouter des eventListeners 'click' ou autre en passant par la méthode monElement.setAttribute('onclick', taFonction()).
la bonne syntaxe serait plutôt 
     monElement.addEventListener('click', function() {
          tafonctionQuiSExecute();
     })
*/

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





