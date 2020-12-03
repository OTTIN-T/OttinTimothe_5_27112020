//Page order
//On initialise nos variables
// let commandTableInfo;
let $orderForm;
let $cartFooter;

//On récupère notre storageCommand en json
let storageCommand = localStorage.getItem("sendCommand");


//Fonction pour notre commande vide
const commandEmpty = () => {
     $orderForm = document.querySelector('#order-form')
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
     $orderForm = document.querySelector('#order-form')
     $orderForm.innerHTML +=(`
     <p>Merci de compléter les différents champs pour finaliser votre commande</p>
     <div class="form-row mt-3">
         <div class="form-group col-md-6">
           <label for="inputName">Nom</label>
           <input required type="text" class="form-control" id="inputName">
         </div>
         <div class="form-group col-md-6">
           <label for="inputFirstNem">Prénom</label>
           <input required type="text" class="form-control" id="inputFirstNem">
         </div>
     </div>
     <div class="form-group">
         <label for="inputAddress">Addresse</label>
         <input required type="text" class="form-control" id="inputAddress">
     </div>
     <div class="form-group">
         <label for="inputComplement">Complément</label>
         <input type="text" class="form-control" id="inputComplement" placeholder="Appartement, étages...">
     </div>
     <div class="form-row">
         <div class="form-group col-md-6">
             <label for="inputCity">Ville</label>
             <input required type="text" class="form-control" id="inputCity">
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
         <div class="form-group col-md-6">
           <label for="inputEmail">Email</label>
           <input required type="email" class="form-control" id="inputEmail">
         </div>
         <div class="form-group col-md-6">
           <label for="inputPassword">Mot de passe</label>
           <input required type="password" class="form-control" id="inputPassword">
         </div>
     </div>
     <button type="submit" class="btn btn-primary mt-3">Commander</button>
     `)
}


//Condition pour afficher et utiliser notre commande
if(!storageCommand) { //On vérifie si storageCommand existe
     //Si non
     storageCommand = {
          command: [], //Créé un tableau vide
     }
     if(storageCommand.command.length <= 0){
         commandEmpty()
     }
} else {
     //si oui
     //On extrait notre json 
     storageCommand = JSON.parse(storageCommand)
     command = storageCommand.command
     //Condition pour afficher notre panier
     if(command.length >= 1){
          commandForm()      
          commandFooter()  
     }
}