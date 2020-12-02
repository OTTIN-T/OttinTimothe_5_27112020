//Page cart
//On initialise nos variables
let cart;
let cartTableInfo;
let cartCalcul;
let $cartTableBody;
let cartTotal;

//On récupère notre storage en json
let storage = localStorage.getItem("orinocoCamera");

//On extrait chaque ligne du tableau 
const cartRow = () => {
     for(let i = 0; i < cart.length; i++){
          cartTableInfo = cart[i] //Récupère pour un élément du panier ses infos sous forme d'objet
     }
}

//Fonction pour créer une ligne du tableau
//On récupère cartTableInfo pour extraire ses infos dans le tableau
const cartTable = () => {
     $cartTableBody = document.querySelector('#cart-tablebody')
     $cartTableBody.innerHTML += (`
     <tr id="parent-price">
          <td>${cartTableInfo.name + cartTableInfo.lenses}</td>
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

//Fonction pour créer notre bouton d'achat
const cartFooter = () => { 
     $cartFooter = document.querySelector('#cart-footer')
     $cartFooter.innerHTML += (`
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

//Fonction pour calculer un total
//On ajoute le prototype sum à notre constructeur Array
Array.prototype.sum = function calcul(){
	sum = 0;	
	for(i=0;i<this.length; i++){	//this revoie la taille de notre tableau
		if (!isNaN(Number(this[i]))){		
			sum += Number(this[i]);	
		}		
	}
	return sum;
}

//Fonction pour calculer le total du prix dans notre tableau
const subTotal = () => {
     cartCalcul = document.querySelector('#sub-total')
     cartTotalSub = [] //On initialise un tableau vide
     cart.forEach((result) => {
          cartTableInfo = result 
          cartTotalSub.push(cartTableInfo.price) //On push chaque price dans notre tableau
     });     
     cartCalcul.innerHTML =  cartTotalSub.sum() //On fait le total de notre tableau
}

//Fonction pour calculer le total de la quantité dans notre tableau
const quantTotal = () => {
     cartTotalQuant = [] //On initialise un tableau vide
     cart.forEach((result) => {
          cartTableInfo = result 
          cartTotalQuant.push(cartTableInfo.quantity) //On push chaque price dans notre tableau
     });     
     cartCalcul =  cartTotalQuant.sum() //On fait le total de notre tableau
}

const nameTotal = () => {
     cartTotalName = [] //On initialise un tableau vide
     cart.forEach((result) => {
          cartTableInfo = result 
          cartTotalName.push(cartTableInfo.name) //On push chaque price dans notre tableau
     });     
     cartCalcul =  cartTotalName //On fait le total de notre tableau
}


//Condition pour afficher et utiliser notre panier
if(!storage) { //On vérifie si storage existe
     //Si non
     storage = {
          cart: [], //Créé un tableau vide
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
          cartFooter()
          subTotal()
          quantTotal()
          nameTotal()
          cart.forEach((result) => { //Boucle pour incrémenter le tableau
               cartTableInfo = result
               cartTable()       
          });   
     }
}

//Fonction pour le localStorage
const sendCommand = () => {
     const quantity = document.querySelector('#quantity') //Récupère la valeur de la quantité
     let order = window.localStorage.getItem("sendCommand") //Créer notre stockage de panier
     if(!order){
         order = {
             command: [],
         }
     } else{
         order = JSON.parse(order) //On extrait notre json 
     }
     order.command.push({
         name: cartTotalName,
         quantity: cartTotalQuant,
         price : cartTotalSub,
     })
     window.localStorage.setItem("sendCommand", JSON.stringify(order))
     console.log("window.localStorage.setItem", JSON.stringify(order))
     alert('Commande envoyé')
     console.log("order",order);
 }





