//Page order
//On déclare nos variables utiles à diffèrentes fonction
const $orderForm = document.querySelector('#order-form');

//Fonction pour notre commande vide
const commandEmpty = () => {
     $orderForm.innerHTML +=(`
     <p>Vous n'avez pas de commande en cours</p>
     `)
}

//Fonction pour effacer notre bouton d'achat
const commandFooter = () => {
     $commandFooter = document.querySelector('#confirm-command')
     if($commandFooter){
          $commandFooter.classList.add("hide")
     }   
}

//Fonction pour notre formulaire de commande
const commandForm = () => {
     $orderForm.innerHTML +=(`
     <p>Merci de compléter les différents champs pour finaliser votre commande</p>
     <div class="form-row mt-3">
         <div class="form-group col-md-6">
           <label for="lastName">Nom</label>
           <input required type="text" class="form-control" id="lastName">
         </div>
         <div class="form-group col-md-6">
           <label for="firstName">Prénom</label>
           <input required type="text" class="form-control" id="firstName">
         </div>
     </div>
     <div class="form-group">
         <label for="adress">Addresse</label>
         <input required type="text" class="form-control" id="adress">
     </div>
     <div class="form-group">
         <label for="inputComplement">Complément</label>
         <input type="text" class="form-control" id="inputComplement" placeholder="Appartement, étages...">
     </div>
     <div class="form-row">
         <div class="form-group col-md-6">
             <label for="city">Ville</label>
             <input required type="text" class="form-control" id="city">
         </div>
         <div class="form-group col-md-4">
             <label for="inputState">Région</label>
             <input required type="text" class="form-control" id="inputState">
         </div>
         <div class="form-group col-md-2">
                 <label for="inputZip">Code postal</label>
                 <input required type="text" class="form-control" id="inputZip">
         </div>
     </div>
     <div class="form-row">
         <div class="form-group col-12">
           <label for="email">Email</label>
           <input required type="email" class="form-control" id="email">
         </div>
     </div>
     <button type="submit" class="btn btn-primary mt-3">Commander</button>
     `)
}

//Envoie de notre formulaire au submit
$orderForm.addEventListener('submit', () => {  //On écoute l'envoi
     //Créations des const avec les id CSS
     const $firstName = document.querySelector('#firstName');
     const $lastName = document.querySelector('#lastName');
     const $adress= document.querySelector('#adress');
     const $city = document.querySelector('#city');
     const $email = document.querySelector('#email');
     //Création de la variable order
     let order = {
          contact: { //Objet contact
               firstName: $firstName.value,
               lastName: $lastName.value,
               address: $adress.value,
               city: $city.value,
               email: $email.value,
          }, 
          products: productsTotalId,  //Tableau des id des items
     };  
     console.log("orderContact1", order.contact),
     console.log("orderProduct1", order.products)  
     console.log("order1", order)     
     //Création de la requête POST
     fetch("http://localhost:3000/api/cameras/order" , {
          method: 'POST', //Methode d'envoi
          headers: new Headers({
               "Content-Type": "application/json"//On 'précise' que l'objet envoyé sera au format JSON
          }),
          body: JSON.stringify(order), //On stringify l'objet envoyé
     })
     .then(result => { 
          result.json() //BESOIN EXPLICATION 
          .then(result => {
               window.localStorage.setItem("orderResult", JSON.stringify(result.orderId)) //On stocke orderId dans le localStorage pour l'utiliser après
               console.log("resultID", result.orderId)
               window.localStorage.setItem("order", JSON.stringify(order))
               console.log("localStorage2", localStorage.orderResult),
               console.log("result", result), //La requête passe bien 
               console.log("order2", order) 
          })
     })
     .catch(error => {
          console.log(error);
     })
     alert('Commande prise en compte')
})

//Fonction quand la commande est passée
const orderSend = () => {
     const $tableEmpty = document.querySelector('#table-empty')
     const $orderSend = document.querySelector('#order-send')
     $tableEmpty.classList.add("hide")
     $orderForm.classList.add("hide")
     $orderSend.innerHTML +=(`
     <p>Votre commande a bien été enregistrer.</p>
     <p>Votre numéro de commande est le : ${localStorage.orderResult} </p>
     <p>Merci de votre achat et à bientôt</p>
     `)
}

//Condition lorsque notre commande est passée
if(localStorage.order){            
     orderSend()
     // localStorage.removeItem("orinocoCamera") 
     // localStorage.removeItem("sendCommand")
}

//Condition pour afficher et utiliser notre commande
let storageCommand = localStorage.getItem("sendCommand"); //On récupère notre storageCommand en json
if(!storageCommand) { //On vérifie si storageCommand existe
     //Si non
     storageCommand = {
          products: [], //Créé un tableau vide
     }
     if(storageCommand.products.length <= 0 && localStorage.order == undefined || localStorage.order <= 0){ //Condition de l'affichage du contenu de notre page
         commandEmpty()
     }
} else {
     //si oui
     //On extrait notre json 
     storageCommand = JSON.parse(storageCommand)
     products = storageCommand.products
     //Condition pour afficher notre panier
     if(products.length >= 1){
          commandForm()      
          commandFooter()  
     }
}

