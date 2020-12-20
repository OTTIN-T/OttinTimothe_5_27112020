//Page order
//On initialise nos variables
const $orderForm = document.querySelector('#order-form');
let storageCommand = localStorage.getItem("sendCommand"); //On récupère notre storageCommand en json
//Fonction pour notre commande vide
const commandEmpty = () => {
     $orderForm.innerHTML += (`
     <p class="text-center">Vous n'avez pas de commande en cours</p>
     `)
}

//Fonction pour effacer notre bouton d'achat
const commandFooter = () => {
     $commandFooter = document.querySelector('#confirm-command')
     if ($commandFooter) {
          $commandFooter.classList.add("hide")
     }
}

//Fonction pour notre formulaire de commande
const commandForm = () => {
     $orderForm.innerHTML += (`
     <h3 class="caption-form text-center">Merci de compléter les différents champs pour finaliser votre commande</h3>
     <div class="row mt-3">
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
     <div class="row">
         <div class="form-group col-md-5">
             <label for="city">Ville</label>
             <input required type="text" class="form-control" id="city">
         </div>
         <div class="form-group col-md-4">
             <label for="inputState">Région</label>
             <input required type="text" class="form-control" id="inputState">
         </div>
         <div class="form-group col-md-3">
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
     <button type="submit" id="camera-buy" class="btn col-sm-4 col-12 mx-auto mx-auto mt-4 mb-4">Commander</button>
     `)
}

//Envoie de notre formulaire au submit
$orderForm.addEventListener('submit', () => {  //On écoute l'envoi
     //On sélectionne nos ID présent dans notre form
     const $lastName = document.querySelector('#lastName');
     const $firstName = document.querySelector('#firstName');
     const $adress = document.querySelector('#adress');
     const $city = document.querySelector('#city');
     const $email = document.querySelector('#email');
     //Condition pour vérifier la validité des champs du form
     if ($lastName.value.trim().length < 1 || $firstName.value.trim().length < 1 || $adress.value.trim().length < 1 || $city.value.trim().length < 1) { //trim() vérifie si les champs ne sont pas des espaces vides
          alert('Formulaire non valide ! Merci de renseigner correctement le formulaire (caractère incorrect dans l\'un des champs)')
          return;
     }
     //Condition pour vérifier un email valide
     const email = $email.value;
     const regexEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/ //Utilisation de regex 
     if (regexEmail.exec(email) == null) //exec() exécute la recherche d'une correspondance sur une chaîne de caractères donnée
     {
          alert("Merci de remplir un email correct");
          return false;
     }
     //Création de la variable order
     let order = {
          contact: { //Objet contact
               firstName: $firstName.value.trim(), //trim() supprime les espaces inutiles rajouté par l'utilisateur si il y en a
               lastName: $lastName.value.trim(),
               address: $adress.value.trim(),
               city: $city.value.trim(),
               email: $email.value.trim(),
          },
          products: productsTotalId,  //Tableau des id des items
     };
     //Création de la requête POST
     fetch("http://localhost:3000/api/cameras/order", {
          method: 'POST', //Methode d'envoi
          headers: new Headers({
               "Content-Type": "application/json"//On 'précise' que l'objet envoyé sera au format JSON
          }),
          body: JSON.stringify(order), //On stringify l'objet envoyé
     })
          .then(async result_ => {
               const result = await result_.json() //On attend le résultat de resul_.json() pour exécuter le reste
               window.localStorage.setItem("orderResult", JSON.stringify(result.orderId)) //On stocke orderId dans le localStorage pour l'utiliser après
               window.localStorage.setItem("order", JSON.stringify(order)) //On stock notre order dans localStorage pour l'utiliser après
          })
          .catch(error => {
               console.log(error);
          })
     alert(`Commande prise en compte. Merci de votre achat !`)
})

//Fonction quand la commande est passée
const orderSend = () => {
     const $tableEmpty = document.querySelector('#table-empty')
     const $orderSend = document.querySelector('#order-send')
     $tableEmpty.classList.add("hide") //Ajout de la classe "hide" si la commande est bien passé
     $orderForm.classList.add("hide")
     $orderSend.innerHTML += (`
     <p>Votre commande a bien été enregistrée.</p>
     <p>Votre numéro de commande est le : ${localStorage.orderResult}.</p>
     <p>Merci de votre achat et à bientôt</p>
     `)
}

//Condition lorsque notre commande est passée
if (localStorage.order) {
     orderSend()
     localStorage.removeItem("orinocoCamera")
     localStorage.removeItem("sendCommand")
}

//Condition pour afficher et utiliser notre commande
if (!storageCommand) { //On vérifie si storageCommand existe
     //Si non
     storageCommand = {
          products: [], //Créé un tableau vide
     }
     if (storageCommand.products.length <= 0 && localStorage.order == undefined || localStorage.order <= 0) { //Condition de l'affichage du contenu de notre page
          commandEmpty()
     }
} else {
     //si oui
     //On extrait notre json 
     storageCommand = JSON.parse(storageCommand)
     products = storageCommand.products
     //Condition pour afficher notre panier
     if (products.length >= 1) {
          commandForm()
          commandFooter()
     }
}

