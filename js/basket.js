//Page cart
//On initialise nos variables
let cart;
let cartTableInfo;
let cartCalcul;
let $cartTableBody;
let $cartTotal;

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

//Fonction pour calculer le total de notre tableau
const subTotal = () => {
     cartCalcul = document.querySelector('#subtotal')
     $cartTotal = [] //On initialise un tableau vide
     cart.forEach((result) => {
          cartTableInfo = result 
          $cartTotal.push(cartTableInfo.price) //On push chaque price dans notre tableau
     });     
     cartCalcul.innerHTML =  $cartTotal.sum() //On fait le total de notre tableau
}

//Condition pour afficher et utiliser notre panier
if(!storage) { //On vérifie si storage existe
     //Si non
     storage = {
          cart: [], //Créé un tableau vie
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
          subTotal()
          cart.forEach((result) => { //Boucle pour incrémenter le tableau
               cartTableInfo = result
               cartTable()       
          });   
     }
}





