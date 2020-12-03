//Page products
//On initialise nos variables
let products;
let productsTableInfo;
let productsCalcul;
let productsTotal;
let $productsTableBody;

//On récupère notre storage en json
let storage = localStorage.getItem("orinocoCamera");

//On extrait chaque ligne du tableau 
const productsRow = () => {
     for(let i = 0; i < products.length; i++){
          productsTableInfo = products[i] //Récupère pour un élément du panier ses infos sous forme d'objet
     }
}

//Fonction pour créer une ligne du tableau
//On récupère productsTableInfo pour extraire ses infos dans le tableau
const productsTable = () => {
     $productsTableBody = document.querySelector('#products-tablebody')
     $productsTableBody.innerHTML += (`
     <tr id="parent-price">
          <td>${productsTableInfo.name}  ${productsTableInfo.lenses}</td>
          <td>${productsTableInfo.quantity}</td> 
          <td id="price-table">${productsTableInfo.price + ' €'}</td>
     </tr>`)
}

//Fonction pour notre panier vide
const productsEmpty = () => {
     $productsTableBody = document.querySelector('#products-tablebody')
     $productsTableBody.innerHTML +=(`
     <tr id="title-table-empty" class="col-12 mx-auto">
          <td>Votre panier est vide</td>
     </tr>
     `)
}

//Fonction pour créer notre bouton d'achat
const productsFooter = () => { 
     $productsFooter = document.querySelector('#products-footer')
     $productsFooter.innerHTML += (`
     <tr>
          <td>
               <p><span></span></p>
          </td>
          <td>    
               <a href="order.html">
                    <button onclick="sendCommand()" id="confirm-command">Passer la commande</button>
               </a>
          </td>
          <td>
               <p>Sous total : <span id="sub-total"></span>€</p>
          </td>
     </tr>`)
}


//Fonction pour calculer le total du prix dans notre tableau
const subTotal = () => {
     productsCalcul = document.querySelector('#sub-total')
     productsTotalSub = [] //On initialise un tableau vide
     let total = 0
     products.forEach((result) => {
          total += productsTableInfo.price //S'ajoute à lui même avec une aautre valeur
          productsTableInfo = result 
          productsTotalSub.push(productsTableInfo.price) //On push chaque price dans notre tableau
     });     
     productsCalcul.innerHTML =  total //On fait le total de notre tableau
}

//Fonction pour calculer le total de la quantité dans notre tableau
const quantTotal = () => {
     productsTotalQuant = [] //On initialise un tableau vide
     let total = 0
     products.forEach((result) => {
          total += productsTableInfo.quantity
          productsTableInfo = result 
          productsTotalQuant.push(productsTableInfo.quantity) //On push chaque price dans notre tableau
     });     
     productsCalcul =   total //On fait le total de notre tableau
}

const nameTotal = () => {
     productsTotalName = [] //On initialise un tableau vide
     products.forEach((result) => {
          productsTableInfo = result 
          productsTotalName.push(productsTableInfo.name) //On push chaque price dans notre tableau
     });     
     productsCalcul =  productsTotalName //On fait le total de notre tableau
}


// const implementBasket = () => {
//      products.forEach((product) => {
          
//      });  
// }


//Condition pour afficher et utiliser notre panier
if(!storage) { //On vérifie si storage existe
     //Si non
     storage = {
          products: [], //Créé un tableau vide
     }
     if(storage.products.length <= 0){
          productsEmpty()
     }
} else {
     //si oui
     //On extrait notre json 
     storage = JSON.parse(storage)
     products = storage.products //Un tableau avec un index = une ligne/items 
     console.log("products", products)
     //Condition pour afficher notre panier 
     if(products.length >= 1){
          productsRow()
          productsFooter()
          subTotal()
          quantTotal()
          nameTotal()
          products.forEach((result) => { //Boucle pour incrémenter le tableau
               productsTableInfo = result
               productsTable()       
          });   
     }
}

//Fonction pour stocker notre commande dans le localStorage
const sendCommand = () => {
     const quantity = document.querySelector('#quantity') //Récupère la valeur de la quantité
     let order = window.localStorage.getItem("sendCommand") //Créer notre stockage de panier
     if(!order){
         order = {
             products: [],
         }
     } else{
         order = JSON.parse(order) //On extrait notre json 
     }
     order.products.unshift({ //Place notre commande en index 0
         name: productsTotalName,
         quantity: productsTotalQuant,
         price : productsTotalSub,
     //     priceTotal: productsTotalSub.sum(),
     })
     if(order.products.length > 1){ //Supprime anciennes commande si nouvelle commande
          const pos = 1
          const n = 1
          order.products.splice(pos, n)
     }
     window.localStorage.setItem("sendCommand", JSON.stringify(order))
     alert('Commande envoyé')
     console.log("order",order);
 }





