//Page products
//On initialise nos variables
let productsTableInfo;
let totalPrice = 0;
const $productsTableBody = document.querySelector('#products-tablebody');
let productsTotalSub = []; //On initialise un tableau vide de chaque élément
let productsTotalQuant = [];
let productsTotalName = [];
let productsTotalId = [];

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
     let myTr = document.createElement('tr') //Crée la ligne tr de chaque élement   
     myTr.id = (`${productsTableInfo._id}`) //Donne un id    
     $productsTableBody.appendChild(myTr) //Inclus myTr dans mon tableau ($productsTableBody)
     
     let myTdName = document.createElement('td')//Crée la ligne td nom     
     myTdName.className = 'text-center'//Donne une classe    
     myTdName.textContent = (`${productsTableInfo.name}  ${productsTableInfo.lenses}`)//Rajoute le contenu    
     myTr.appendChild(myTdName)//Inclus myTdName dans myTr
  
     let myTdQuantity = document.createElement('td') //Crée la ligne td quantité 
     myTdQuantity.className = 'text-center'
     myTr.appendChild(myTdQuantity)

     let myButtonReduce = document.createElement('button') // Créé le bouton -
     myButtonReduce.className = 'btn mx-auto'
     myButtonReduce.type = 'button'
     myButtonReduce.textContent = '-'
     myTdQuantity.appendChild(myButtonReduce)
     
     let mySpan = document.createElement('span') //Créé la span quantité
     mySpan.id = 'span-quantity'
     mySpan.textContent = (`${productsTableInfo.quantity}`)
     myTdQuantity.appendChild(mySpan)
  
     let myButtonPlus = document.createElement('button') //Créé le bouton +
     myButtonPlus.className = 'btn mx-auto'
     myButtonPlus.type = 'button'
     myButtonPlus.textContent = '+'
     myTdQuantity.appendChild(myButtonPlus)
   
     let myTdPrice = document.createElement('td') //Crée la ligne td du prix
     myTdPrice.id = (`${productsTableInfo.priceByItems}`)//Stock le prix par items
     myTdPrice.className = 'text-center'
     myTdPrice.textContent = (`${productsTableInfo.price} €`)
     myTr.appendChild(myTdPrice)

     //EventListener pour les boutons +/-
     myButtonReduce.addEventListener('click', function (event) {
          productsTableInfo.quantity = mySpan.textContent //Prends la valeur textContent exact au click   
          let quantity = --productsTableInfo.quantity //Redeviens un nombre
          mySpan.textContent = quantity //la quantité décrémente à chaque click
          let price = myTdPrice.id * quantity
          //Condition popur changer le prix en fonction de la quantité
          if (quantity <= 0) {
               myTdPrice.textContent = '0' //Bloque le prix à 0
               myButtonReduce.classList.add('hide') //Le bouton - disparaît
          } else {
               myTdPrice.textContent = (`${price} €`)
          }

          //Recalcul du panier total
          const $productsCalcul = document.querySelector('#sub-total')
          totalPrice -= myTdPrice.id * 1; //fait passer myTdPrice.id d'une string à un number
          $productsCalcul.textContent = totalPrice

          event.stopPropagation()
          event.preventDefault()
     })
     myButtonPlus.addEventListener('click', function (event) {
          myButtonReduce.classList.remove('hide') //Le bouton - apparaît
          productsTableInfo.quantity = mySpan.textContent //Prends la valeur textContent exact au click
          let quantity = ++productsTableInfo.quantity //Redeviens un nombre
          mySpan.textContent = quantity //la quantité décrémente à chaque click
          let price = myTdPrice.id * quantity
          myTdPrice.textContent = (`${price} €`) //Le prix change en fonction de la quantité

          //Recalcul du panier total
          const $productsCalcul = document.querySelector('#sub-total')
          totalPrice += myTdPrice.id * 1; //fait passer myTdPrice.id d'une string à un number
          $productsCalcul.textContent = totalPrice

          ////////////////////////////////////////////////////////////////////////////////
          //Section en cours
          // productsTableInfo
          // console.log("productsTableInfoOOOOOOOOOOOOOOOO", productsTableInfo)
          // productsTableInfo.name = myTdName.textContent
          // console.log("Le nom du produit", productsTableInfo.name)

          // productsTableInfo._id = myTr.id
          // console.log("L'id du produit", productsTableInfo._id)

          // productsTableInfo.quantity = quantity
          // console.log("la quantité du produit après le click", productsTableInfo.quantity)

          // productsTableInfo.price = myTdPrice.textContent
          // console.log("Le prix total de la ligne après le click", productsTableInfo.price)

          // productsTotalId.indexOf()
          // products.indexOf(products)
          // console.log("products!!!!!!!!!!!!!!!", products)
          // console.log(" TEST",  productsTotalQuant)
          // if(productsTableInfo._id = productsTotalId){
          //      let pos = productsTotalId.indexOf()
          //      productsTotalId.splice()
          //      productsTotalId.indexOf(productsTableInfo._id)
          //      console.log(" productsTotalId.indexOf()2",  productsTotalId.indexOf(productsTableInfo._id))
               // storage.products.unshift({     
               //      name: productsTableInfo.name,
               //      _id: productsTableInfo._id,
               //      lenses: '',
               //      quantity: productsTableInfo.quantity,
               //      price: productsTableInfo.price,
               //      // priceByItems: productsTableInfo.price,
               //      // imageUrl: productsTableInfo.imageUrl,
               // })
          //      // productsTotalId.splice()
          // }
          //products[0].name
          // console.log("productsTableInfo._id après commande", productsTableInfo._id)
          // console.log("productsTotalId après commande", productsTotalId)

          // console.log("productsTotalSub après commande", productsTotalSub)
          // console.log("productsTotalQuant après commande", productsTotalQuant)
          // productsTotalSub.push(productsTableInfo.price)
          // console.log("productsTotalSub", productsTotalSub)

          // productsTotalQuant.push(productsTableInfo.quantity)
          // console.log("productsTotalQuant", productsTotalQuant)

          // localStorage.removeItem("orinocoCamera")

          // console.log("products au click", products)
          //localStorage.removeItem("orinocoCamera")
          // console.log("products après remove", products)
          // window.localStorage.getItem("orinocoCamera")
          

          // storage.products.unshift({     
          //      name: productsTableInfo.name,
          //      _id: productsTableInfo._id,
          //      lenses: '',
          //      quantity: productsTableInfo.quantity,
          //      price: productsTableInfo.price,
          //      // priceByItems: productsTableInfo.price,
          //      // imageUrl: productsTableInfo.imageUrl,
          // })
          // window.localStorage.setItem("orinocoCamera", JSON.stringify(storage))
          // console.log("products après push", products)
          // let pos = products.indexOf(event)
          // console.log("products.indexOf(event)", products.indexOf(event))
          // let removedItems = products.splice(pos, 1)
          // console.log("removedItems", removedItems)
          // console.log("storage", storage)
          //storage.products.

          // console.log("localStorage3", storage)

          ////////////////////////////////////////////////////////////////////////////////

          event.stopPropagation()
          event.preventDefault()
     })
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
     // console.log("productsTotalSub a la commande", productsTotalSub)
     // console.log("productsTotalQuant a la commande", productsTotalQuant)
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





