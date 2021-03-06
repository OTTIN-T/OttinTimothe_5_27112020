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
     myTr.id = productsTableInfo._id //Donne un id    
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
     mySpan.textContent = productsTableInfo.quantity
     myTdQuantity.appendChild(mySpan)

     let myButtonPlus = document.createElement('button') //Créé le bouton +
     myButtonPlus.className = 'btn mx-auto'
     myButtonPlus.type = 'button'
     myButtonPlus.textContent = '+'
     myTdQuantity.appendChild(myButtonPlus)

     let myTdPrice = document.createElement('td') //Crée la ligne td du prix
     myTdPrice.className = 'text-center'
     myTr.appendChild(myTdPrice)

     let mySpanPrice = document.createElement('span') //Affiche le prix
     mySpanPrice.id = productsTableInfo.priceByItems
     mySpanPrice.textContent = productsTableInfo.price
     myTdPrice.appendChild(mySpanPrice)

     let mySpanEuro = document.createElement('span') //Sert uniquement pour le logo euro
     mySpanEuro.textContent = ' €'
     myTdPrice.appendChild(mySpanEuro)

     //EventListener pour les boutons +/-
     myButtonReduce.addEventListener('click', function (event) {
          productsTableInfo = { //On modifie l'objet
               name: myTdName.textContent,
               _id: myTr.id,
               lenses: '',
               quantity: mySpan.textContent,
               priceByItems: mySpanPrice.id * 1, //*1 permet de faire passer la string en number
               price: mySpanPrice.textContent * 1
          }

          //Modification de la quantité et du prix
          productsTableInfo.quantity = mySpan.textContent //Prends la valeur textContent exact au click   
          let quantity = --productsTableInfo.quantity //Redeviens un nombre
          mySpan.textContent = quantity //la quantité décrémente à chaque click
          let price = mySpanPrice.id * quantity

          //Condition popur changer le prix en fonction de la quantité
          if (quantity <= 0) {
               mySpanPrice.textContent = '0' //Bloque le prix à 0
               myButtonReduce.classList.add('hide') //Le bouton - disparaît
               let pos = products.indexOf(productsTableInfo) //On récupère l'index du productsTableInfo ciblé
               products.splice(pos, 1) //On supprime l'ancien productsTableInfo
               tableEmpty()
          } else {
               mySpanPrice.textContent = price
          }

          //Recalcul du panier total
          const $productsCalcul = document.querySelector('#sub-total')
          totalPrice -= mySpanPrice.id * 1; //fait passer myTdPrice.id d'une string à un number
          $productsCalcul.textContent = totalPrice

          productsTableInfo.price = mySpanPrice.textContent * 1 //On stock la dernière valeur affiché

          //Fonction pour modifier le tableau enregistré
          const filterById = (obj) => { //Fonction pour filtrer notre products
               //obj renvoie mon élément ciblé + sa version modifié
               if (obj._id === myTr.id) { //On vérifie si les id sont identique, si oui
                    let pos = products.indexOf(obj) //On récupère l'index du obj ciblé
                    products.splice(pos, 1) //On supprime l'ancien obj
                    products.push(productsTableInfo) //On ajoute l'obj modifié 
                    return true
               }
          }
          let productsByID = products.filter(filterById); //Ne me sers à rien mais je ne sais pas comment
          console.log('Tableau filtré', productsByID);//Appeler ma fonction autrement
          window.localStorage.setItem("orinocoCamera", JSON.stringify(storage))

          event.stopPropagation()
          event.preventDefault()
     })
     console.log("mon tableau products avant click", products)
     myButtonPlus.addEventListener('click', (event) => {
          myButtonReduce.classList.remove('hide') //Le bouton - s'affiche

          productsTableInfo = { //On modifie l'objet
               name: myTdName.textContent,
               _id: myTr.id,
               lenses: '',
               quantity: mySpan.textContent,
               priceByItems: mySpanPrice.id * 1, //*1 permet de faire passer la string en number
               price: mySpanPrice.textContent * 1
          }

          //Modification de la quantité et du prix
          productsTableInfo.quantity = mySpan.textContent //Prends la valeur textContent exact au click
          let quantity = ++productsTableInfo.quantity //Redeviens un nombre
          mySpan.textContent = quantity //la quantité décrémente à chaque click
          let priceTest = mySpanPrice.id * quantity //Le prix change en fonction de la quantité
          mySpanPrice.textContent = priceTest

          //Recalcul du panier total
          const $productsCalcul = document.querySelector('#sub-total')
          totalPrice += mySpanPrice.id * 1
          $productsCalcul.textContent = totalPrice

          productsTableInfo.price = mySpanPrice.textContent * 1 //On stock la dernière valeur affiché

          //Fonction pour modifier le tableau enregistré
          const filterById = (obj) => { //Fonction pour filtrer notre products
               //obj renvoie mon élément ciblé + sa version modifié
               if (obj._id === myTr.id) { //On vérifie si les id sont identique, si oui
                    let pos = products.indexOf(obj) //On récupère l'index du obj ciblé
                    products.splice(pos, 1) //On supprime l'ancien obj
                    products.push(productsTableInfo) //On ajoute l'obj modifié 
                    return true
               }
          }
          let productsByID = products.filter(filterById); //Ne me sers à rien mais je ne sais pas comment
          console.log('Tableau filtré', productsByID);//Appeler ma fonction autrement
          window.localStorage.setItem("orinocoCamera", JSON.stringify(storage))

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
               <p class="mt-3">Sous total : <span id="sub-total"></span> €</p>
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
     if (storage.products.length === 0 || localStorage.order) {
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
          console.log("products", products)
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





