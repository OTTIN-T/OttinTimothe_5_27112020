//Page order
//On récupère notre storageCommand en json
let storageCommand = localStorage.getItem("sendCommand");


//Fonction pour notre commande vide
const commandEmpty = () => {
     $orderForm.innerHTML +=(`
     <p>Vous n'avez pas de commande en cours</p>
     `)
}

//Fonction pour effacer notre bouton d'achat
const commandFooter = () => {
     $commandFooter = document.querySelector('#confirm-command')
     $commandFooter.classList.add("hide")
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

//Fonction envoie formulaire
//On initialise nos variables
const $orderForm = document.querySelector('#order-form')
const $firstName = document.querySelector('#firsName') 
const $lastName = document.querySelector('#lastName')
const $adress= document.querySelector('#adress')
const $city = document.querySelector('#city')
const $email = document.querySelector('#email')

//On écoute l'envoi formulaire
$orderForm.addEventListener('submit', () => {
   const order = {
        contact: {
             firstName: $firstName.value,
             lastName: $lastName.value,
             adress: $adress.value,
             city: $city.value,
             email: $email.value,
        }
   }  
   console.log("order", order)
   products: [products]
   console.log("products", [products])
})
// const options = {
//      method: 'POST',
//      body: JSON.stringify(user),
//      headers: {
//          'Content-Type': 'application/json'
//      }
// }  

//Condition pour afficher et utiliser notre commande
if(!storageCommand) { //On vérifie si storageCommand existe
     //Si non
     storageCommand = {
          products: [], //Créé un tableau vide
     }
     if(storageCommand.products.length <= 0){
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